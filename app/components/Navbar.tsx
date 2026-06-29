import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "@/app/auth/actions";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 bg-fitcom-darkest/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="shrink-0 flex items-center">
          <Image
            src="/fitcom-logo.png"
            alt="FITCOM 4.0"
            width={168}
            height={80}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/#cabang"
            className="text-white/60 hover:text-white transition-colors font-medium"
          >
            Cabang Lomba
          </Link>
          <Link
            href="/tentang"
            className="text-white/60 hover:text-white transition-colors font-medium"
          >
            Tentang
          </Link>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <>
              <span className="text-sm text-white/50 hidden sm:block truncate max-w-[200px]">
                {user.email}
              </span>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-sm px-4 py-2 rounded-lg border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hidden sm:inline-block text-sm px-4 py-2 rounded-lg border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-colors font-medium"
              >
                Masuk
              </Link>
              <Link
                href="/#cabang"
                className="text-sm px-4 py-2 rounded-lg bg-white text-fitcom-darkest font-bold hover:bg-fitcom-neutral transition-colors"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
