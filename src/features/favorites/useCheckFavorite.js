// features/favorites/useCheckFavorite.js
import { useQuery } from "@tanstack/react-query";
import { checkIsFavorite } from "@/services/apiFavorites";

export function useCheckFavorite(userId, adId) {
  const { data, isLoading } = useQuery({
    queryKey: ["favorite-check", userId, adId],
    queryFn: () => checkIsFavorite(userId, adId),
    enabled: !!userId && !!adId,
  });

  return { isFavorite: data || false, isLoading };
}
