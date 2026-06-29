import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "@/app/auth/actions";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-fitcom-darkest">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="font-semibold text-sm tracking-tight text-white">FITCOM 4.0</span>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-fitcom-neutral hidden sm:block truncate max-w-[200px]">
              {user.email}
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-sm px-3 py-1.5 rounded-lg border border-fitcom-neutral/40 text-fitcom-neutral hover:bg-fitcom-primary transition-colors"
              >
                Logout
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
