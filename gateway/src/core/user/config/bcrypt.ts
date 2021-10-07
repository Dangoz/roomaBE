import bcrypt from "bcrypt";

// salt/hash encryption for passwords
export default class Bcrypt {
  private saltRounds: number = 10;

  public async encrypt(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (err) {
      console.log(err);
    }
  }

  public async validate(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (err) {
      console.log(err);
    }
  }
}