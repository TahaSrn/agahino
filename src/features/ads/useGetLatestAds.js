import { useQuery } from "@tanstack/react-query";
import { getLatestAds } from "@/services/apiAds";

export function useGetLatestAds() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["latest-ads"],
    queryFn: getLatestAds,
  });

  return { latestAds: data, isLoading, error };
}
