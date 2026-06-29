import Image from "next/image";
import Link from "next/link";
import { Shield, Code2, Cpu, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Branch {
  name: string;
  slug: string;
  type: string;
  Icon: LucideIcon;
  description: string;
}

const BRANCHES: Branch[] = [
  {
    name: "Cyber Security",
    slug: "cyber-security",
    type: "Individu",
    Icon: Shield,
    description:
      "Asah kemampuan keamanan siber lewat 2 babak: Packet Tracer dan CTF. Kompetisi individu.",
  },
  {
    name: "Web Programming",
    slug: "web-programming",
    type: "Tim",
    Icon: Code2,
    description:
      "Tunjukkan kemampuan coding tim Anda lewat penyisihan online dan final live coding onsite.",
  },
  {
    name: "Internet of Things",
    slug: "internet-of-things",
    type: "Tim",
    Icon: Cpu,
    description:
      "Wujudkan solusi IoT inovatif lewat 3 tahap: Proposal, Video & Poster, hingga presentasi.",
  },
  {
    name: "Sumo Bot RC 1kg",
    slug: "sumo-bot-rc-1kg",
    type: "Tim",
    Icon: Bot,
    description:
      "Rakit dan tarungkan robot sumo 1kg Anda dalam turnamen grup dan knockout.",
  },
];

const STATS = [
  { value: "4", label: "Cabang Lomba" },
  { value: "SMA/SMK", label: "Se-Indonesia" },
  { value: "1 Jul – 1 Sep", label: "Pendaftaran 2026" },
  { value: "29 Okt 2026", label: "Hari Pelaksanaan" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-5">
          {/* Logo — tempatkan di atas sebagai visual headline utama */}
          <Image
            src="/fitcom-logo.png"
            alt="FITCOM 4.0 — Faculty of Informatics Technology Competition"
            width={320}
            height={155}
            className="h-24 md:h-32 w-auto drop-shadow-lg"
            priority
          />

          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-fitcom-accent/15 border border-fitcom-accent/30 px-4 py-1.5 text-sm font-medium text-fitcom-dark">
            <span className="w-2 h-2 rounded-full bg-fitcom-accent inline-block" />
            Kompetisi Nasional · 29 Oktober 2026
          </span>

          {/* Headline — Space Grotesk via h1 (lihat globals.css) */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-fitcom-darkest leading-tight">
            Buktikan Kemampuanmu
            <br />
            <span className="text-fitcom-accent">di Tingkat Nasional</span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl text-gray-500 text-base md:text-lg">
            Kompetisi teknologi tahunan dari Fakultas Teknologi dan Informatika
            Universitas Dinamika, terbuka untuk siswa/i SMA/SMK/sederajat
            se-Indonesia. Tema:{" "}
            <span className="font-semibold text-fitcom-dark">
              Intelligent Living Systems
            </span>
            .
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 justify-center mt-1">
            <Link
              href="#cabang"
              className="px-6 py-3 rounded-xl bg-fitcom-accent text-white font-semibold hover:bg-fitcom-darkest transition-colors shadow-sm"
            >
              Lihat Cabang Lomba
            </Link>
            <Link
              href="#tentang"
              className="px-6 py-3 rounded-xl border border-fitcom-dark text-fitcom-dark font-semibold hover:bg-fitcom-dark hover:text-white transition-colors"
            >
              Tentang FITCOM
            </Link>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl mt-6">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-white border border-fitcom-neutral shadow-sm px-4 py-4 flex flex-col items-center gap-1"
              >
                <span className="text-xl font-black text-fitcom-accent">{s.value}</span>
                <span className="text-xs text-gray-500 text-center leading-snug">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 Cabang Lomba ───────────────────────────────────────────────────── */}
      <section id="cabang" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-fitcom-darkest text-center mb-2">
            4 Cabang Lomba
          </h2>
          <p className="text-center text-gray-400 text-sm mb-10">
            Pilih cabang yang sesuai dengan kemampuan dan minatmu
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BRANCHES.map(({ Icon, ...branch }) => (
              <div
                key={branch.slug}
                className="flex flex-col justify-between rounded-2xl bg-white border border-fitcom-neutral shadow-sm px-6 py-6 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Branch icon — representatif per cabang */}
                  <Icon size={36} className="text-fitcom-accent mb-4" />

                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-fitcom-darkest">
                      {branch.name}
                    </h3>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-fitcom-accent/10 text-fitcom-dark shrink-0 ml-3">
                      {branch.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {branch.description}
                  </p>
                </div>

                <div className="mt-5">
                  <Link
                    href={`/competitions/${branch.slug}/register`}
                    className="inline-block rounded-lg bg-fitcom-dark text-white text-sm font-medium px-4 py-2 hover:bg-fitcom-primary transition-colors"
                  >
                    Daftar Sekarang →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tentang FITCOM (teaser → halaman /tentang) ───────────────────────── */}
      <section id="tentang" className="py-14 bg-fitcom-neutral/20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-xl font-bold text-fitcom-darkest mb-4">
            Tentang FITCOM
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">
            FITCOM 4.0 adalah kompetisi teknologi tahunan tingkat nasional dari Fakultas
            Teknologi dan Informatika Universitas Dinamika, untuk siswa/i SMA/SMK/sederajat
            se-Indonesia. Tahun ini hadir dengan tema{" "}
            <span className="font-semibold text-fitcom-dark">Intelligent Living Systems</span>{" "}
            dan 4 cabang lomba yang mencakup Cyber Security, Web Programming, Internet of
            Things, dan Sumo Bot RC 1kg.
          </p>
          <Link
            href="/tentang"
            className="inline-block text-sm font-semibold text-fitcom-dark border-b border-fitcom-dark/30 hover:text-fitcom-accent hover:border-fitcom-accent transition-colors"
          >
            Baca selengkapnya tentang FITCOM →
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="bg-fitcom-darkest text-fitcom-neutral">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <Image
            src="/fitcom-logo.png"
            alt="FITCOM 4.0"
            width={126}
            height={60}
            className="h-8 w-auto opacity-90"
          />
          <span>
            © 2026 Fakultas Teknologi dan Informatika, Universitas Dinamika.
          </span>
        </div>
      </footer>
    </>
  );
}
