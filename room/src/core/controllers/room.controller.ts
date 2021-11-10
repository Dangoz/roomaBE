import IController from "@/interfaces/controller.interface";
import express, { Request, Response } from "express";
import RoomService from "../room.service";
import CacheService from "../cache.service";

class RoomController implements IController {
  path = "";
  router = express.Router();
  private roomService: RoomService = new RoomService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/:rid", this.getRoom);
    this.router.get("/invcode/:rid", this.generateInvcode);
    this.router.get("/room/:invcode", this.getRoomByCode);
    this.router.post("/create", this.createRoom);
  }

  private getRoom = async (req: Request, res: Response) => {
    const roomId = req.params.rid;
    const room = await this.roomService.getRoom(roomId);
    room
      ? res.status(200).json(room)
      : res.status(500).json({ message: "room deson't exist" });
  }

  private generateInvcode = async (req: Request, res: Response) => {
    const roomId = req.params.rid;
    if (roomId === "null") return res.status(400).json({ message: "roomId is null" });
    const invcode = await CacheService.generateInvcode(roomId);
    invcode
      ? res.status(200).json({ invcode })
      : res.status(500).json({ message: "code retrieve failed" });
  }

  private getRoomByCode = async (req: Request, res: Response) => {
    const { invcode } = req.params;
    if (invcode === "null") return res.status(400).json({ message: "invcode is null" });

    const roomId = await CacheService.getRoomId(invcode);
    roomId
      ? res.status(200).json({ roomId })
      : res.status(400).json({ message: "invalid code" });
  }

  private createRoom = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "name is required for creating room" });

    const room = await this.roomService.createRoom(name, description);
    room
      ? res.status(200).json(room)
      : res.status(500).json({ message: "server error" });
  }
}

export default RoomController;