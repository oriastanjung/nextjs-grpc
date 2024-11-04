"use client";
import React, { useEffect, useState } from "react";

export default function BooksLiveStream() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource("/api/books/live");

    eventSource.onmessage = (event) => {
      const booksList = JSON.parse(event.data); // Full list of books
      setBooks(booksList); // Replace the state with the full list
    };

    eventSource.onerror = (event) => {
      console.error("Error in SSE:", event);
      setError("Error receiving updates");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="mt-96">
      <h2>Live Book Updates</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {books.length && books.map((book, index) => (
          <li key={index} className="p-4 border-b">
            <h2 className="text-lg font-bold">{book.title}</h2>
            <p>{book.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
