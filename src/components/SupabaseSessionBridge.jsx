import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

function SupabaseSessionBridge() {
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        window.dispatchEvent(new Event("coworki-auth-change"));
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return null;
}

export default SupabaseSessionBridge;
