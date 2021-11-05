import IUser from "@/interfaces/user.interface";
import { User } from "@prisma/client";

export default class UserViewModel implements IUser {
  id: string;
  email: string;
  name: string;
  pfp: string | null;
  color: string | null;
  points: number;
  assignedPoints: number;
  roomId: string | null;

  private constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.pfp = user.pfp;
    this.color = user.color;
    this.points = user.points;
    this.assignedPoints = user.assignedPoints;
    this.roomId = user.roomId;
  }

  static async build(user: User, options?: { hello: boolean }): Promise<UserViewModel> {
    // additional processing according to options

    return new UserViewModel(user);
  }
}