import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { User } from "./user/index";

export default async function initilizeServer() {
  const app = express();
  app.use(bodyParser.json());

  const graphqlServer = new ApolloServer({
    typeDefs: `#graphql
    ${User.types}
    type Query {
      ${User.query}
    }`,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
    },
  });

  await graphqlServer.start();
  app.use("/graphql", expressMiddleware(graphqlServer));

  return app;
}
