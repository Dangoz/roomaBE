import prisma from "./prisma.client";
import { User } from "@prisma/client";

export default class UserModel {

  async getUserByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return user;
  }
}