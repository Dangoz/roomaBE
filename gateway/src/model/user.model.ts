import prisma from "./prisma.client";
import { User } from "@prisma/client";

export default {
  getUserByEmail: async (email: string): Promise<User> => {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    return user;
  },

  getUserById: async (id: string): Promise<User> => {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    return user;
  },

  createUser: async (name: string, email: string, passwordHash?: string): Promise<User> => {
    const user = await prisma.user.create({
      data: {
        name, email, password: passwordHash
      }
    })
    return user;
  },

  update: async (id: string, name?: string, pfp?: string, color?: string): Promise<User> => {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name, pfp, color
      }
    })
    return user;
  },

  updatePoints: async (id: string, points: number, assignedPoints: number): Promise<User> => {
    const user = await prisma.user.update({
      where: { id },
      data: {
        points: { increment: points },
        assignedPoints: { increment: assignedPoints }
      }
    })
    return user;
  },

  resetPoints: async (id: string): Promise<User> => {
    const user = await prisma.user.update({
      where: { id },
      data: { points: 0, assignedPoints: 0 }
    })
    return user;
  },

  updateRoomId: async (id: string, roomId: string | null): Promise<User> => {
    const user = await prisma.user.update({
      where: { id },
      data: {
        roomId
      }
    });
    return user;
  },

  getUsersByRoomId: async (roomId: string): Promise<User[]> => {
    const users = await prisma.user.findMany({
      where: {
        roomId
      }
    });
    return users;
  }
}