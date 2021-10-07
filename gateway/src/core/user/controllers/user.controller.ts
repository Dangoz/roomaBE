import IController from "@/interfaces/controller.interface";
import express from "express";
import S3 from "../config/awsS3";
import { template } from "@/configs/rest";
import { Error } from "aws-sdk/clients/servicecatalog";

class UserController implements IController {
  public path = "/user";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/s3url`, this.createS3Url);
    this.router.get(`${this.path}`, this.test);
  }

  private async test(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const response = await template.get('/cat');
      res.status(200).send(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  private async createS3Url(req: express.Request, res: express.Response) {
    try {
      const uploadUrl: string = await S3.generateUploadUrl();
      res.json({ message: "this is a url for uploading to S3", uploadUrl });
    } catch (err) {
      console.error(err);
    }
  }
}

export default UserController