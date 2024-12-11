import { graphql } from "../../gql";

export const GetAllPostsQuery = graphql(`
  #graphql
  query GetAllPosts {
    getAllPosts {
      id
      content
      imageUrl
      likes {
        id
      }
      bookmarks {
        id
      }
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

export const GetSignedURLQuery = graphql(`
  #graphql
  query Query($imageName: String!, $imageType: String!) {
    getSignedURL(imageName: $imageName, imageType: $imageType)
  }
`);
