import { graphql } from "../../gql";

//GraphQL queries related to post

//enclose query within gql to get return types

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
        userName
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
          userName
          profileImgUrl
        }
      }
      author {
        id
        email
        firstName
        lastName
        userName
        profileImgUrl
      }
    }
  }
`);
