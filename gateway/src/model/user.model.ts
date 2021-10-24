import prisma from "./prisma.client";
import { User } from "@prisma/client";

export default class UserModel {

  async getUserByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    return user;
  }

  async createUser(name: string, email: string, passwordHash?: string): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name, email, password: passwordHash
      }
    })
    return user;
  }

  async updatePFP(id: string, pfp: string): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        pfp
      }
    })
    return user;
  }
}