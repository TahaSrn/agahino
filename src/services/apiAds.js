// services/apiAds.js
import supabase from "./supabase";

export async function getAds() {
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
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

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

export async function createAd(adData) {
  const { data, error } = await supabase
    .from("ads")
    .insert([adData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function uploadAdImages(files, adId) {
  const uploadedUrls = [];

  for (const file of files) {
    const fileName = `${adId}/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("ads")
      .upload(fileName, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from("ads")
      .getPublicUrl(fileName);

    uploadedUrls.push(urlData.publicUrl);
  }

  return uploadedUrls;
}

export async function getLatestAds() {
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
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) throw error;
  return data;
}
