import IController from "@/interfaces/controller.interface";
import { IUserProfile } from "@/interfaces/user.interface";
import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import clientUrl from "@/configs/clientUrl";
import AuthenService from "../services/authen.service";
import UserViewModel from "@/viewmodel/user.viewmodel";

class AuthenController implements IController {
  public path = "/v1/auth";
  public router = express.Router();
  private authenService: AuthenService = new AuthenService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/authenticate`, this.authenticate);
    this.router.post(`${this.path}/local`, this.localLogin);
    this.router.post(`${this.path}/local/register`, this.localRegister);
    this.router.get(`${this.path}/google/callback`, this.googleLoginRedirect);
    this.router.get(`${this.path}/google`, this.googleLogin);
    this.router.get(`${this.path}/logout`, this.logout);
  }

  private authenticate = async (req: Request, res: Response) => {
    if (!req.user) return res.status(299).json();
    const userViewModel = await UserViewModel.build(req.user);
    const { age, phone, pronouns, preference, interests } = req.user;
    const user: IUserProfile = { ...userViewModel, age, phone, pronouns, preference, interests };
    res.status(200).json(user);
  };

  private localLogin = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        return res.status(400).json({ err: "Invalid Credentials" });
      }
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        return res.status(200).json({ message: "authenticated" });
      });
    })(req, res, next);
  }

  private localRegister = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (await this.authenService.getUserByEmail(email)) {
      return res.status(400).json({ err: "Email Already Exists" });
    }
    await this.authenService.createUser(name, email, password);
    return res.status(200).json({ message: "user created" });
  }

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
    res.status(200).json({ message: "logged out" });
  };
}

export default AuthenController;