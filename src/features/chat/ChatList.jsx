// components/chat/ChatList.jsx
import { format } from "date-fns";
import { faIR } from "date-fns/locale";
import { FaTrash } from "react-icons/fa";
import { useDeleteConversation } from "../../features/chat/useDeleteConversation";

function ChatList({ conversations, selectedId, onSelect }) {
  const { deleteConversation, isPending } = useDeleteConversation();

  const handleDelete = async (e, convId) => {
    e.stopPropagation();
    if (window.confirm("آیا از حذف این چت مطمئن هستید؟")) {
      try {
        await deleteConversation(convId);
        if (selectedId === convId) {
          onSelect(null);
        }
      } catch (error) {
        console.error("خطا:", error);
      }
    }
  };

  return (
    <div className="h-full w-full px-4 py-4 md:px-6">
      <h1 className="text-primary-100 font-sansBold mb-6 text-2xl md:text-3xl">
        پیام‌ها
      </h1>

      <div className="h-[calc(100vh-180px)] space-y-3 overflow-y-auto">
        {conversations?.map((conv) => {
          const adImage = conv.ads?.images?.[0] || "/placeholder.jpg";

          return (
            <div
              key={conv.id}
              className={`relative ${
                selectedId === conv.id
                  ? "border-primary-500/50 bg-dark-800/50"
                  : ""
              }`}
            >
              <button
                onClick={() => onSelect(conv.id)}
                className={`bg-dark-800/30 hover:border-primary-500/30 hover:bg-dark-800/50 flex w-full items-center gap-4 rounded-xl border p-4 transition-all duration-300 ${
                  selectedId === conv.id
                    ? "border-primary-500/50 bg-dark-800/50"
                    : "border-white/10"
                }`}
              >
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={adImage}
                    alt={conv.ads?.title || "آگهی"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 text-right">
                  <p className="font-sansBold truncate text-sm text-white">
                    {conv.ads?.title || "آگهی"}
                  </p>
                  <p className="font-sansReg truncate text-sm text-gray-400">
                    {conv.last_message || "شروع مکالمه"}
                  </p>
                </div>
                <div className="flex-shrink-0 text-left">
                  <div className="flex flex-col items-end gap-1">
                    <p className="font-sansReg text-xs text-gray-500">
                      {conv.last_message_time
                        ? format(new Date(conv.last_message_time), "HH:mm", {
                            locale: faIR,
                          })
                        : ""}
                    </p>
                    <button
                      onClick={(e) => handleDelete(e, conv.id)}
                      disabled={isPending}
                      className="rounded-full bg-red-500/20 p-1.5 text-red-400 transition-colors hover:bg-red-500/40 hover:text-red-300 disabled:opacity-50"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              </button>
            </div>
          );
        })}

        {conversations?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <p className="font-sansReg">هیچ چتی ندارید</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatList;
