import { User as PrismaUser } from "@prisma/client";

export default interface IUser {
  id: string;
  email: string;
  name: string;
  pfp: string | null;
  color: string | null;
  points: number;
  assignedPoints: number;
  roomId: string | null;
}

// extend Express.User for req.user types
declare global {
  namespace Express {
    interface User extends PrismaUser {
    }
  }
}

// structure for updating user (profile)
export interface IUserUpdate {
  name?: string;
  age?: string;
  phone?: string;
  pronouns?: string;
  preference?: string[];
  interests?: string;
  pfp?: string;
  color?: string;
}

// structure for user profile data, on top of that of IUser
export interface IUserProfile extends IUser {
  age: string | null;
  phone: string | null;
  pronouns: string | null;
  preference: string[];
  interests: string | null;
}