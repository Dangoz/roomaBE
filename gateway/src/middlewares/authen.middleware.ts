import { Request, Response, NextFunction } from "express";

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    console.log("@authenticated")
    return next();
  }

  res.status(299).send("🧙‍♂️ you shall not pass 🧙‍♂️");
};

export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/home');
};