import { Post } from "@prisma/client";
import { prismaClient } from "../../client/db";
import { GraphqlContext } from "../../interfaces";

interface postData {
  content: string;
  imageUrl?: string;
}

const mutations = {
  createPost: async (
    parent: any,
    { payload }: { payload: postData },
    contextValue: GraphqlContext
  ) => {
    if (!contextValue.user) throw new Error("You are not Authenticated");
    const post = await prismaClient.post.create({
      data: {
        content: payload.content,
        imageUrl: payload.imageUrl,
        author: { connect: { id: contextValue.user.id } },
      },
    });
    return post;
  },
};

const queries = {
  getAllPosts: async (parent: any, args: any, contextValue: GraphqlContext) => {
    if (!contextValue.user) throw new Error("You are not Authenticated");
    const posts = await prismaClient.post.findMany({
      where: { authorId: contextValue.user.id },
    });
    return posts;
  },
};

const extraResolver = {
  Post: {
    author: async (parent: Post) =>
      await prismaClient.user.findUnique({ where: { id: parent.authorId } }),
  },
};

export const resolvers = { queries, mutations, extraResolver };
