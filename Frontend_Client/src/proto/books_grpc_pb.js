// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var books_pb = require('./books_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_books_BookList(arg) {
  if (!(arg instanceof books_pb.BookList)) {
    throw new Error('Expected argument of type books.BookList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_books_BookList(buffer_arg) {
  return books_pb.BookList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var BookServiceRoutesService = exports.BookServiceRoutesService = {
  getAllBooks: {
    path: '/books.BookServiceRoutes/GetAllBooks',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: books_pb.BookList,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_books_BookList,
    responseDeserialize: deserialize_books_BookList,
  },
};

exports.BookServiceRoutesClient = grpc.makeGenericClientConstructor(BookServiceRoutesService);
