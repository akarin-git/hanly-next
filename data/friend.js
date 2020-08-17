import useSWR from "swr";
import { createFetcher } from "./_fetcher";

export default function useFriend(friendId) {
  const { data, mutate, error } = useSWR(
    "/api/friends/" + friendId,
    createFetcher(),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );
  const loading = !data && !error;

  return {
    loading,
    error,
    friend: data,
    mutate,
  };
}
