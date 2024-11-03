import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  query verifyUserGoogleTokenQuery($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getUserDetails = graphql(`
  query getUserDetails {
    getUserData {
      id
      email
      firstName
      lastName
      profileImgUrl
    }
  }
`);
