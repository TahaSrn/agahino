// features/favorites/useRemoveFavorite.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFavorite } from "@/services/apiFavorites";
import toast from "react-hot-toast";

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ userId, adId }) => removeFavorite(userId, adId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["favorite-check", variables.userId, variables.adId],
      });
      toast.success("از علاقه‌مندی‌ها حذف شد");
    },
    onError: (error) => {
      toast.error(error.message || "خطا در حذف از علاقه‌مندی‌ها");
    },
  });

  return { removeFavorite: mutateAsync, isPending };
}
