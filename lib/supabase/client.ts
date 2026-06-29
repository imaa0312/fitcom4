import { createBrowserClient } from "@supabase/ssr";

// Dipakai di Client Components ("use client"). Jangan dipakai di server.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
