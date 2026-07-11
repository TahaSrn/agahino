import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/apiCategories";

export function useGetCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { categories: data, isLoading, error };
}
