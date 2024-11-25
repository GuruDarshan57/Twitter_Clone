import { prismaClient } from "../client/db";
import { postData } from "../interfaces";

class PostsService {
  //create post
  public static async createPost(payload: postData, userId: string) {
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
    const posts = await prismaClient.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return posts;
  }
}

export default PostsService;
