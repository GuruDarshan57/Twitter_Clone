export const types = `#graphql
  input PostData{
    content:String!
    imageUrl:String
  }
  type Post{
    id:ID!
    content:String!
    imageUrl:String
    author:User!
    likes:[User]
    bookmarks:[User]
    comments:[Comment]
    createdAt:String!
  }
  type Comment{
    id:String!
    post:Post!
    author:User!
    comment:String!
    createdAt:String!
  }
`;
