package bookservice

import (
	"context"
	"log"

	pb "github.com/oriastanjung/server_grpc/proto"
	"google.golang.org/protobuf/types/known/emptypb"
)

// Server struct that implements the BookServiceRoutesServer interface
type Server struct {
	pb.BookServiceRoutesServer
}


// GetAllBooks implements the BookServiceRoutesServer interface
func (s *Server) GetAllBooks(ctx context.Context, input *emptypb.Empty) (*pb.BookList, error) {
	data := []*pb.Book{
		{
			Id:          1,
			Title:       "Go Programming",
			Description: "An introduction to Go programming language.",
		},
		{
			Id:          2,
			Title:       "Advanced Go",
			Description: "Deep dive into Go's advanced features.",
		},
		{
			Id:          3,
			Title:       "Distributed Systems",
			Description: "Building scalable distributed systems.",
		},
	}
	log.Printf("Get All Books invoked")
	return &pb.BookList{
		Books: data,
	}, nil
}
