import axios from "axios";
import { prismaClient } from "../../client/db";
import JWTservice from "../../services/JWT";
import { GraphqlContext } from "../../interfaces";
import { User } from "@prisma/client";
import UserService from "../../services/user";

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    try {
      return UserService.verifyGoogleToken(token);
    } catch (error: Error | any) {
      console.log(error.message);
      return null;
    }
  },
  getCurrentUserData: async (
    parent: any,
    args: any,
    contextValue: GraphqlContext
  ) => {
    return UserService.getCurrentUserData(contextValue.user?.email || "");
  },
  getUserData: async (
    parent: any,
    { id }: { id: string },
    contextValue: GraphqlContext
  ) => {
    if (!contextValue.user) throw new Error("You are not Authenticated");
    const user = await prismaClient.user.findUnique({ where: { id } });
    return user;
  },
};

const extraResolver = {
  User: {
    posts: async (parent: User) =>
      await prismaClient.post.findMany({ where: { authorId: parent.id } }),
  },
};

export const resolvers = { queries, extraResolver };
function getCurrentUserData(email: string | undefined) {
  throw new Error("Function not implemented.");
}
