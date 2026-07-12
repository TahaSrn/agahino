import supabase from "./supabase";

export async function getCategoryFields(categoryId) {
  const { data, error } = await supabase
    .from("category_fields")
    .select("*")
    .eq("category_id", categoryId)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
