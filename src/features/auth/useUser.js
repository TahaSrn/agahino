// features/auth/useUser.js
import { useEffect, useState } from "react";
import supabase from "@/services/supabase";

export function useUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error getting user:", error);
          setUser(null);
        } else {
          setUser(data?.user || null);
        }
      } catch (error) {
        console.error("Error:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setIsLoading(false);
      },
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return { user, isLoading };
}
