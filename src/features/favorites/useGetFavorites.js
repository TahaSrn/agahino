// features/favorites/useGetFavorites.js
import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "@/services/apiFavorites";

export function useGetFavorites(userId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => getFavorites(userId),
    enabled: !!userId,
  });

  return { favorites: data, isLoading, error };
}
