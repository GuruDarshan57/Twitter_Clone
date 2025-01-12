import { graphql } from "@gql";

//GraphQL mutations related to post

//enclose within graphql function to get return type

export const createPostMutation = graphql(`
  #graphql
  mutation CreatePost($payload: PostData!) {
    createPost(payload: $payload) {
      id
    }
  }
`);

export const LikePostMutation = `#graphql
mutation Mutation($postId: String!) {
  likePost(postId: $postId)
}
`;

export const UnLikePostMutation = `#graphql
mutation Mutation($postId: String!) {
  unlikePost(postId: $postId)
}
`;

export const BookmarkPostMutation = `#graphql
mutation Mutation($postId: String!) {
  bookmarkPost(postId: $postId)
}
`;

export const UnBookmarkPostMutation = `#graphql
mutation Mutation($postId: String!) {
  unbookmarkPost(postId: $postId)
}
`;

export const AddCommentMutation = `#graphql
mutation AddComment($postId: String!, $comment: String!) {
  addComment(postId: $postId, comment: $comment)
}`;

export const DeletePostMutation = `#graphql
mutation DeletePost($postId: String) {
  deletePost(postId: $postId)
}
`;

export const deleteCommentMutation = `#graphql
mutation DeleteComment($commentId: String) {
  deleteComment(commentId: $commentId)
}`;
