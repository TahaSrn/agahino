// services/apiAds.js
import supabase from "./supabase";

export async function getFeaturedAds() {
  const { data, error } = await supabase
    .from("ads")
    .select(
      `
      *,
      categories (
        name
      )
    `,
    )
    .eq("is_featured", true)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
