import IController from "@/interfaces/controller.interface";
import express, { Request, Response, NextFunction } from "express";
import passport from "../config/passport.google";
import clientUrl from "@/configs/clientUrl";

class AuthenController implements IController {
  public path = "/api/auth";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/authenticate`, this.authenticate);
    this.router.get(`${this.path}/google/callback`, this.googleLoginRedirect);
    this.router.get(`${this.path}/google`, this.googleLogin);
    this.router.get(`${this.path}/logout`, this.logout);
  }

  private authenticate = async (req: Request, res: Response) => {
    res.status(200).send(req.user);
  };

  private googleLoginRedirect = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", {
      successRedirect: clientUrl,
      failureRedirect: `${clientUrl}/login`,
    })(req, res, next);
  };

  private googleLogin = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })(req, res, next);
  };

  private logout = async (req: Request, res: Response) => {
    req.logout();
    res.sendStatus(200);
  };
}

export default AuthenController;