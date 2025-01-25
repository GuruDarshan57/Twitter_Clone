import { graphqlClient } from "@clients/api";
import {
  getCurrentUserDataQuery,
  getTrendingDataQuery,
  getUserDataQuery,
} from "@graphql/query/user";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUserDetails = () => {
  const query = useQuery({
    queryKey: ["user-data"],
    queryFn: () => graphqlClient.request(getCurrentUserDataQuery),
  });
  return { ...query, user: query.data?.getCurrentUserData };
};

export const useGetTrendingData = () => {
  const query = useQuery({
    queryKey: ["trending-data"],
    queryFn: () => graphqlClient.request(getTrendingDataQuery),
  });
  return { ...query, trending: query.data?.getTrendingData };
};
