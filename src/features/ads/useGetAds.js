import { useQuery } from "@tanstack/react-query";
import { getAds } from "@/services/apiAds";

export function useGetAds() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ads"],
    queryFn: getAds,
  });

  return { ads: data, isLoading, error };
}
