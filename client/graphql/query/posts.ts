import { graphql } from "../../gql";

//GraphQL queries related to post

export const GetAllPostsQuery = graphql(`
  #graphql
  query GetAllPosts {
    getAllPosts {
      id
      content
      imageUrl
      createdAt
      likes {
        id
      }
      bookmarks {
        id
      }
      comments {
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

export const getPostQuery = graphql(`
  #graphql
  query getPost($getPostId: ID!) {
    getPost(id: $getPostId) {
      id
      content
      imageUrl
      createdAt
      likes {
        id
      }
      bookmarks {
        id
      }
      comments {
        id
        comment
        createdAt
        author {
          id
          firstName
          lastName
          profileImgUrl
        }
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
