// features/favorites/useAddFavorite.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite } from "@/services/apiFavorites";
import toast from "react-hot-toast";

export function useAddFavorite() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ userId, adId }) => addFavorite(userId, adId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["favorite-check", variables.userId, variables.adId],
      });
      toast.success("به علاقه‌مندی‌ها اضافه شد");
    },
    onError: (error) => {
      toast.error(error.message || "خطا در افزودن به علاقه‌مندی‌ها");
    },
  });

  return { addFavorite: mutateAsync, isPending };
}
