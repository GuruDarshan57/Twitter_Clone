import { prismaClient } from "../../client/prisma";
import { GraphqlContext } from "../../interfaces";
import { PrismaClient, User } from "@prisma/client";
import UserService from "../../services/user";
import { redisClient } from "../../client/redis";

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
        where: { followerId: parent.id },
        include: { following: true },
      });
      return followers.map((ele) => ele.following);
    },
    recommendedUsers: async (parent: User) => {
      const myfollowings = await prismaClient.follows.findMany({
        where: { followerId: parent.id },
        include: {
          following: {
            include: { followings: { include: { following: true } } },
          },
        },
      });

      const cachedRecommendedUsers = await redisClient.get(
        `RECOMMENDED_USERS:${parent.id}`
      );
      if (cachedRecommendedUsers) {
        // console.log("Cached Recommended Users");
        return JSON.parse(cachedRecommendedUsers);
      }

      let recommendedUsers: User[] = [];

      for (const following of myfollowings) {
        for (const following_following of following.following.followings) {
          const recommendedUser = following_following.following;
          if (
            recommendedUser.id !== parent.id &&
            !myfollowings.find(
              (ele) =>
                ele.followingId == recommendedUser.id &&
                !recommendedUsers.find((ele) => ele.id == recommendedUser.id)
            )
          ) {
            recommendedUsers.push(recommendedUser);
          }
        }
      }

      await redisClient.set(
        `RECOMMENDED_USERS:${parent.id}`,
        JSON.stringify(recommendedUsers)
      );
      return recommendedUsers;
    },
    likedPosts: async (parent: User) => {
      const likedPosts = await prismaClient.likes.findMany({
        where: { likedUserId: parent.id },
        include: { post: true },
      });
      return likedPosts.map((ele) => ele.post);
    },
    bookmarkedPosts: async (parent: User) => {
      const bookmarkedPosts = await prismaClient.bookmarks.findMany({
        where: { bookmarkedUserId: parent.id },
        include: { post: true },
      });
      return bookmarkedPosts.map((ele) => ele.post);
    },
  },
};

export const resolvers = { queries, extraResolver, mutations };
