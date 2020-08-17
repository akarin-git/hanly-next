import useSWR from "swr";
import { createFetcher } from "./_fetcher";

export default function useMe() {
  const { data, mutate, error } = useSWR("/api/me", createFetcher(), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
  const loading = !data && !error;
  const loggedOut = error && error.message.match(/401/);

  return {
    loading,
    loggedOut,
    error,
    me: data,
    refreshMe: mutate,
  };
}
