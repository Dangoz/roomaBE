import prisma from "./prisma.client";
import { Event } from "@prisma/client";
import { ICreateEvent, IUpdateEvent } from "@/interfaces/event.interface";

export default {

  getEventById: async (id: string): Promise<Event> => {
    const event = await prisma.event.findUnique({
      where: { id }
    });
    return event;
  },

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
    const { title, description, startAt, endAt, roomId, color } = data;
    const newEvent = await prisma.event.create({
      data: {
        title, description, startAt, endAt, roomId, color
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
  },

  deleteEvent: async (id: string): Promise<Event> => {
    const event = await prisma.event.delete({
      where: { id }
    })
    return event;
  }
}