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

// export interface IDeserializable {
//   id: string;
//   name: string;
//   pfp: string;
//   roomId: string | null;
// }