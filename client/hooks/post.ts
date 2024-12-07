import { graphqlClient } from "@clients/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllPostsQuery } from "@graphql/query/posts";
import { createPostMutation } from "@graphql/mutation/post";
import { PostData } from "@gql/graphql";
import toast from "react-hot-toast";

export const useGetAllPosts = () => {
  const query = useQuery({
    queryKey: ["all-posts"],
    queryFn: () => graphqlClient.request(GetAllPostsQuery),
  });
  return { ...query, posts: query.data?.getAllPosts };
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: PostData) =>
      graphqlClient.request(createPostMutation, { payload }),
    onMutate: () => {
      toast.loading("Creating post...", { id: "create-post" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
      toast.success("Post Created", { id: "create-post" });
    },
    onError: () => {
      toast.error("Please wait for 10 seconds after posting.", {
        id: "create-post",
      });
    },
  });
  return mutation;
};
