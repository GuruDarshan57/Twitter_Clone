import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../interfaces";
const secret = process.env.JWT_SECRET || "secret";

class JWTservice {
  // Generate a token for a user
  public static createToken(user: User): string {
    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, secret);
    return token;
  }
  //verify token in header
  public static verifyToken(token: string): JWTPayload | "" {
    try {
      return jwt.verify(token, secret) as JWTPayload;
    } catch (err: Error | any) {
      console.log(err.message);
      return "";
    }
  }
}

export default JWTservice;
