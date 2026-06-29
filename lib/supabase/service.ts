import { createClient } from "@supabase/supabase-js";

// Dipakai HANYA di server-side (Server Actions, Route Handlers).
// Menggunakan service role key — bypass semua RLS.
// JANGAN import file ini di client component.
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
