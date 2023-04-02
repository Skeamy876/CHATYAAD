


# Full Stack Messaging Application

This is a messaging application that allows users to communicate with each other in real time. It is built using Spring Boot with STOMP WebSockets in the backend and React in the front end to connect to these STOMP endpoints and allow communication between users.

# Overview of Core Concepts
# Spring Boot
Spring Boot is a popular Java framework for building web applications. It provides a simplified way to create standalone, production-grade Spring-based applications with minimal configuration. In this messaging application, we use Spring Boot to handle WebSocket connections for chat messages, and to manage user authentication and authorization.

# STOMP WebSockets

STOMP (Simple Text Oriented Messaging Protocol) is a lightweight, text-based protocol for messaging. WebSockets provide a full-duplex communication channel over a single TCP connection, allowing for real-time, bi-directional communication between the server and the client. In this messaging application, we use STOMP WebSockets to handle real-time messaging between users.

# React

React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and provides a declarative approach to building complex UIs. In this messaging application, we use React to connect to the STOMP endpoints in the backend and allow users to communicate with each other in real time.

# User Registration and Login

Users can register for a new account and log in to the application using their email and password. Spring Security is used to handle user authentication and authorization, and passwords are stored securely using bcrypt encryption.

# Real-time Messaging Between Users

Users can send messages to each other in real time using STOMP WebSockets. The backend handles WebSocket connections for chat messages, and the frontend uses React to connect to these STOMP endpoints and allow users to communicate with each other in real time.

# Chat History and Message Persistence

Chat messages are persisted in a database using Spring Data JPA, allowing users to view their chat history even after logging out and logging back in.
