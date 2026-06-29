import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { getBranchFlags } from "@/lib/branch-config";
import { Wallet, CalendarDays, Users, CheckCircle2, ShieldCheck } from "lucide-react";
import AuthGate from "./AuthGate";
import RegisterForm from "./RegisterForm";

const PERKS = [
  "Sertifikat untuk semua peserta",
  "Piala dan hadiah untuk juara 1–3",
  "Networking dengan peserta se-Indonesia",
  "Pengalaman lomba bergengsi tingkat nasional",
];

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

  // registrationFee adalah biaya SEBELUM kode unik (lihat schema).
  // Tampilkan total yang ditransfer: registrationFee + uniqueCode.
  const totalFee = branch.registrationFee + (branch.uniqueCode ?? 0);
  const feeFormatted = `Rp ${totalFee.toLocaleString("id-ID")}`;

  const typeLabel =
    branch.participantType === "INDIVIDUAL"
      ? "Individu"
      : `Tim (${branch.teamSize} orang)`;

  const keyInfo = [
    { Icon: Wallet, label: "Biaya pendaftaran", value: feeFormatted },
    { Icon: CalendarDays, label: "Ditutup", value: regEndFormatted },
    { Icon: Users, label: "Peserta", value: typeLabel },
  ];

  return (
    <div className="min-h-screen flex items-stretch">
      {/* ── Left panel — full height via items-stretch ───────────────────────── */}
      <div className="hidden lg:flex lg:w-[40%] bg-gradient-to-b from-fitcom-dark to-fitcom-darkest flex-col justify-between p-12">
        <div>
          {/* Competition label */}
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-fitcom-neutral/80 mb-10 tracking-wide">
            {branch.competition.title}
          </span>

          {/* Branch name — dominan */}
          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            {branch.name}
          </h1>
          <p className="text-fitcom-neutral/70 text-sm leading-relaxed">
            Daftarkan dirimu sekarang dan buktikan kemampuanmu di kompetisi
            teknologi tingkat nasional.
          </p>

          {/* Key info dengan lucide icons */}
          <div className="mt-10 space-y-3">
            {keyInfo.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 text-sm">
                <Icon
                  size={15}
                  className="text-fitcom-accent shrink-0 mt-0.5"
                  strokeWidth={2}
                />
                <span className="text-fitcom-neutral">
                  {label}:{" "}
                  <strong className="text-white font-semibold">{value}</strong>
                </span>
              </div>
            ))}
          </div>

          {/* Perks dengan CheckCircle2 */}
          <div className="mt-10">
            <p className="text-xs font-semibold text-fitcom-neutral/50 uppercase tracking-widest mb-3">
              Yang kamu dapatkan
            </p>
            <ul className="space-y-2.5">
              {PERKS.map((perk) => (
                <li
                  key={perk}
                  className="flex items-start gap-2.5 text-sm text-fitcom-neutral/80"
                >
                  <CheckCircle2
                    size={14}
                    className="text-fitcom-accent shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Security badge dengan ShieldCheck */}
        <div className="flex items-center gap-3 rounded-xl bg-white/8 border border-white/10 px-4 py-3">
          <ShieldCheck
            size={20}
            className="text-fitcom-accent shrink-0"
            strokeWidth={2}
          />
          <div>
            <p className="text-white text-sm font-medium">Data Aman</p>
            <p className="text-fitcom-neutral/60 text-xs mt-0.5">
              Informasimu diproses dengan aman dan tidak dibagikan ke pihak
              ketiga.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right panel — form dengan radial gradient halus ──────────────────── */}
      <div
        className="flex-1"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 100% 0%, rgba(100,193,218,0.08) 0%, #f9fafb 45%)",
        }}
      >
        <div className="max-w-lg mx-auto px-5 py-12">
          {/* Mobile-only branch header */}
          <div className="lg:hidden mb-6">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              {branch.competition.title}
            </p>
            <h1 className="text-2xl font-black text-fitcom-darkest">
              {branch.name}
            </h1>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-sm text-gray-500">
              <span>
                Biaya:{" "}
                <strong className="text-fitcom-dark">{feeFormatted}</strong>
              </span>
              <span>
                Ditutup:{" "}
                <strong className="text-fitcom-dark">{regEndFormatted}</strong>
              </span>
            </div>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-lg border border-fitcom-neutral/30 p-7 md:p-10">
            {user ? (
              <RegisterForm
                branchId={branch.id}
                branchSlug={branchSlug}
                participantType={branch.participantType}
                teamSize={branch.teamSize ?? 1}
                {...getBranchFlags(branchSlug)}
                userEmail={user.email ?? ""}
              />
            ) : (
              <AuthGate />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
