import { useQuery } from "@tanstack/react-query";
import { getCategoryFields } from "@/services/apiCategoryFields";

export function useGetCategoryFields(categoryId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["category-fields", categoryId],
    queryFn: () => getCategoryFields(categoryId),
    enabled: !!categoryId,
  });

  return { fields: data, isLoading, error };
}
