import { supabase } from "~/utils/supabase";

export async function login(email: string) {
  return await supabase.auth.signInWithOtp({
    email,
  });
}
