import supabase from "./supabase";

export async function getPopularProvinces() {
  const { data, error } = await supabase
    .from("provinces")
    .select("*")
    .eq("is_popular", true)
    .order("id");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
