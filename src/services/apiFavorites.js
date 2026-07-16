// services/apiFavorites.js
import supabase from "./supabase";

export async function getFavorites(userId) {
  const { data, error } = await supabase
    .from("favorites")
    .select(
      `
      ad_id,
      ads (
        *,
        categories (
          name
        )
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function addFavorite(userId, adId) {
  const { data, error } = await supabase
    .from("favorites")
    .insert({
      user_id: userId,
      ad_id: adId,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function removeFavorite(userId, adId) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("ad_id", adId);

  if (error) throw new Error(error.message);
}

export async function checkIsFavorite(userId, adId) {
  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("ad_id", adId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return !!data;
}
