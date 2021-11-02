import { room } from "@/configs/rest";
import express, { Request, Response, NextFunction } from "express";
import IController from "@/interfaces/controller.interface";
import { ensureAuthenticated } from "@/middlewares/authen.middleware";

class RoomController implements IController {
  public path = "/v1/room";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/invcode`, ensureAuthenticated, this.invKey);
  }

  private invKey = async (req: Request, res: Response) => {
    if (!req.user.roomId) res.status(400).send("user not in room");

    let result = null
    try {
      const serviceRes = await room.get(`/invcode/${req.user.roomId}`);
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