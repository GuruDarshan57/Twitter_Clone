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
  }
`;
