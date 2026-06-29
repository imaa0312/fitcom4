"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signInAction, type AuthActionState } from "@/app/auth/actions";

const initialState: AuthActionState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(signInAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div>
        <label
          className="block text-sm font-medium text-fitcom-darkest mb-1.5"
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
          placeholder="nama@email.com"
          className="w-full rounded-lg border border-fitcom-neutral px-3 py-2.5 text-sm text-fitcom-darkest focus:outline-none focus:border-fitcom-accent focus:ring-2 focus:ring-fitcom-accent/20 transition-colors"
        />
        {state.errors?.email && (
          <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            className="block text-sm font-medium text-fitcom-darkest"
            htmlFor="password"
          >
            Password
          </label>
          {/* Placeholder — reset password belum diimplementasi */}
          <span className="text-xs text-gray-400">Lupa password?</span>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-fitcom-neutral px-3 py-2.5 text-sm text-fitcom-darkest focus:outline-none focus:border-fitcom-accent focus:ring-2 focus:ring-fitcom-accent/20 transition-colors"
        />
        {state.errors?.password && (
          <p className="mt-1 text-xs text-red-500">{state.errors.password[0]}</p>
        )}
      </div>

      {state.message && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-fitcom-accent text-white font-semibold py-3 text-sm hover:bg-fitcom-primary hover:text-white disabled:opacity-50 transition-all shadow-md hover:shadow-lg active:shadow-sm active:scale-[0.99] mt-1"
      >
        {pending ? "Masuk…" : "Masuk"}
      </button>

      <p className="text-center text-sm text-gray-400">
        Belum punya akun?{" "}
        <Link href="/#cabang" className="text-fitcom-dark font-medium hover:text-fitcom-accent transition-colors">
          Daftar lewat halaman cabang lomba
        </Link>
      </p>
    </form>
  );
}
