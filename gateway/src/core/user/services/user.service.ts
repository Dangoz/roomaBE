import Userdb from "@/model/user.model";
import { User } from "@prisma/client";

export default class UserService {

  async updatePFP(id: string, url: string): Promise<User> {
    return await Userdb.updatePFP(id, url);
  }

}