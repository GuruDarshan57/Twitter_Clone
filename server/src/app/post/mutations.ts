export const mutations = `#graphql
  createPost(payload:PostData!):Post
  likePost(postId:String!):Boolean
  unlikePost(postId:String!):Boolean`;
