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

export async function updateAd(id, adData) {
  const { data, error } = await supabase
    .from("ads")
    .update(adData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
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

export async function getAd(id) {
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
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("خطا:", error);
    throw new Error(error.message);
  }

  if (!data) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, phone")
    .eq("id", data.user_id)
    .maybeSingle();

  if (profileError) {
    console.warn("خطا در گرفتن پروفایل:", profileError);
  }

  return {
    ...data,
    profiles: profile || null,
  };
}

export async function getRelatedAds(categoryId, adId) {
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
    .eq("category_id", categoryId)
    .neq("id", adId)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
