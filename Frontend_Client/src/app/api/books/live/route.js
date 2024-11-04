import client from "@/lib/grpcClient";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

export async function GET(req) {
  const encoder = new TextEncoder();

  const readableStream = new ReadableStream({
    start(controller) {
      const request = new Empty();
      const stream = client.getAllBooksLive(request);

      // Establish the SSE connection
      controller.enqueue(encoder.encode(":ok\n\n"));

      stream.on("data", (response) => {
        const booksList = response.toObject(); // Convert gRPC response to plain object
        // console.log("bookList >> ", booksList.booksList)
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(booksList.booksList)}\n\n`));
      });

      stream.on("end", () => {
        controller.enqueue(encoder.encode("event: end\ndata: Stream ended by server\n\n"));
        controller.close();
      });

      stream.on("error", (error) => {
        controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ message: error.message })}\n\n`));
        controller.close();
      });
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
