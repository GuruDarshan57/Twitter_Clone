import { graphql } from "../../gql";

//GraphQL queries related to user

export const verifyUserGoogleTokenQuery = graphql(`
  query verifyUserGoogleTokenQuery($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserDataQuery = graphql(`
  query getCurrentUserData {
    getCurrentUserData {
      id
      email
      firstName
      lastName
      profileImgUrl
      likedPosts {
        id
      }
      following {
        id
      }
      recommendedUsers {
        id
        firstName
        lastName
        profileImgUrl
      }
    }
  }
`);

export const getUserDataQuery = graphql(`
  #graphql
  query getUserData($getUserDataId: String!) {
    getUserData(id: $getUserDataId) {
      id
      firstName
      lastName
      profileImgUrl
      followers {
        id
      }
      following {
        id
      }
      likedPosts {
        id
      }
      posts {
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
      }
    }
  }
`);
