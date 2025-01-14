import { graphql } from "@gql";
//GraphQL mutations related to user

export const FollowUserMutation = `#graphql
mutation Mutation($to: String!) {
  followUser(to: $to)
}`;

export const UnFollowUserMutation = `#graphql
mutation Mutation($to: String!) {
  unFollowUser(to: $to)
}`;

export const EditProfileMutation = `#graphql
mutation EditProfile($userName: String, $location: String) {
  editProfile(userName: $userName, Location: $location)
}`;
