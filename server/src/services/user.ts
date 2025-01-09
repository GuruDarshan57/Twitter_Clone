import axios from "axios";
import { prismaClient } from "../client/prisma";
import JWTservice from "./JWT";
import { redisClient } from "../client/redis";

class UserService {
  //to verify google auth token from client and send jwt token
  public static async verifyGoogleToken(token: string) {
    const googleToken = token;
    const googleAuthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleAuthURL.searchParams.append("id_token", googleToken);
    const { data } = await axios.get(googleAuthURL.toString());
    let user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          firstName: data.given_name,
          lastName: data.family_name,
          email: data.email,
          profileImgUrl: data.picture,
        },
      });
    }

    const userToken = JWTservice.createToken(user);

    return userToken;
  }

  //to get logged in user
  public static async getCurrentUserData(userEmail: string) {
    // const cachedCurrentUser = await redisClient.get(userEmail);
    // if (cachedCurrentUser) {
    //   // console.log("Cached User");
    //   return JSON.parse(cachedCurrentUser);
    // }
    const currentUser = await prismaClient.user.findUnique({
      where: { email: userEmail },
    });
    // await redisClient.set(userEmail, JSON.stringify(currentUser));
    return currentUser;

    //to get user by id
  }

  //follow user
  public static async followUser(from: string, to: string) {
    await prismaClient.follows.create({
      data: {
        follower: { connect: { id: from } },
        following: { connect: { id: to } },
      },
    });
    await redisClient.del(`RECOMMENDED_USERS:${from}`);
    return true;
  }

  //unfollow user
  public static async unFollowUser(from: string, to: string) {
    await prismaClient.follows.delete({
      where: {
        followerId_followingId: {
          followerId: from,
          followingId: to,
        },
      },
    });
    await redisClient.del(`RECOMMENDED_USERS:${from}`);
    return true;
  }
}

export default UserService;
