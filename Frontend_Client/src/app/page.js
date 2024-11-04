import { callGetAllBooks } from "@/actions/books";
import BooksLiveStream from "@/components/BooksLiveStreamin";

export default async function Home() {
  const data = await callGetAllBooks();
  // console.log("data >> ", data); // Check the structure of data in the console

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Books List from Unary stream</h1>
      <ul>
        {data.map((book, index) => (
          <li key={index} className="p-4 border-b">
            <h2 className="text-lg font-bold">{book.title}</h2>
            <p>{book.description}</p>
          </li>
        ))}
      </ul>

      <BooksLiveStream />
    </div>
  );
}
