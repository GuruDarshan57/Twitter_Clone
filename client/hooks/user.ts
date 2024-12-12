import { graphqlClient } from "@clients/api";
import { getCurrentUserDataQuery, getUserDataQuery } from "@graphql/query/user";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUserDetails = () => {
  const query = useQuery({
    queryKey: ["user-data"],
    queryFn: () => graphqlClient.request(getCurrentUserDataQuery),
  });
  return { ...query, user: query.data?.getCurrentUserData };
};
