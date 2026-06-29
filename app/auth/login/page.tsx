import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  // Kalau sudah login, tidak perlu ada di halaman ini
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/");

  return (
    <div
      className="flex-1 flex items-center justify-center px-4 py-16"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(100,193,218,0.12) 0%, #f9fafb 55%)",
      }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/fitcom-logo.png"
              alt="FITCOM 4.0"
              width={210}
              height={100}
              className="h-16 w-auto drop-shadow-md"
              priority
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-fitcom-neutral/30 p-8">
          <h1 className="text-2xl font-bold text-fitcom-darkest mb-1">
            Masuk ke akun kamu
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            Gunakan akun yang sudah dibuat saat pendaftaran lomba.
          </p>

          <LoginForm />
        </div>

        {/* Footer link */}
        <p className="text-center text-xs text-gray-400 mt-6">
          <Link href="/" className="hover:text-fitcom-accent transition-colors">
            ← Kembali ke halaman utama
          </Link>
        </p>
      </div>
    </div>
  );
}
