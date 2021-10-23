import UserModel from "@/model/user.model";
import Bcrypt from "@/core/util/bcrypt";

export default class AuthenService {
  private userdb: UserModel = new UserModel();
  private bcrypt: Bcrypt = new Bcrypt();

  async getUserByEmailAndPassword(email: string, password: string) {
    let user = await this.userdb.getUserByEmail(email);
    if (user) {
      if (await this.bcrypt.validate(password, user.password)) {
        // user = await UserViewModel.build(user);
        return user;
      }
    }
  }

  async getUserByEmail(email: string) {
    let user = await this.userdb.getUserByEmail(email);
    // if (user) user = await UserViewModel.build(user);
    return user;
  }

  async getUserById(id: string) {
    let user = await this.userdb.getUserById(id);
    return user;
  }

  async createUser(name: string, email: string, password?: string) {
    let user;
    if (password) {
      const hash = await this.bcrypt.encrypt(password);
      user = await this.userdb.createUser(name, email, hash);
    } else {
      user = await this.userdb.createUser(name, email);
    }
    return user;
  }
}