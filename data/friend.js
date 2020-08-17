import useSWR from "swr";
import { fetcher } from "./_fetcher";

export default function useFriend(friendId) {
  const { data, mutate, error } = useSWR("/api/friends/" + friendId, fetcher);
  const loading = !data && !error;

  return {
    loading,
    error,
    friend: data,
    mutate,
  };
}
