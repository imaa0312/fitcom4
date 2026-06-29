"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUpAction, type ActionState } from "./actions";

const initialState: ActionState = {};

export default function AuthGate() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(signUpAction, initialState);

  useEffect(() => {
    if (state.success) {
      // Session cookies sudah di-set oleh Server Action.
      // refresh() membuat Server Component re-render dan melihat session baru.
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <div className="rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold">Buat akun untuk melanjutkan</h2>
      <p className="mt-1 text-sm text-gray-500">
        Daftar sekali — akun ini bisa dipakai untuk semua lomba di platform ini.
      </p>

      <form action={formAction} className="mt-5 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="fullName">
            Nama lengkap
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          {state.errors?.fullName && (
            <p className="mt-1 text-xs text-red-600">{state.errors.fullName[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          {state.errors?.email && (
            <p className="mt-1 text-xs text-red-600">{state.errors.email[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            minLength={8}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          {state.errors?.password && (
            <p className="mt-1 text-xs text-red-600">{state.errors.password[0]}</p>
          )}
        </div>

        {state.message && (
          <p className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-black text-white px-4 py-2.5 text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {pending ? "Membuat akun…" : "Buat akun & lanjut daftar"}
        </button>
      </form>
    </div>
  );
}
