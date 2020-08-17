import useSWR from "swr";
import { fetcher } from "./_fetcher";

export default function useFriends() {
  const { data, mutate, error } = useSWR("/api/friends", fetcher);
  const loading = !data && !error;

  return {
    loading,
    error,
    friends: data,
    refreshFriends: mutate,
  };
}
