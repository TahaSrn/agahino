// features/chat/useGetConversations.js
import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../../services/apiChat";

export function useGetConversations(userId) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["conversations", userId],
    queryFn: () => getConversations(userId),
    enabled: !!userId,
  });

  return { conversations: data, isLoading, error, refetch };
}
