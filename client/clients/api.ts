import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";

export const graphqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL || "",

  {
    headers: () => ({
      Authorization:
        isClient && localStorage.getItem("X_token")
          ? `Bearer ${localStorage.getItem("X_token")}`
          : "",
    }),
  }
);
