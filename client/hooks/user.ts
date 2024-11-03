import { graphqlClient } from "@clients/api";
import { getUserDetails } from "@graphql/query/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDetails = () => {
  const query = useQuery({
    queryKey: ["user-data"],
    queryFn: () => graphqlClient.request(getUserDetails),
  });
  return { ...query, user: query.data?.getUserData };
};
