import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import clientUrl from "@/configs/clientUrl";
import Redis from "ioredis";

module.exports = (app) => {

  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    cors({
      origin: clientUrl,
      methods: ["POST", "PUT", "PATCH", "DELETE", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );

  app.use(morgan("tiny"));

  // Session Configuration
  const redis = new Redis(process.env.REDIS_URL);
  const RedisStore = require("connect-redis")(session);

  app.use(
    session({
      store: new RedisStore({ client: redis }),
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        domain: (process.env.NODE_ENV === "production" && process.env.DEV !== "true") ? ".rooma.ca" : "",
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};