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
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <div>
      <h2 className="text-lg font-bold text-fitcom-darkest">
        Buat akun untuk melanjutkan
      </h2>
      <p className="mt-1 text-sm text-gray-400">
        Daftar sekali — akun ini bisa dipakai untuk semua lomba di platform ini.
      </p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <div>
          <label
            className="block text-sm font-medium text-fitcom-darkest mb-1"
            htmlFor="fullName"
          >
            Nama lengkap
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-fitcom-neutral px-3 py-2.5 text-sm text-fitcom-darkest focus:outline-none focus:border-fitcom-accent focus:ring-2 focus:ring-fitcom-accent/20 transition-colors"
          />
          {state.errors?.fullName && (
            <p className="mt-1 text-xs text-red-500">{state.errors.fullName[0]}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-fitcom-darkest mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-fitcom-neutral px-3 py-2.5 text-sm text-fitcom-darkest focus:outline-none focus:border-fitcom-accent focus:ring-2 focus:ring-fitcom-accent/20 transition-colors"
          />
          {state.errors?.email && (
            <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-fitcom-darkest mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            minLength={8}
            className="w-full rounded-lg border border-fitcom-neutral px-3 py-2.5 text-sm text-fitcom-darkest focus:outline-none focus:border-fitcom-accent focus:ring-2 focus:ring-fitcom-accent/20 transition-colors"
          />
          {state.errors?.password && (
            <p className="mt-1 text-xs text-red-500">{state.errors.password[0]}</p>
          )}
        </div>

        {state.message && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-fitcom-accent text-white font-semibold px-4 py-3 text-sm hover:bg-fitcom-primary hover:text-white disabled:opacity-50 transition-colors shadow-sm"
        >
          {pending ? "Membuat akun…" : "Buat akun & lanjut daftar"}
        </button>
      </form>
    </div>
  );
}
