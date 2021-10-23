import IController from "@/interfaces/controller.interface";
import express from "express";
import S3 from "../config/awsS3";
import { template } from "@/configs/rest";
import { ensureAuthenticated } from "@/middlewares/authen.middleware";

class UserController implements IController {
  public path = "/v1/user";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/s3url`, ensureAuthenticated, this.createS3Url);
    this.router.get(`${this.path}`, ensureAuthenticated, this.test);
  }

  private async test(req: express.Request, res: express.Response, next: express.NextFunction) {
    const response = await template.get('/cat');
    res.status(200).json(response.data);
  }

  private async createS3Url(req: express.Request, res: express.Response) {
    const uploadUrl: string = await S3.generateUploadUrl();
    res.json({ message: "this is a url for uploading to S3", uploadUrl });
  }
}

export default UserController