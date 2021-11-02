import Userdb from "@/model/user.model";
import Bcrypt from "@/core/util/bcrypt";

export default class AuthenService {
  private bcrypt: Bcrypt = new Bcrypt();

  async getUserByEmailAndPassword(email: string, password: string) {
    let user = await Userdb.getUserByEmail(email);
    if (user) {
      if (await this.bcrypt.validate(password, user.password)) {
        // user = await UserViewModel.build(user);
        return user;
      }
    }
  }

  async getUserByEmail(email: string) {
    let user = await Userdb.getUserByEmail(email);
    // if (user) user = await UserViewModel.build(user);
    return user;
  }

  async getUserById(id: string) {
    let user = await Userdb.getUserById(id);
    return user;
  }

  async createUser(name: string, email: string, password?: string) {
    let user;
    if (password) {
      const hash = await this.bcrypt.encrypt(password);
      user = await Userdb.createUser(name, email, hash);
    } else {
      user = await Userdb.createUser(name, email);
    }
    return user;
  }
}