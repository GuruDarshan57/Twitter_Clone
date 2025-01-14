/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  #graphql\n  mutation CreatePost($payload: PostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n  }\n": types.CreatePostDocument,
    "\n  #graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      content\n      imageUrl\n      createdAt\n      likes {\n        id\n      }\n      bookmarks {\n        id\n      }\n      comments {\n        id\n      }\n      author {\n        id\n        email\n        firstName\n        lastName\n        userName\n        profileImgUrl\n      }\n    }\n  }\n": types.GetAllPostsDocument,
    "\n  #graphql\n  query Query($imageName: String!, $imageType: String!) {\n    getSignedURL(imageName: $imageName, imageType: $imageType)\n  }\n": types.QueryDocument,
    "\n  #graphql\n  query getPost($getPostId: ID!) {\n    getPost(id: $getPostId) {\n      id\n      content\n      imageUrl\n      createdAt\n      likes {\n        id\n      }\n      bookmarks {\n        id\n      }\n      comments {\n        id\n        comment\n        createdAt\n        author {\n          id\n          firstName\n          lastName\n          userName\n          profileImgUrl\n        }\n      }\n      author {\n        id\n        email\n        firstName\n        lastName\n        userName\n        profileImgUrl\n      }\n    }\n  }\n": types.GetPostDocument,
    "\n  query verifyUserGoogleTokenQuery($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n": types.VerifyUserGoogleTokenQueryDocument,
    "\n  query getCurrentUserData {\n    getCurrentUserData {\n      id\n      email\n      firstName\n      lastName\n      userName\n      profileImgUrl\n      location\n      likedPosts {\n        id\n      }\n      following {\n        id\n      }\n      recommendedUsers {\n        id\n        firstName\n        lastName\n        userName\n        profileImgUrl\n      }\n    }\n  }\n": types.GetCurrentUserDataDocument,
    "\n  #graphql\n  query getUserData($getUserDataId: String!) {\n    getUserData(id: $getUserDataId) {\n      id\n      firstName\n      lastName\n      userName\n      profileImgUrl\n      location\n      createdAt\n      followers {\n        id\n      }\n      following {\n        id\n      }\n      likedPosts {\n        id\n      }\n      posts {\n        id\n        content\n        imageUrl\n        createdAt\n        likes {\n          id\n        }\n        bookmarks {\n          id\n        }\n        comments {\n          id\n        }\n      }\n    }\n  }\n": types.GetUserDataDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation CreatePost($payload: PostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation CreatePost($payload: PostData!) {\n    createPost(payload: $payload) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      content\n      imageUrl\n      createdAt\n      likes {\n        id\n      }\n      bookmarks {\n        id\n      }\n      comments {\n        id\n      }\n      author {\n        id\n        email\n        firstName\n        lastName\n        userName\n        profileImgUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetAllPosts {\n    getAllPosts {\n      id\n      content\n      imageUrl\n      createdAt\n      likes {\n        id\n      }\n      bookmarks {\n        id\n      }\n      comments {\n        id\n      }\n      author {\n        id\n        email\n        firstName\n        lastName\n        userName\n        profileImgUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query Query($imageName: String!, $imageType: String!) {\n    getSignedURL(imageName: $imageName, imageType: $imageType)\n  }\n"): (typeof documents)["\n  #graphql\n  query Query($imageName: String!, $imageType: String!) {\n    getSignedURL(imageName: $imageName, imageType: $imageType)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getPost($getPostId: ID!) {\n    getPost(id: $getPostId) {\n      id\n      content\n      imageUrl\n      createdAt\n      likes {\n        id\n      }\n      bookmarks {\n        id\n      }\n      comments {\n        id\n        comment\n        createdAt\n        author {\n          id\n          firstName\n          lastName\n          userName\n          profileImgUrl\n        }\n      }\n      author {\n        id\n        email\n        firstName\n        lastName\n        userName\n        profileImgUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query getPost($getPostId: ID!) {\n    getPost(id: $getPostId) {\n      id\n      content\n      imageUrl\n      createdAt\n      likes {\n        id\n      }\n      bookmarks {\n        id\n      }\n      comments {\n        id\n        comment\n        createdAt\n        author {\n          id\n          firstName\n          lastName\n          userName\n          profileImgUrl\n        }\n      }\n      author {\n        id\n        email\n        firstName\n        lastName\n        userName\n        profileImgUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query verifyUserGoogleTokenQuery($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"): (typeof documents)["\n  query verifyUserGoogleTokenQuery($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCurrentUserData {\n    getCurrentUserData {\n      id\n      email\n      firstName\n      lastName\n      userName\n      profileImgUrl\n      location\n      likedPosts {\n        id\n      }\n      following {\n        id\n      }\n      recommendedUsers {\n        id\n        firstName\n        lastName\n        userName\n        profileImgUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCurrentUserData {\n    getCurrentUserData {\n      id\n      email\n      firstName\n      lastName\n      userName\n      profileImgUrl\n      location\n      likedPosts {\n        id\n      }\n      following {\n        id\n      }\n      recommendedUsers {\n        id\n        firstName\n        lastName\n        userName\n        profileImgUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getUserData($getUserDataId: String!) {\n    getUserData(id: $getUserDataId) {\n      id\n      firstName\n      lastName\n      userName\n      profileImgUrl\n      location\n      createdAt\n      followers {\n        id\n      }\n      following {\n        id\n      }\n      likedPosts {\n        id\n      }\n      posts {\n        id\n        content\n        imageUrl\n        createdAt\n        likes {\n          id\n        }\n        bookmarks {\n          id\n        }\n        comments {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query getUserData($getUserDataId: String!) {\n    getUserData(id: $getUserDataId) {\n      id\n      firstName\n      lastName\n      userName\n      profileImgUrl\n      location\n      createdAt\n      followers {\n        id\n      }\n      following {\n        id\n      }\n      likedPosts {\n        id\n      }\n      posts {\n        id\n        content\n        imageUrl\n        createdAt\n        likes {\n          id\n        }\n        bookmarks {\n          id\n        }\n        comments {\n          id\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;