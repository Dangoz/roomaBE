import Eventdb from "@/model/event.model";
import { Event } from "@prisma/client";
import { ICreateEvent, IUpdateEvent } from "@/interfaces/event.interface";

class EventService {

  async getEvents(roomId: string, startAt?: string, endAt?: string): Promise<Event[]> {
    try {
      const events = await Eventdb.getEvents(roomId, startAt, endAt);
      return events;
    } catch (error) {
      console.error((error as Error).message);
      return null;
    }
  }

  async createEvent(body: ICreateEvent): Promise<Event> {
    try {
      const newEvent = await Eventdb.createEvent(body);
      return newEvent;
    } catch (error) {
      console.error((error as Error).message);
      return null;
    }
  }

  async updateEvent(body: IUpdateEvent): Promise<Event> {
    try {
      const event = await Eventdb.updateEvent(body);
      return event;
    } catch (error) {
      console.error((error as Error).message);
      return null;
    }
  }
}

export default EventService