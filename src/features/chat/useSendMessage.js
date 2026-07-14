// features/chat/useSendMessage.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "@/services/apiChat";
import toast from "react-hot-toast";

export function useSendMessage() {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ({ conversationId, senderId, content }) =>
      sendMessage(conversationId, senderId, content),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["messages", variables.conversationId],
        (oldData) => {
          if (!oldData) return [data];
          return [...oldData, data];
        },
      );
    },
    onError: (error) => {
      toast.error(error.message || "خطا در ارسال پیام");
    },
  });

  return { sendMessage: mutateAsync, isLoading };
}
