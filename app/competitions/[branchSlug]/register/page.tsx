import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { getBranchFlags } from "@/lib/branch-config";
import AuthGate from "./AuthGate";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ branchSlug: string }>;
}) {
  const { branchSlug } = await params;

  const branch = await prisma.competitionBranch.findFirst({
    where: { slug: branchSlug },
    include: { competition: { select: { title: true } } },
  });

  if (!branch) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const regEndFormatted = branch.registrationEnd.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const feeFormatted = `Rp ${branch.registrationFee.toLocaleString("id-ID")}${
    branch.uniqueCode != null ? ` + ${branch.uniqueCode}` : ""
  }`;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      {/* ── Branch info header ─────────────────────────────────────── */}
      <div className="mb-8">
        <p className="text-sm text-gray-500">{branch.competition.title}</p>
        <h1 className="text-3xl font-bold mt-1">{branch.name}</h1>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
          <span>
            Biaya pendaftaran: <strong>{feeFormatted}</strong>
          </span>
          <span>
            Penutupan: <strong>{regEndFormatted}</strong>
          </span>
        </div>
      </div>

      {user ? (
        /* ── Registration form ──────────────────────────────────── */
        <RegisterForm
          branchId={branch.id}
          branchSlug={branchSlug}
          participantType={branch.participantType}
          teamSize={branch.teamSize ?? 1}
          {...getBranchFlags(branchSlug)}
          userEmail={user.email ?? ""}
        />
      ) : (
        /* ── Auth gate ──────────────────────────────────────────── */
        <AuthGate />
      )}
    </main>
  );
}
