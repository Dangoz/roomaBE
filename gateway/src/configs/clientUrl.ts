const clientUrl: string = process.env.NODE_ENV ===
  "production" ? "https://rooma.ca" : "http://localhost:3000";

export default clientUrl;