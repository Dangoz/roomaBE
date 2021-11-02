import IController from "@/interfaces/controller.interface";
import express from "express";
import S3 from "../services/awsS3";
import { ensureAuthenticated } from "@/middlewares/authen.middleware";
import UserService from "../services/user.service";

class UserController implements IController {
  public path = "/v1/user";
  public router = express.Router();
  private userService: UserService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/v1/s3url`, ensureAuthenticated, this.createS3Url);
    this.router.patch(`${this.path}/pfp`, ensureAuthenticated, this.updatePFP);
  }

  private createS3Url = async (req: express.Request, res: express.Response) => {
    const uploadUrl: string = await S3.generateUploadUrl();
    res.json({ message: "this is a url for uploading to S3", uploadUrl });
  }

  private updatePFP = async (req: express.Request, res: express.Response) => {
    const { url } = req.body;
    const user = await this.userService.updatePFP(req.user.id, url);
    user ? res.status(200).json({ message: "pfp update success" })
      : res.status(200).json({ err: "pfp update failure" });
  }
}

export default UserController