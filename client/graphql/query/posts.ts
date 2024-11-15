import { graphql } from "../../gql";

export const GetAllPostsQuery = graphql(`
  #graphql
  query GetAllPosts {
    getAllPosts {
      id
      content
      imageUrl
      author {
        id
        email
        firstName
        lastName
        profileImgUrl
      }
    }
  }
`);
