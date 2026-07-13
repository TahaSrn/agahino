import { useQuery } from "@tanstack/react-query";
import { getAd } from "@/services/apiAds";

export function useGetAd(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ad", id],
    queryFn: () => getAd(id),
    enabled: !!id,
  });

  return { ad: data, isLoading, error };
}
