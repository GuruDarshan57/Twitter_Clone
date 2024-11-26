import { prismaClient } from "../../client/db";
import { GraphqlContext } from "../../interfaces";
import { PrismaClient, User } from "@prisma/client";
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
    if (!contextValue.user) throw new Error("You are not Authenticated");
    return UserService.getCurrentUserData(contextValue.user.email);
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

const mutations = {
  followUser: async (
    parent: any,
    { to }: { to: string },
    contextValue: GraphqlContext
  ) => {
    if (!contextValue.user) throw new Error("You are not Authenticated");
    return UserService.followUser(contextValue.user.id, to);
  },
  unFollowUser: async (
    parent: any,
    { to }: { to: string },
    contextValue: GraphqlContext
  ) => {
    if (!contextValue.user) throw new Error("You are not Authenticated");
    return UserService.unFollowUser(contextValue.user.id, to);
  },
};

const extraResolver = {
  User: {
    posts: async (parent: User) =>
      await prismaClient.post.findMany({ where: { authorId: parent.id } }),
    followers: async (parent: User) => {
      const followers = await prismaClient.follows.findMany({
        where: { followingId: parent.id },
        include: { follower: true },
      });
      return followers.map((ele) => ele.follower);
    },
    following: async (parent: User) => {
      const followers = await prismaClient.follows.findMany({
        where: { followingId: parent.id },
        include: { follower: true },
      });
      return followers.map((ele) => ele.follower);
    },
  },
};

export const resolvers = { queries, extraResolver, mutations };
