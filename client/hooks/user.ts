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

export const useGetUserData = (userId: string) => {
  const query = useQuery({
    queryKey: ["profile-data"],
    queryFn: () =>
      graphqlClient.request(getUserDataQuery, { getUserDataId: userId }),
  });
  return { ...query, profile_data: query.data?.getUserData };
};
