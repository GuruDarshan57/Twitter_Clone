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
  },
};

export const resolvers = { queries, mutations, extraResolver };
