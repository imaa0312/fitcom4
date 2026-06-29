import { notFound } from "next/navigation";
import Image from "next/image";
import { existsSync } from "fs";
import { join } from "path";
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

/* Warna accent sidebar per cabang — tone berbeda biar tidak monoton */
const BRANCH_GRADIENT: Record<string, string> = {
  "cyber-security":
    "linear-gradient(160deg, #2d0a3e 0%, #1a0030 40%, #091836 100%)",
  "web-programming":
    "linear-gradient(160deg, #0a1f4a 0%, #0a2d5a 40%, #091836 100%)",
  "internet-of-things":
    "linear-gradient(160deg, #0a2e1a 0%, #0a3020 40%, #091836 100%)",
  "sumo-bot-rc-1kg":
    "linear-gradient(160deg, #2e1500 0%, #3a1a00 40%, #091836 100%)",
};

/* Warna titik accent (icon, checklist, dll) per cabang */
const BRANCH_ACCENT: Record<string, string> = {
  "cyber-security":   "#c084fc",
  "web-programming":  "#60a5fa",
  "internet-of-things": "#34d399",
  "sumo-bot-rc-1kg":  "#fb923c",
};

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

  const sidebarGradient =
    BRANCH_GRADIENT[branchSlug] ??
    "linear-gradient(160deg, #00376F 0%, #091836 100%)";
  const accentColor = BRANCH_ACCENT[branchSlug] ?? "#64c1da";

  /* Hanya render overlay foto jika file-nya benar-benar ada di public/ */
  const hasBranchPhoto = existsSync(
    join(process.cwd(), "public", `branch-${branchSlug}.jpg`)
  );

  return (
    <div className="min-h-screen flex items-stretch">
      {/* ── Left panel ──────────────────────────────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-[40%] relative flex-col justify-between p-12 overflow-hidden"
        style={{ background: sidebarGradient }}
      >
        {/* Branch photo — otomatis aktif jika file public/branch-{slug}.jpg ada */}
        {hasBranchPhoto && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/branch-${branchSlug}.jpg`}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity pointer-events-none"
          />
        )}

        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Bottom fade for readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/70 mb-10 tracking-wide">
              {branch.competition.title}
            </span>

            <h1 className="text-4xl font-black text-white leading-tight mb-4">
              {branch.name}
            </h1>
            <p className="text-white/55 text-sm leading-relaxed">
              Daftarkan dirimu sekarang dan buktikan kemampuanmu di kompetisi
              teknologi tingkat nasional.
            </p>

            <div className="mt-10 space-y-3">
              {keyInfo.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 text-sm">
                  <Icon
                    size={15}
                    className="shrink-0 mt-0.5"
                    style={{ color: accentColor }}
                    strokeWidth={2}
                  />
                  <span className="text-white/65">
                    {label}:{" "}
                    <strong className="text-white font-semibold">{value}</strong>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3">
                Yang kamu dapatkan
              </p>
              <ul className="space-y-2.5">
                {PERKS.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2.5 text-sm text-white/65"
                  >
                    <CheckCircle2
                      size={14}
                      className="shrink-0 mt-0.5"
                      style={{ color: accentColor }}
                      strokeWidth={2}
                    />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Security badge */}
          <div className="flex items-center gap-3 rounded-xl bg-white/8 border border-white/10 px-4 py-3 mt-10">
            <ShieldCheck
              size={20}
              className="shrink-0"
              style={{ color: accentColor }}
              strokeWidth={2}
            />
            <div>
              <p className="text-white text-sm font-medium">Data Aman</p>
              <p className="text-white/50 text-xs mt-0.5">
                Informasimu diproses dengan aman dan tidak dibagikan ke pihak
                ketiga.
              </p>
            </div>
          </div>
        </div>

        {/* FITCOM logo watermark bottom-right */}
        <div className="absolute bottom-8 right-8 pointer-events-none z-10">
          <Image
            src="/fitcom-logo.png"
            alt=""
            width={100}
            height={48}
            className="opacity-10"
            aria-hidden
          />
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
