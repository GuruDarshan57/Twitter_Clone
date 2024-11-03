import axios from "axios";
import { prismaClient } from "../../client/db";
import JWTservice from "../../services/JWT";
import { GraphqlContext } from "../../interfaces";

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    try {
      const googleToken = token;
      const googleAuthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
      googleAuthURL.searchParams.append("id_token", googleToken);
      const { data } = await axios.get(googleAuthURL.toString());

      const user = await prismaClient.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        await prismaClient.user.create({
          data: {
            firstName: data.given_name,
            lastName: data.family_name,
            email: data.email,
            profileImgUrl: data.picture,
          },
        });
      }

      const userInDB = await prismaClient.user.findUnique({
        where: { email: data.email },
      });

      if (!userInDB) throw new Error("User with email not found");

      const userToken = JWTservice.createToken(userInDB);

      return userToken;
    } catch (error: Error | any) {
      console.log(error.message);
      return null;
    }
  },
  getUserData: async (parent: any, args: any, contextValue: GraphqlContext) => {
    const email = contextValue.user?.email;
    if (email) {
      const user = await prismaClient.user.findUnique({
        where: { email },
      });
      return user;
    }
    return null;
  },
};

export const resolvers = { queries };
