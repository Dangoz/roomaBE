import IUser from "@/interfaces/user.interface";

export default class UserViewModel implements IUser {
  id: string;
  email: string;
  name: string;
  pfp: string;
}