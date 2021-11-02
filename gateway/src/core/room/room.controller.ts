import { room } from "@/configs/rest";
import express, { Request, Response, NextFunction } from "express";
import IController from "@/interfaces/controller.interface";
import { ensureAuthenticated } from "@/middlewares/authen.middleware";
import Userdb from "@/model/user.model";

class RoomController implements IController {
  public path = "/v1/room";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/invkey/:rid`, ensureAuthenticated, this.invKey);
  }

  private invKey = async (req: Request, res: Response) => {

    let result = null
    try {
      const serviceRes = await room.get('/');
      if (serviceRes && serviceRes.data) result = serviceRes.data;
    } catch (error) {
      console.error("error: ", (error as Error).message);
    }
    result
      ? res.status(200).json(result)
      : res.status(500).send();
  }
}

export default RoomController;