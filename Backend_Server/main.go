package main

import (
	"log"
	"net"
	"time"

	"github.com/oriastanjung/server_grpc/core/bookservice"
	pb "github.com/oriastanjung/server_grpc/proto"
	"google.golang.org/grpc"
)

var address = "0.0.0.0:2727"

func startServer() error {
	// Initialize a TCP listener on the specified address
	listener, err := net.Listen("tcp", address)
	if err != nil {
		return err
	}
	defer listener.Close()

	// Create a new gRPC server instance
	serverInstance := grpc.NewServer()

	// Register the BookServiceRoutes service with the gRPC server
	pb.RegisterBookServiceRoutesServer(serverInstance, &bookservice.Server{})

	// Log server start message
	log.Printf("Server is running on %s", address)

	// Start the server
	return serverInstance.Serve(listener)
}

func main() {
	for {
		func() {
			defer func() {
				if r := recover(); r != nil {
					log.Printf("Server encountered an error and is restarting: %v", r)
				}
			}()

			// Attempt to start the server and log any errors
			if err := startServer(); err != nil {
				log.Printf("Server stopped with error: %v. Restarting...", err)
			}
		}()

		// Optional: Wait a bit before restarting to avoid rapid retry loops
		time.Sleep(2 * time.Second)
	}
}
