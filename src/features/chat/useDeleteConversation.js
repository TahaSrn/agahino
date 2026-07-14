// features/chat/useDeleteConversation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteConversation } from "@/services/apiChat";
import toast from "react-hot-toast";

export function useDeleteConversation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      toast.success("چت با موفقیت حذف شد");
    },
    onError: (error) => {
      toast.error(error.message || "خطا در حذف چت");
    },
  });

  return { deleteConversation: mutateAsync, isPending };
}
