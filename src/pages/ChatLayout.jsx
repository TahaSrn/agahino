// pages/ChatLayout.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { useUser } from "../features/auth/useUser";
import { useGetConversations } from "../features/chat/useGetConversations";
import ChatList from "../features/chat/ChatList";
import ChatWindow from "../features/chat/ChatWindow";
import { FaComment } from "react-icons/fa";

function ChatLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId: paramConversationId } = useParams();
  const { user } = useUser();
  const { conversations, isLoading, error } = useGetConversations(user?.id);
  const [selectedConversation, setSelectedConversation] = useState(
    paramConversationId || null,
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileView, setMobileView] = useState(
    paramConversationId ? "chat" : "list",
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (paramConversationId) {
      setSelectedConversation(paramConversationId);
      setMobileView("chat");
    } else {
      setSelectedConversation(null);
      setMobileView("list");
    }
  }, [paramConversationId]);

  if (!user) {
    return (
      <div className="bg-dark-700 flex min-h-screen items-center justify-center pt-20 md:pt-24">
        <div className="text-center">
          <p className="font-sansReg text-gray-400">
            برای مشاهده چت‌ها وارد شوید
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-primary-500 hover:bg-primary-600 mt-4 rounded-lg px-6 py-2 text-white transition-colors"
          >
            ورود
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-dark-700 flex min-h-screen justify-center pt-20 md:pt-24">
        <div className="w-[95%] md:w-[85%]">
          <div className="bg-dark-600/50 mb-6 h-8 w-48 animate-pulse rounded-lg" />
          <div className="space-y-3">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-dark-600/50 h-20 animate-pulse rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-dark-700 flex min-h-screen items-center justify-center pt-20 md:pt-24">
        <p className="font-sansReg text-primary-400">خطا در بارگیری چت‌ها</p>
      </div>
    );
  }

  const handleSelectConversation = (convId) => {
    setSelectedConversation(convId);
    if (convId) {
      navigate(`/chat/${convId}`);
    } else {
      navigate("/chat");
    }
    if (isMobile) {
      setMobileView(convId ? "chat" : "list");
    }
  };

  const handleBack = () => {
    setSelectedConversation(null);
    setMobileView("list");
    navigate("/chat");
  };

  return (
    <div className="bg-dark-700 h-[calc(100vh-80px)] w-full pt-8">
      <div className="flex h-full w-full">
        <div
          className={`w-full border-white/10 md:w-[35%] md:border-l ${
            isMobile && mobileView === "chat" ? "hidden" : "block"
          }`}
        >
          <ChatList
            conversations={conversations}
            selectedId={selectedConversation}
            onSelect={handleSelectConversation}
          />
        </div>

        <div
          className={`${
            isMobile && mobileView === "list" ? "hidden" : "block"
          } w-full md:flex md:w-[65%]`}
        >
          {selectedConversation ? (
            <ChatWindow
              conversationId={selectedConversation}
              isInLayout={!isMobile}
              isMobile={isMobile}
              onBack={handleBack}
            />
          ) : (
            <div className="flex h-full flex-1 flex-col items-center justify-center text-gray-400">
              <FaComment size={48} className="mb-4" />
              <p className="font-sansReg text-lg">
                برای شروع چت یک مکالمه را انتخاب کنید
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatLayout;
