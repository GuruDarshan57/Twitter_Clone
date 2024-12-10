export const types = `#graphql
    type User{
        id:ID!
        firstName:String! 
        lastName:String
        email:String!
        profileImgUrl:String!
        posts:[Post]
        likedPosts:[Post]

        recommendedUsers:[User]
        
        followers:[User]
        following:[User]
    }`;
