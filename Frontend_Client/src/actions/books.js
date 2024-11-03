// src/actions/books.js
import client from "@/lib/grpcClient";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

export async function callGetAllBooks() {
  return new Promise((resolve, reject) => {
    const request = new Empty();
    client.getAllBooks(request, (error, response) => {
      if (error) {
        console.error("Error calling GetAllBooks:", error);
        reject(error);
      } else {
        const booksList = response.toObject().booksList; // Convert to plain JavaScript object
        resolve(booksList);
      }
    });
  });
}
