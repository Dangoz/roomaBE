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

  updatePFP: async (id: string, pfp: string): Promise<User> => {
    const user = await prisma.user.update({
      where: { id },
      data: {
        pfp
      }
    })
    return user;
  }
}