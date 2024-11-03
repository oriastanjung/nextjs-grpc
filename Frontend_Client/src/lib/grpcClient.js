import grpc from "@grpc/grpc-js";
import { BookServiceRoutesClient } from "../proto/books_grpc_pb"; // Adjust path as needed

// Define server address
const serverAddress = "0.0.0.0:2727"; // Update with your gRPC server address

// Initialize the client with the generated class
const client = new BookServiceRoutesClient(
  serverAddress,
  grpc.credentials.createInsecure() // Equivalent to insecure.NewCredentials() in Go
);

export default client;
