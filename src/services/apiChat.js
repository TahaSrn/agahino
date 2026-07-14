// services/apiChat.js
import supabase from "./supabase";

export async function getConversations(userId) {
  const { data, error } = await supabase
    .from("conversations")
    .select(
      `
      *,
      ads (
        title,
        images
      )
    `,
    )
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .order("last_message_time", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getMessages(conversationId) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

// services/apiChat.js - اصلاح تابع sendMessage
export async function sendMessage(conversationId, senderId, content) {
  const { data: messageData, error: messageError } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      content: content,
    })
    .select()
    .single();

  if (messageError) throw new Error(messageError.message);

  try {
    const { error: updateError } = await supabase
      .from("conversations")
      .update({
        last_message: content,
        last_message_time: new Date().toISOString(),
      })
      .eq("id", conversationId);

    if (updateError) {
      console.error("خطا در آپدیت last_message:", updateError);
    }
  } catch (error) {
    console.error("خطا:", error);
  }

  return messageData;
}

export async function createConversation(adId, buyerId, sellerId) {
  const { data, error } = await supabase
    .from("conversations")
    .insert({
      ad_id: adId,
      buyer_id: buyerId,
      seller_id: sellerId,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getOrCreateConversation(adId, buyerId, sellerId) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("ad_id", adId)
    .eq("buyer_id", buyerId)
    .eq("seller_id", sellerId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (data) return data;

  return await createConversation(adId, buyerId, sellerId);
}

export async function markMessagesAsRead(conversationId, userId) {
  const { error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("conversation_id", conversationId)
    .neq("sender_id", userId);

  if (error) throw new Error(error.message);
}

export async function deleteConversation(conversationId) {
  const { error } = await supabase
    .from("conversations")
    .delete()
    .eq("id", conversationId);

  if (error) {
    console.error("خطا در حذف:", error);
    throw new Error(error.message);
  }

  return true;
}
