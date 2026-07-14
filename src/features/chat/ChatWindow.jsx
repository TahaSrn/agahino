// components/chat/ChatWindow.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../features/auth/useUser";
import { useGetMessages } from "./useGetMessages";
import { useSendMessage } from "./useSendMessage";
import { markMessagesAsRead } from "../../services/apiChat";
import supabase from "../../services/supabase";
import { FaArrowRight, FaPaperPlane, FaCheck, FaClock } from "react-icons/fa";
import { format } from "date-fns";
import { faIR } from "date-fns/locale";
import toast from "react-hot-toast";

function ChatWindow({
  conversationId,
  isInLayout = false,
  isMobile = false,
  onBack,
}) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { messages = [], isLoading } = useGetMessages(conversationId);
  const { sendMessage } = useSendMessage();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [conversation, setConversation] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchConversation = async () => {
      const { data } = await supabase
        .from("conversations")
        .select("*, ads(title)")
        .eq("id", conversationId)
        .single();
      if (data) setConversation(data);
    };
    if (conversationId) {
      fetchConversation();
    }
  }, [conversationId]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setAllMessages(messages);
      if (user) {
        markMessagesAsRead(conversationId, user.id);
      }
    }
  }, [messages, conversationId, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          if (payload.new.sender_id !== user?.id) {
            setAllMessages((prev) => [...prev, payload.new]);
            markMessagesAsRead(conversationId, user?.id);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, user]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || isSending) return;

    setIsSending(true);
    const tempId = Date.now();
    const content = newMessage.trim();
    setNewMessage("");

    const tempMessage = {
      id: tempId,
      conversation_id: parseInt(conversationId),
      sender_id: user.id,
      content: content,
      is_read: false,
      created_at: new Date().toISOString(),
      isSending: true,
    };

    setAllMessages((prev) => [...prev, tempMessage]);

    try {
      const sentMessage = await sendMessage({
        conversationId: parseInt(conversationId),
        senderId: user.id,
        content: content,
      });

      setAllMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? {
                ...msg,
                isSending: false,
                id: sentMessage.id,
                created_at: sentMessage.created_at || msg.created_at,
              }
            : msg,
        ),
      );
    } catch (error) {
      setAllMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? { ...msg, isSending: false, hasError: true }
            : msg,
        ),
      );
      toast.error("خطا در ارسال پیام");
    } finally {
      setIsSending(false);
    }
  };

  const handleBack = () => {
    if (isMobile && onBack) {
      onBack();
      return;
    }
    navigate("/chat");
  };

  if (isLoading) {
    return (
      <div className="bg-dark-700 flex h-full w-full items-center justify-center">
        <div className="text-center text-gray-400">در حال بارگیری...</div>
      </div>
    );
  }

  return (
    <div className="bg-dark-700 flex h-full w-full flex-col overflow-hidden">
      <div className="bg-dark-800/30 flex-shrink-0 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="text-gray-400 transition-colors hover:text-white"
          >
            <FaArrowRight size={20} />
          </button>
          <div>
            <p className="font-sansBold text-white">
              {conversation?.ads?.title || "مکالمه"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {allMessages.map((msg) => {
            const isOwn = msg.sender_id === user?.id;
            const isSendingMsg = msg.isSending;

            return (
              <div
                key={msg.id}
                className={`flex ${isOwn ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    isOwn
                      ? "bg-primary-600 rounded-bl-none text-white"
                      : "bg-dark-600/80 rounded-br-none border border-white/5 text-gray-200"
                  } ${isSendingMsg ? "opacity-70" : ""}`}
                >
                  <p className="font-sansReg text-sm break-words">
                    {msg.content}
                  </p>
                  <div
                    className={`mt-1 flex items-center gap-1 ${
                      isOwn ? "justify-start" : "justify-end"
                    }`}
                  >
                    <span
                      className={`text-[9px] ${
                        isOwn ? "text-primary-200/70" : "text-gray-500"
                      }`}
                    >
                      {format(new Date(msg.created_at), "HH:mm", {
                        locale: faIR,
                      })}
                    </span>
                    {isOwn && (
                      <span>
                        {isSendingMsg ? (
                          <FaClock
                            className="text-primary-200/50 animate-pulse"
                            size={12}
                          />
                        ) : (
                          <FaCheck className="text-primary-200/70" size={12} />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-dark-800/30 flex-shrink-0 border-t border-white/10 px-4 py-3">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            className="bg-dark-700/50 focus:border-primary-500/50 flex-1 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition-colors outline-none"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="bg-primary-500 hover:bg-primary-600 rounded-xl p-2.5 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaPaperPlane size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;
