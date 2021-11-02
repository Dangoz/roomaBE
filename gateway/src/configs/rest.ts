import axios from "axios";

export const schedule = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "http://schedule:5200" : "http://localhost:5200",
  headers: {
    'Content-Type': 'application/json'
  }
});

export const room = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "http://room:5100" : "http://localhost:5100",
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