import { graphql } from "../../gql";

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
