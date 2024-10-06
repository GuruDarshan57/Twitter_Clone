import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

export default async function initilizeServer() {
  const app = express();
  app.use(bodyParser.json());

  const graphqlServer = new ApolloServer({
    typeDefs: `
    type Query {
      hello: String
    }`,
    resolvers: {
      Query: {
        hello: () => "Hello from Apollo",
      },
    },
  });

  await graphqlServer.start();
  app.use("/graphql", expressMiddleware(graphqlServer));

  return app;
}
