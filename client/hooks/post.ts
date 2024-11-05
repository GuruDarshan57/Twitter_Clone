import { graphqlClient } from "@clients/api";
import { useQuery } from "@tanstack/react-query";
import { GetAllPosts } from "@graphql/query/posts";

export const useGetAllPosts = () => {
  const query = useQuery({
    queryKey: ["all-posts"],
    queryFn: () => graphqlClient.request(GetAllPosts),
  });
  return { ...query, posts: query.data?.getAllPosts };
};
