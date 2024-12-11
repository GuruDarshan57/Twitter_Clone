export const mutations = `#graphql
  createPost(payload:PostData!):Post
  likePost(postId:String!):Boolean
  unlikePost(postId:String!):Boolean
  bookmarkPost(postId:String!):Boolean
  unbookmarkPost(postId:String!):Boolean
  addComment(postId:String!,comment:String!):Boolean`;
