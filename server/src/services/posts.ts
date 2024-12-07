import { prismaClient } from "../client/prisma";
import { redisClient } from "../client/redis";
import { postData } from "../interfaces";

class PostsService {
  //create post
  public static async createPost(payload: postData, userId: string) {
    await redisClient.del("Posts");
    const post = await prismaClient.post.create({
      data: {
        content: payload.content,
        imageUrl: payload.imageUrl,
        author: { connect: { id: userId } },
      },
    });
    return post;
  }

  //get all posts
  public static async getAllPosts() {
    const cachedPosts = await redisClient.get("Posts");
    if (cachedPosts) {
      // console.log("Cached posts");
      return JSON.parse(cachedPosts);
    }

    const posts = await prismaClient.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    await redisClient.set("Posts", JSON.stringify(posts));
    return posts;
  }
}

export default PostsService;
