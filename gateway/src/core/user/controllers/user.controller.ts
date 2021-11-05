import IController from "@/interfaces/controller.interface";
import express, { Request, Response, NextFunction } from "express";
import S3 from "../services/awsS3";
import { ensureAuthenticated } from "@/middlewares/authen.middleware";
import UserService from "../services/user.service";
import Userdb from "@/model/user.model";

class UserController implements IController {
  public path = "/v1/user";
  public router = express.Router();
  private userService: UserService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/v1/s3url`, ensureAuthenticated, this.createS3Url);
    this.router.patch(`${this.path}/update`, ensureAuthenticated, this.update);
    this.router.patch(`${this.path}/points/update`, ensureAuthenticated, this.updatePoints);
    this.router.patch(`${this.path}/points/reset`, ensureAuthenticated, this.resetPoints);
  }

  private createS3Url = async (req: Request, res: Response) => {
    try {
      const uploadUrl: string = await S3.generateUploadUrl();
      res.status(200).json({ message: "this is a url for uploading to S3", uploadUrl });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  }

  private update = async (req: Request, res: Response) => {
    const { name, pfp, color } = req.body;
    try {
      const user = await Userdb.update(req.user.id, name, pfp, color);
      res.status(200).json({ message: `${user.name} updated` });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  }

  private updatePoints = async (req: Request, res: Response) => {
    let points = +req.body.points;
    let assignedPoints = +req.body.assignedPoints;
    try {
      // minmum points & assignedPoints 0, reduce to 0 for reduction higher than current number
      if (points < 0 && Math.abs(points) > req.user.points) points = -req.user.points;
      if (assignedPoints < 0 && Math.abs(assignedPoints) > req.user.assignedPoints) assignedPoints = -req.user.assignedPoints;

      await Userdb.updatePoints(req.user.id, points, assignedPoints);
      res.status(200).json({ message: "points updated" });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  }

  private resetPoints = async (req: Request, res: Response) => {
    try {
      await Userdb.resetPoints(req.user.id);
      res.status(200).json({ message: "points has reset" });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  }
}

export default UserController