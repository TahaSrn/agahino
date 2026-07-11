// services/apiCategories.js
import supabase from "./supabase";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
