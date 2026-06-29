import Image from "next/image";
import Link from "next/link";
import { Shield, Code2, Cpu, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Branch {
  num: string;
  name: string;
  slug: string;
  type: string;
  Icon: LucideIcon;
  description: string;
}

const BRANCHES: Branch[] = [
  {
    num: "01",
    name: "Cyber Security",
    slug: "cyber-security",
    type: "Individu",
    Icon: Shield,
    description:
      "Asah kemampuan keamanan siber lewat 2 babak: Packet Tracer dan CTF. Bersaing sendiri.",
  },
  {
    num: "02",
    name: "Web Programming",
    slug: "web-programming",
    type: "Tim 2 Orang",
    Icon: Code2,
    description:
      "Tunjukkan kemampuan coding tim lewat penyisihan online dan final live coding onsite.",
  },
  {
    num: "03",
    name: "Internet of Things",
    slug: "internet-of-things",
    type: "Tim 2 Orang",
    Icon: Cpu,
    description:
      "Wujudkan solusi IoT lewat 3 tahap: Proposal, Video & Poster, hingga presentasi juri.",
  },
  {
    num: "04",
    name: "Sumo Bot RC 1kg",
    slug: "sumo-bot-rc-1kg",
    type: "Tim 2 Orang",
    Icon: Bot,
    description:
      "Rakit dan tarungkan robot sumo 1kg dalam turnamen format grup dan knockout.",
  },
];

const STATS = [
  { value: "4", label: "Cabang Lomba" },
  { value: "Nasional", label: "SMA/SMK Se-Indonesia" },
  { value: "1 Sep", label: "Batas Pendaftaran" },
  { value: "29 Okt", label: "Hari Pelaksanaan" },
];

const TICKER_ITEMS = [
  "CYBER SECURITY",
  "WEB PROGRAMMING",
  "INTERNET OF THINGS",
  "SUMO BOT RC 1KG",
];

export default function HomePage() {
  const ticker = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center bg-fitcom-darkest overflow-hidden">
        {/* Dot-grid */}
        <div className="absolute inset-0 bg-dot-grid" />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 60% at 50% 35%, rgba(0,55,111,0.55) 0%, transparent 70%)",
          }}
        />

        {/* "4.0" watermark */}
        <span
          className="absolute select-none font-black text-white leading-none pointer-events-none"
          style={{
            fontSize: "clamp(12rem, 38vw, 26rem)",
            opacity: 0.035,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -46%)",
          }}
          aria-hidden
        >
          4.0
        </span>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-6">
          <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
            <Image
              src="/fitcom-logo.png"
              alt="FITCOM 4.0 — Faculty of Informatics Technology Competition"
              width={320}
              height={155}
              className="h-28 md:h-40 w-auto drop-shadow-2xl"
              priority
            />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white/75">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
              Kompetisi Nasional · 29 Oktober 2026
            </span>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "220ms" }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
              Buktikan Kemampuanmu
              <br />
              <span className="text-white/45">di Tingkat Nasional</span>
            </h1>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "320ms" }}>
            <p className="max-w-xl text-white/50 text-base md:text-lg leading-relaxed">
              Kompetisi teknologi tahunan dari Universitas Dinamika untuk siswa/i
              SMA/SMK se-Indonesia. Tema:{" "}
              <span className="text-white/80 font-semibold">
                Intelligent Living Systems
              </span>
              .
            </p>
          </div>

          <div
            className="animate-fade-up flex flex-wrap gap-3 justify-center"
            style={{ animationDelay: "420ms" }}
          >
            <a
              href="#cabang"
              className="px-7 py-3 rounded-xl bg-white text-fitcom-darkest font-bold text-sm hover:bg-fitcom-neutral transition-colors shadow-lg"
            >
              Lihat Cabang Lomba
            </a>
            <Link
              href="/tentang"
              className="px-7 py-3 rounded-xl border border-white/20 text-white/70 font-semibold text-sm hover:bg-white/10 hover:text-white transition-colors"
            >
              Tentang FITCOM
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 pointer-events-none">
          <span className="text-[10px] text-white tracking-[0.2em] uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ── Marquee ticker ───────────────────────────────────────────────────── */}
      <div className="bg-fitcom-dark border-y border-white/10 py-3 overflow-hidden select-none">
        <div className="flex animate-marquee whitespace-nowrap">
          {ticker.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-5 mx-6 text-[11px] font-bold text-white/60 tracking-[0.18em] uppercase"
            >
              {item}
              <span className="text-white/25 text-[8px]">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-fitcom-neutral">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center text-center px-6 py-2"
              >
                <span className="text-4xl md:text-5xl font-black text-fitcom-darkest leading-none">
                  {s.value}
                </span>
                <span className="mt-2 text-xs text-gray-400 leading-snug max-w-[110px]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cabang Lomba ─────────────────────────────────────────────────────── */}
      <section id="cabang" className="py-20 bg-fitcom-darkest">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Cabang Lomba
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              4 Bidang Kompetisi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BRANCHES.map(({ Icon, ...branch }) => (
              <Link
                key={branch.slug}
                href={`/competitions/${branch.slug}/register`}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-7 hover:bg-white/[0.09] hover:-translate-y-1.5 hover:border-white/20 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Number watermark */}
                <span
                  className="absolute top-5 right-6 font-black text-white/[0.06] leading-none select-none"
                  style={{ fontSize: "4.5rem" }}
                  aria-hidden
                >
                  {branch.num}
                </span>

                <div>
                  <Icon
                    size={30}
                    className="text-white/40 mb-5 group-hover:text-white/80 transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white">{branch.name}</h3>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/50 shrink-0 mt-0.5">
                      {branch.type}
                    </span>
                  </div>
                  <p className="text-sm text-white/45 leading-relaxed">
                    {branch.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-white/30 group-hover:text-white/70 transition-colors duration-300">
                  Daftar Sekarang
                  <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tentang teaser ───────────────────────────────────────────────────── */}
      <section id="tentang" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-fitcom-dark/40 mb-3">
              Tentang
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-fitcom-darkest leading-tight mb-4">
              Kompetisi teknologi
              <br />
              tingkat nasional
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-md">
              FITCOM 4.0 adalah ajang tahunan dari Fakultas Teknologi dan Informatika
              Universitas Dinamika, terbuka untuk SMA/SMK se-Indonesia dengan tema{" "}
              <span className="font-semibold text-fitcom-dark">
                Intelligent Living Systems
              </span>
              .
            </p>
            <Link
              href="/tentang"
              className="inline-flex items-center gap-2 text-sm font-semibold text-fitcom-dark hover:text-fitcom-darkest transition-colors group"
            >
              Baca selengkapnya
              <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                →
              </span>
            </Link>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-3">
            {[
              { label: "Universitas Dinamika", sub: "Penyelenggara" },
              { label: "Surabaya, Jawa Timur", sub: "Lokasi Final" },
              { label: "Sertifikat Gratis", sub: "Untuk semua peserta" },
              { label: "Trofi & Hadiah", sub: "Juara 1–3 tiap cabang" },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-xl border border-fitcom-neutral p-4 hover:border-fitcom-dark/30 transition-colors"
              >
                <p className="font-bold text-fitcom-darkest text-sm leading-snug">
                  {c.label}
                </p>
                <p className="text-xs text-gray-400 mt-1">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="bg-fitcom-darkest">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <Image
            src="/fitcom-logo.png"
            alt="FITCOM 4.0"
            width={126}
            height={60}
            className="h-8 w-auto opacity-60"
          />
          <span className="text-white/35">
            © 2026 Fakultas Teknologi dan Informatika, Universitas Dinamika.
          </span>
        </div>
      </footer>
    </>
  );
}
