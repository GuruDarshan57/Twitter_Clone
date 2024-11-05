import { graphql } from "@gql";

export const createPost = graphql(`
  #graphql
  mutation CreatePost($payload: PostData!) {
    createPost(payload: $payload) {
      id
    }
  }
`);
