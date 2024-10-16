import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

class JWTservice {
  public static createToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
    };
    const secret = "guru@123";
    const token = jwt.sign(payload, secret);
    return token;
  }
}

export default JWTservice;
