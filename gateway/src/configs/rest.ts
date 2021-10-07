import axios from "axios";

export const template = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "http://template:3000" : "http://localhost:3000",
  headers: {
    'Content-Type': 'application/json'
  }
});

export const chatService = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "http://chat:5000" : "http://localhost:5000",
  headers: {
    'Content-Type': 'application/json'
  }
});
