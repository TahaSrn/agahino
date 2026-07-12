import { useQuery } from "@tanstack/react-query";
import { getPopularProvinces } from "@/services/apiProvinces";

export function useGetPopularProvinces() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popular-provinces"],
    queryFn: getPopularProvinces,
  });

  return { popularProvinces: data, isLoading, error };
}
