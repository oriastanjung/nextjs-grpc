package bookservice

import (
	"context"
	"encoding/json"

	"log"
	"os"
	"time"

	pb "github.com/oriastanjung/server_grpc/proto"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"
)
type Book struct {
    ID          uint64 `json:"id"`
    Title       string `json:"title"`
    Description string `json:"description"`
}

var books []*Book


func loadBooksFromFile(filename string) ([]*pb.Book, error) {
    // Read the JSON file
    data, err := os.ReadFile(filename)
    if err != nil {
        return nil, err
    }

    // Parse JSON data
    var loadedBooks []*pb.Book
    err = json.Unmarshal(data, &loadedBooks)
    if err != nil {
        return nil, err
    }

    return loadedBooks, nil
}


// Server struct that implements the BookServiceRoutesServer interface
type Server struct {
	pb.BookServiceRoutesServer
}


// GetAllBooks implements the BookServiceRoutesServer interface
func (s *Server) GetAllBooks(ctx context.Context, input *emptypb.Empty) (*pb.BookList, error) {
	data, err := loadBooksFromFile("books.json")
	if err != nil {
			log.Printf("Error loading books: %v\n", err)
			return nil,err
	}
	log.Printf("Get All Books invoked")
	return &pb.BookList{
		Books: data,
	}, nil
}



// GetAllBooksLive streams the full list of books as a BookList at intervals
func (s *Server) GetAllBooksLive(stream grpc.BidiStreamingServer[emptypb.Empty, pb.BookList]) error {
	log.Println("Streaming full book list to client...")

	for {
		// Load books from file
		bookList, err := loadBooksFromFile("books.json")
		if err != nil {
			log.Println("Error loading books: %v\n", err)
			return err
		}

		// Send the entire BookList to the client
		if err := stream.Send(&pb.BookList{
			Books: bookList,
		}); err != nil {
			log.Printf("Error sending book list: %v\n", err)
			return err
		}

		log.Println("Sent book list to client.")
		time.Sleep(1 * time.Second) // Interval for sending updates
	}
}
	