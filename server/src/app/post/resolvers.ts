import { Post } from "@prisma/client";
import { prismaClient } from "../../client/prisma";
import { GraphqlContext, postData } from "../../interfaces";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import PostsService from "../../services/posts";
require("dotenv").config();

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const mutations = {
  createPost: async (
    parent: any,
    { payload }: { payload: postData },
    contextValue: GraphqlContext
  ) => {
    if (!contextValue.user) throw new Error("You are not Authenticated");
    return PostsService.createPost(payload, contextValue.user.id);
  },
  likePost: async (
    parent: any,
    { postId }: { postId: string },
    contextValue: GraphqlContext
  ) => {
    if (!contextValue.user) throw new Error("You are not Authenticated");
    const userId = contextValue.user.id;
    return PostsService.likePost(postId, userId);
  },
  unlikePost: async (
    parent: any,
    { postId }: { postId: string },
    contextValue: GraphqlContext
  ) => {
    if (!contextValue.user) throw new Error("You are not Authenticated");
    const userId = contextValue.user.id;
    return PostsService.unlikePost(postId, userId);
  },
  bookmarkPost: async (
    parent: any,
    { postId }: { postId: string },
    contextValue: GraphqlContext
  ) => {
    if (!contextValue.user) throw new Error("You are not Authenticated");
    const userId = contextValue.user.id;
    return PostsService.bookamrkPost(postId, userId);
  },
  unbookmarkPost: async (
    parent: any,
    { postId }: { postId: string },
    contextValue: GraphqlContext
  ) => {
    if (!contextValue.user) throw new Error("You are not Authenticated");
    const userId = contextValue.user.id;
    return PostsService.unbookamrkPost(postId, userId);
  },
  addComment: async (
    parent: any,
    { postId, comment }: { postId: string; comment: string },
    contextValue: GraphqlContext
  ) => {
    if (!contextValue.user) throw new Error("You are not Authenticated");
    const userId = contextValue.user.id;
    return PostsService.addComment(postId, comment, userId);
  },
};

const queries = {
  getAllPosts: async (parent: any, args: any, contextValue: GraphqlContext) => {
    if (!contextValue.user) throw new Error("You are not Authenticated");
    return PostsService.getAllPosts();
  },
  getSignedURL: async (
    parent: any,
    { imageName, imageType }: { imageName: string; imageType: string },
    contextValue: GraphqlContext
  ) => {
    if (!contextValue.user) throw new Error("You are not Authenticated");
    const allowedFileTypes = ["jpg", "jpeg", "webp", "png"];
    if (!allowedFileTypes.includes(imageType))
      throw new Error("File type not supported");

    const putObject = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: `uploads/${contextValue.user.id}/posts/${
        Date.now() + imageName
      }.${imageType}`,
    });

    const signedURL = getSignedUrl(s3Client, putObject, { expiresIn: 3600 });

    return signedURL;
  },
};

const extraResolver = {
  Post: {
    author: async (parent: Post) =>
      await prismaClient.user.findUnique({ where: { id: parent.authorId } }),
    likes: async (parent: Post) => {
      const likedUsers = await prismaClient.likes.findMany({
        where: { postId: parent.id },
        include: { likedUser: true },
      });
      return likedUsers.map((ele) => ele.likedUser);
    },
    bookmarks: async (parent: Post) => {
      const bookmarkedUsers = await prismaClient.bookmarks.findMany({
        where: { postId: parent.id },
        include: { bookmarkedUser: true },
      });
      return bookmarkedUsers.map((ele) => ele.bookmarkedUser);
    },
    comments: async (parent: Post) => {
      const comments = await prismaClient.comments.findMany({
        where: { postId: parent.id },
        include: { author: true },
      });
      console.log(comments);
      return comments;
    },
  },
};

export const resolvers = { queries, mutations, extraResolver };
