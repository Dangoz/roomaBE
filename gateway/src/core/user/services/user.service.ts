import UserModel from "@/model/user.model";
import { User } from "@prisma/client";

export default class UserService {
  private userdb: UserModel = new UserModel();

  async updatePFP(id: string, url: string): Promise<User> {
    return await this.userdb.updatePFP(id, url)
  }

}