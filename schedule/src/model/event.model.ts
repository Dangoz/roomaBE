import prisma from "./prisma.client";
import { Event } from "@prisma/client";
import { ICreateEvent, IUpdateEvent } from "@/interfaces/event.interface";

export default {

  getEvents: async (roomId: string, startAt?: string, endAt?: string): Promise<Event[]> => {
    const events = await prisma.event.findMany({
      where: {
        AND: [
          { roomId },
          startAt && { startAt: { gte: new Date(startAt) } },
          endAt && { endAt: { lte: new Date(endAt) } }
        ]
      }
    })
    return events;
  },

  createEvent: async (data: ICreateEvent): Promise<Event> => {
    const { title, description, startAt, endAt, roomId } = data;
    const newEvent = await prisma.event.create({
      data: {
        title, description, startAt, endAt, roomId
      }
    });
    return newEvent;
  },

  updateEvent: async (data: IUpdateEvent): Promise<Event> => {
    const { id, title, description, startAt, endAt } = data;
    const event = await prisma.event.update({
      where: { id },
      data: {
        title, description, startAt, endAt
      }
    })
    return event;
  }
}