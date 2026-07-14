// features/chat/useGetMessages.js
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../services/apiChat";

export function useGetMessages(conversationId) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
    staleTime: 0,
    enabled: !!conversationId,
  });

  return { messages: data, isLoading, error, refetch };
}
