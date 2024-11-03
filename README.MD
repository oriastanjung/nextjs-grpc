
# gRPC with Next.js and Go

This project demonstrates how to set up a gRPC server in Go and a gRPC client in Next.js to communicate through Protocol Buffers (`.proto` file). Follow the steps below to install, compile, and run the project.

## Prerequisites

Make sure you have the following installed on your machine:

- **Go** (at least v1.17): [Download Go](https://golang.org/dl/)
- **Node.js** and **npm** (at least Node v14 and npm v6): [Download Node.js](https://nodejs.org/)
- **Protocol Buffers Compiler (`protoc`)**: [Download Protoc](https://github.com/protocolbuffers/protobuf/releases)
- **gRPC Tools** (for generating JavaScript/TypeScript client code): Installed via npm.

## Steps to Set Up the Project

### 1. Clone the Repository

Clone the project repository and navigate to its directory.

### 2. Define the `.proto` File

Define the service and message structures in the `.proto` file (e.g., `books.proto`).

### 3. Compile `.proto` File to Go (Server Side)

Use `protoc` to compile the `.proto` file into Go files, which will be used in the server-side gRPC implementation.

### 4. Set Up and Run the gRPC Server in Go

Create the gRPC server implementation in Go and run it on a specified port.

### 5. Install `grpc-tools` and Compile `.proto` File to JavaScript (Client Side)

Install `grpc-tools` globally, then use it to compile the `.proto` file to JavaScript client code for use in Next.js.

### 6. Install Additional Dependencies in Next.js Client

Navigate to the client folder and install necessary npm packages for gRPC and Protocol Buffers.

### 7. Set Up gRPC Client in Next.js

Configure the gRPC client in Next.js to connect to the Go gRPC server.

### 8. Create Actions for gRPC Calls

Define functions in an actions file to make calls to the gRPC server, using the generated client code.

### 9. Use the gRPC Actions in Next.js App Router Pages

Implement and call the action functions in Next.js pages to fetch and display data from the server.

### 10. Run the Next.js Client

Start the Next.js development server and access the application in the browser.

---

### Additional Notes

- **Environment Variables**: Update server addresses and ports as needed.
- **Error Handling**: Ensure to add error handling for production use.
- **Testing**: Test each action and method separately to verify correct communication.
