import { prismaClient } from "../../client/prisma";
import { GraphqlContext } from "../../interfaces";
import { PrismaClient, User } from "@prisma/client";
import UserService from "../../services/user";
import { redisClient } from "../../client/redis";
import TrendingDataService from "../../services/TrendingData";

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
  getTrendingData: async (
    parent: any,
    args: any,
    contextValue: GraphqlContext
  ) => {
    return TrendingDataService.getTrendingData();
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
  editProfile: async (
    parent: any,
    { userName, Location }: { userName: string; Location: string },
    contextValue: GraphqlContext
  ) => {
    if (!contextValue.user) throw new Error("You are not Authenticated");
    return UserService.editProfile(contextValue.user.id, userName, Location);
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
      // const cachedRecommendedUsers = await redisClient.get(
      //   `RECOMMENDED_USERS:${parent.id}`
      // );
      // if (cachedRecommendedUsers) {
      //   // console.log("Cached Recommended Users");
      //   return JSON.parse(cachedRecommendedUsers);
      // }

      //folowed users and their followings
      const myfollowings = await prismaClient.follows.findMany({
        where: { followerId: parent.id },
        include: {
          following: {
            include: { followings: { include: { following: true } } },
          },
        },
      });

      //following user id's
      let followingIdList = [];
      for (const following of myfollowings) {
        followingIdList.push(following.followingId);
      }

      //non following users
      //covers edge case where user doesnt follow anyone or follows everyone his followers follow
      const non_follwing_users = await prismaClient.user.findMany({
        where: {
          NOT: { id: { in: followingIdList } },
        },
        take: 4,
      });

      let recommendedUsers: User[] = non_follwing_users;

      //recommended users from followings
      for (const following of myfollowings) {
        for (const following_following of following.following.followings) {
          const recommendedUser = following_following.following;
          if (
            //making sure recommended user is not the parent user or already followed or already in recommend list
            recommendedUser.id !== parent.id &&
            !myfollowings.find(
              (ele) => ele.followingId == recommendedUser.id
            ) &&
            !recommendedUsers.find((ele) => ele.id == recommendedUser.id)
          ) {
            recommendedUsers.push(recommendedUser);
          }
        }
      }

      console.log(recommendedUsers);

      // await redisClient.set(
      //   `RECOMMENDED_USERS:${parent.id}`,
      //   JSON.stringify(recommendedUsers)
      // );
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
