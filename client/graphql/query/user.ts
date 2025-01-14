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
      userName
      profileImgUrl
      location
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
        userName
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
      userName
      profileImgUrl
      location
      createdAt
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
