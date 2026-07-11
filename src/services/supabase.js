import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://njopxwhptiabvrjorrrp.supabase.co";

const supabaseKey = "sb_publishable_9-iDD7UJlNJx7aSCDuDDdQ_HmOpxaHR";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
