import bcrypt from "bcrypt";

export class HashUtils {
  static hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  static comparePassword(password: string, hashed: string): boolean {
    return bcrypt.compareSync(password, hashed);
  }
}
