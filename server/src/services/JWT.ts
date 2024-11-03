import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../interfaces";
const secret = "guru@123";
class JWTservice {
  public static createToken(user: User): string {
    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, secret);
    return token;
  }
  public static verifyToken(token: string): JWTPayload {
    return jwt.verify(token, secret) as JWTPayload;
  }
}

export default JWTservice;
