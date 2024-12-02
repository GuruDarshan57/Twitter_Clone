export const types = `#graphql
    type User{
        id:ID!
        firstName:String! 
        lastName:String
        email:String!
        profileImgUrl:String!
        posts:[Post]

        recommendedUsers:[User]
        
        followers:[User]
        following:[User]
    }`;
