import IController from "@/interfaces/controller.interface";
import { ensureAuthenticated } from "@/middlewares/authen.middleware";
import express, { Request, Response, NextFunction } from "express";
import { schedule } from "@/configs/rest";
import { checkRoomId } from "@/middlewares/check.middleware";
import { AxiosError } from "axios";

class EventController implements IController {
  public path = "/v1/event";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, ensureAuthenticated, checkRoomId, this.getEvents);
    this.router.post(`${this.path}/create`, ensureAuthenticated, checkRoomId, this.createEvent);
    this.router.patch(`${this.path}/update`, ensureAuthenticated, checkRoomId, this.updateEvent);
    this.router.delete(`${this.path}/delete/:eid`, ensureAuthenticated, checkRoomId, this.deleteEvent);
  }

  private getEvents = async (req: Request, res: Response) => {
    try {
      const eventsRes = await schedule.get('/event/list', {
        params: { ...req.query, roomId: req.user.roomId }
      });
      const events = eventsRes.data.events;
      res.status(200).json({ message: "events retrieved", events });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  }

  private createEvent = async (req: Request, res: Response) => {
    try {
      const eventRes = await schedule.post('/event/create', {
        ...req.body,
        roomId: req.user.roomId
      });
      const event = eventRes.data.event;
      res.status(200).json({ message: "event created", event });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  }

  private updateEvent = async (req: Request, res: Response) => {
    try {
      const eventRes = await schedule.patch(`/event/update`, req.body);
      const event = eventRes.data.event;
      res.status(200).json({ message: "event updated", event });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  }

  private deleteEvent = async (req: Request, res: Response) => {
    try {
      const eventRes = await schedule.delete(`/event/delete/${req.params.eid}`);
      const event = eventRes.data.event;
      res.status(200).json({ message: "event deleted", event });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  }
}

export default EventController;