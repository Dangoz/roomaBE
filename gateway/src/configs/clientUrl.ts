const clientUrl: string = process.env.NODE_ENV ===
  "production" ? "https://dinemaster.net" : "http://localhost:3000";

export default clientUrl;