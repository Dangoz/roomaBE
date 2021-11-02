import IController from "@/interfaces/controller.interface";
import express, { Request, Response } from "express";

class RoomController implements IController {
  path = "";
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.test);
    this.router.get("/invcode/:rid", this.invCode);
    this.router.post("/create", this.createRoom);
  }

  private test = async (req: Request, res: Response) => {
    res.status(200).json({ message: "Room responding..." });
  }

  private invCode = async (req: Request, res: Response) => {
    const roomId = req.params.rid;
  }

  private createRoom = async (req: Request, res: Response) => {
    const { name, description } = req.body;
  }
}

export default RoomController;