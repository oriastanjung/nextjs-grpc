package main

import (
	"log"
	"net"

	"github.com/oriastanjung/server_grpc/core/bookservice"
	pb "github.com/oriastanjung/server_grpc/proto"
	"google.golang.org/grpc"
)

var address = "0.0.0.0:2727"

func main() {
	// Initialize a TCP listener on the specified address
	listener, err := net.Listen("tcp", address)
	if err != nil {
		log.Fatalf("Error listening on %v: %v\n", address, err)
	}
	defer listener.Close()

	// Create a new gRPC server instance
	serverInstance := grpc.NewServer()

	// Register the BookServiceRoutes service with the gRPC server
	pb.RegisterBookServiceRoutesServer(serverInstance, &bookservice.Server{})

	// Log server start message
	log.Printf("Server is running on %s", address)

	// Start the server
	if err := serverInstance.Serve(listener); err != nil {
		log.Fatalf("Failed to serve: %v\n", err)
	}
}
