import IController from "@/interfaces/controller.interface";
import express, { Request, Response, NextFunction } from "express";
import EventService from "./event.service";
import dayjs from "dayjs";

class EventController implements IController {
  path = "/event";
  router = express.Router();
  private eventService: EventService = new EventService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, this.getEvents);
    this.router.post(`${this.path}/create`, this.createEvent);
    this.router.patch(`${this.path}/update`, this.updateEvent);
    this.router.delete(`${this.path}/delete/:eid`, this.deleteEvent);
  }

  private getEvents = async (req: Request, res: Response) => {
    const { roomId, startAt, endAt } = req.query;
    const events = await this.eventService.getEvents(roomId as string, startAt as string, endAt as string);
    events
      ? res.status(200).json({ events })
      : res.status(500).json({ message: "server error" });
  }

  private createEvent = async (req: Request, res: Response) => {
    const { roomId, startAt, endAt, title, color } = req.body;
    if (!roomId || !startAt || !endAt || !title || !color) {
      return res.status(400).json({ message: "invalid body" });
    }
    if (+dayjs(startAt) > +dayjs(endAt)) {
      return res.status(400).json({ message: "invalid startAt / endAt" });
    }

    const event = await this.eventService.createEvent(req.body);
    event
      ? res.status(200).json({ event })
      : res.status(500).json({ message: "server error" });
  }

  private updateEvent = async (req: Request, res: Response) => {
    if (!req.body.id) return res.status(400).json({ message: "event doesn't exist" });
    const event = await this.eventService.updateEvent(req.body);
    event
      ? res.status(200).json({ event })
      : res.status(500).json({ message: "server error" });
  }

  private deleteEvent = async (req: Request, res: Response) => {
    const { eid } = req.params;
    if (!eid) return res.status(400).json({ message: "event doesn't exist" });

    const event = await this.eventService.deleteEvent(eid);
    event
      ? res.status(200).json({ event })
      : res.status(500).json({ message: "server error" });
  }
}

export default EventController;