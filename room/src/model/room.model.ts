import prisma from "./prisma.client";
import { Room } from "@prisma/client";

export default {
  getRoom: async (id: string): Promise<Room> => {
    const room = await prisma.room.findUnique({
      where: { id }
    })
    return room;
  },

  createRoom: async (name: string, description: string): Promise<Room> => {
    const room = await prisma.room.create({
      data: {
        name, description
      }
    })
    return room;
  },

}