import { useQuery } from "@tanstack/react-query";
import { getRelatedAds } from "@/services/apiAds";

export function useGetRelatedAds(categoryId, adId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["related-ads", categoryId, adId],
    queryFn: () => getRelatedAds(categoryId, adId),
    enabled: !!categoryId && !!adId,
  });

  return { relatedAds: data, isLoading, error };
}
