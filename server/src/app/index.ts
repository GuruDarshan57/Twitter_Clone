import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { GraphqlContext } from "../interfaces";
import { User } from "./user/index";
import { Post } from "./post/index";
import cors from "cors";
import JWTservice from "../services/JWT";

export default async function initilizeServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  const graphqlServer = new ApolloServer<GraphqlContext>({
    introspection: process.env.NODE_Env !== "Production",
    typeDefs: `#graphql
    ${User.types}
    ${Post.types}
    type Query {
      ${User.queries}
      ${Post.queries}
    }
    type Mutation{
      ${Post.mutations}
      ${User.mutations}
    }`,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Post.resolvers.queries,
      },
      Mutation: {
        ...Post.resolvers.mutations,
        ...User.resolvers.mutations,
      },
      ...Post.resolvers.extraResolver,
      ...User.resolvers.extraResolver,
    },
  });

  await graphqlServer.start();
  app.use(
    "/graphql",
    expressMiddleware(graphqlServer, {
      context: async ({ req, res }) => {
        return {
          user: req.headers.authorization
            ? JWTservice.verifyToken(req.headers.authorization.split(" ")[1])
            : undefined,
        };
      },
    })
  );

  return app;
}
