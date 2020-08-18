import useSWR from "swr";
import { createFetcher } from "./_fetcher";

export default function useFriends() {
  const { data, mutate, error } = useSWR("/api/friends", createFetcher(), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
  const loading = !data && !error;

  return {
    loading,
    error,
    friends: data,
    refreshFriends: mutate,
  };
}