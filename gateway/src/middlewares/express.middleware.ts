import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import clientUrl from "@/configs/clientUrl";

module.exports = (app) => {

  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    cors({
      origin: clientUrl,
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );

  app.use(morgan("tiny"));

  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        // httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};