import { graphql } from "../../gql";

export const GetAllPosts = graphql(`
  #graphql
  query GetAllPosts {
    getAllPosts {
      id
      content
      imageUrl
      author {
        firstName
        lastName
        profileImgUrl
      }
    }
  }
`);
