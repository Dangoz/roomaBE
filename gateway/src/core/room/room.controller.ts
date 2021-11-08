import { room } from "@/configs/rest";
import express, { Request, Response, NextFunction } from "express";
import IController from "@/interfaces/controller.interface";
import { ensureAuthenticated } from "@/middlewares/authen.middleware";
import Userdb from "@/model/user.model";
import Roomdb from "@/model/room.model";

class RoomController implements IController {
  public path = "/v1/room";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/invcode`,
      ensureAuthenticated,
      this.getInvcode
    );
    this.router.get(
      `${this.path}/create`,
      ensureAuthenticated,
      this.createRoom
    );
    this.router.patch(`${this.path}/join`, ensureAuthenticated, this.joinRoom);
    this.router.patch(
      `${this.path}/leave`,
      ensureAuthenticated,
      this.leaveRoom
    );
    this.router.get(`${this.path}`, ensureAuthenticated, this.getRoom);
  }

  private getRoom = async (req: Request, res: Response) => {
    if (!req.user.roomId)
      return res.status(400).json({ message: "user not in room" });

    try {
      const serviceRes = await room.get(`/${req.user.roomId}`);
      res.status(200).json(serviceRes.data);
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  };

  private getInvcode = async (req: Request, res: Response) => {
    if (!req.user.roomId)
      return res.status(400).json({ message: "user not in room" });

    try {
      const serviceRes = await room.get(`/invcode/${req.user.roomId}`);
      res.status(200).json(serviceRes.data);
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  };

  private createRoom = async (req: Request, res: Response) => {
    console.log("fffffffffffffffffffffff");
    try {
      const room = await Roomdb.createRoom();
      console.log("ddddddddddddddddddddddd");
      console.log(room);

      res.status(200).json({ roomKey: room.id });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }

    // const { name, description } = req.body;
    // if (req.user.roomId) return res.status(400).json({ message: "user already in room" });

    // try {
    //   const serviceRes = await room.post('/create', { name, description });
    //   await Userdb.updateRoomId(req.user.id, serviceRes.data.id);
    //   res.status(200).json({ message: "room created & joined" });
    // } catch (error) {
    //   console.error((error as Error).message);
    //   res.status(500).json({ message: "server error" });
    // }
  };

  private joinRoom = async (req: Request, res: Response) => {
    const { invcode } = req.body;
    if (req.user.roomId)
      return res.status(400).json({ message: "user already in room" });

    try {
      // const serviceRes = await room.get(`/room/${invcode}`);
      // if (serviceRes.status !== 200) return res.status(400).json(serviceRes.data);

      // update user roomId
      const user = await Userdb.updateRoomId(req.user.id, invcode);
      if (user) {
        res.status(200).json({ message: `joined room ${user.roomId}` });
      } else {
        res.status(404).json({ message: "room not found" });
      }
    } catch (error) {
      console.log((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  };

  private leaveRoom = async (req: Request, res: Response) => {
    const { roomId } = req.body;
    try {
      const user = await Userdb.updateRoomId(req.user.id, null);
      console.log("room", req.user.roomId);
      res.status(200).json({ message: "left room" });
    } catch (error) {
      console.log((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  };
}

export default RoomController;
