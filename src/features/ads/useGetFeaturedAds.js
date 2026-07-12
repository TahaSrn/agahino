import { useQuery } from "@tanstack/react-query";
import { getFeaturedAds } from "@/services/apiAds";

export function useGetFeaturedAds() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["featured-ads"],
    queryFn: getFeaturedAds,
    staleTime: 0,
  });

  return { featuredAds: data, isLoading, error };
}
