import { prismaClient } from "../client/prisma";
import { redisClient } from "../client/redis";
import { postData } from "../interfaces";

class PostsService {
  //create post
  public static async createPost(payload: postData, userId: string) {
    //delete cached posts
    await redisClient.del("Posts");

    //rate limiting
    const RATE_LIMIT = await redisClient.get(`RATE_LIMIT:POST:${userId}`);
    if (RATE_LIMIT)
      throw new Error("Please Wait for 10 seconds before posting another post");

    //create post
    const post = await prismaClient.post.create({
      data: {
        content: payload.content,
        imageUrl: payload.imageUrl,
        author: { connect: { id: userId } },
      },
    });

    //set rate limit
    await redisClient.setex(`RATE_LIMIT:POST:${userId}`, 10, 1);

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
