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

  // async createUser(user: any) {
  //   const hash = await this.bcrypt.encrypt(user.password);
  //   const newUser = await this.userdb.createUser(user, hash);
  //   return newUser;
  // }

  async createGoogleUser(name: string, email: string) {
    let user = await this.userdb.createUser(name, email);
    return user;
  }
}