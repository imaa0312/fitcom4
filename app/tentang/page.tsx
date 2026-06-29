import Image from "next/image";
import Link from "next/link";
import { Shield, Code2, Cpu, Bot, CalendarDays, MapPin, Building2, ArrowRight, CheckCircle2 } from "lucide-react";

const CABANG = [
  {
    num: "01",
    Icon: Shield,
    name: "Cyber Security",
    type: "Individu",
    slug: "cyber-security",
    detail:
      "Uji kemampuan keamanan siber dalam 2 babak — Packet Tracer (konfigurasi jaringan) dan CTF (Capture The Flag). Peserta bersaing secara individu.",
  },
  {
    num: "02",
    Icon: Code2,
    name: "Web Programming",
    type: "Tim 2 Orang",
    slug: "web-programming",
    detail:
      "Adu kemampuan membangun website dalam tim 2 orang. Babak penyisihan online dilanjut final live coding onsite di kampus.",
  },
  {
    num: "03",
    Icon: Cpu,
    name: "Internet of Things",
    type: "Tim 2 Orang",
    slug: "internet-of-things",
    detail:
      "Rancang solusi IoT inovatif dalam 3 tahap: pengumpulan Proposal, Video & Poster, hingga presentasi langsung di depan juri.",
  },
  {
    num: "04",
    Icon: Bot,
    name: "Sumo Bot RC 1kg",
    type: "Tim 2 Orang",
    slug: "sumo-bot-rc-1kg",
    detail:
      "Bangun dan kendalikan robot sumo berbobot maksimal 1kg. Turnamen berlangsung dalam format grup round-robin dilanjut babak knockout.",
  },
];

/* Milestone dates untuk timeline */
const TIMELINE_DATA = [
  {
    iso: "2026-07-01",
    label: "Pendaftaran Dibuka",
    note: "Registrasi online dibuka untuk semua cabang lomba",
  },
  {
    iso: "2026-09-01",
    label: "Batas Akhir Pendaftaran",
    note: "Setelah tanggal ini, formulir pendaftaran ditutup",
  },
  {
    iso: "2026-09-17",
    label: "Deadline Pengumpulan Tahap 1",
    note: "Cyber Security & Web: pengumpulan karya. IoT: Proposal",
  },
  {
    iso: "2026-10-18",
    label: "Deadline Video & Poster IoT",
    note: "Pengumpulan tahap 2 khusus cabang Internet of Things",
  },
  {
    iso: "2026-10-28",
    label: "Deadline PPT Presentasi IoT",
    note: "Pengumpulan tahap 3 khusus cabang Internet of Things",
  },
  {
    iso: "2026-10-29",
    label: "Hari Pelaksanaan Final",
    note: "Semua cabang, onsite di Universitas Dinamika Surabaya",
  },
];

function buildTimeline() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const items = TIMELINE_DATA.map((item) => {
    const date = new Date(item.iso + "T00:00:00");
    const diffDays = Math.round(
      (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    const status =
      diffDays < 0 ? "passed" : diffDays === 0 ? "today" : "upcoming";
    return { ...item, date, diffDays, status };
  });

  /* Tandai item "next" — milestone upcoming pertama */
  const nextIdx = items.findIndex((it) => it.status !== "passed");

  return items.map((it, i) => ({
    ...it,
    isNext: i === nextIdx && it.status === "upcoming",
  }));
}

function formatDate(date: Date) {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function TentangPage() {
  const timeline = buildTimeline();
  const passedCount = timeline.filter((t) => t.status === "passed").length;
  const progressPct = Math.round((passedCount / timeline.length) * 100);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-fitcom-darkest overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,55,111,0.55) 0%, transparent 70%)",
          }}
        />

        <span
          className="absolute select-none font-black text-white/[0.03] leading-none pointer-events-none whitespace-nowrap"
          style={{
            fontSize: "clamp(5rem, 18vw, 14rem)",
            bottom: "-0.1em",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          aria-hidden
        >
          FITCOM 4.0
        </span>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/65 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Tentang FITCOM
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] mb-6">
              Faculty of Informatics
              <br />
              <span className="text-white/40">Technology Competition</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-xl">
              Kompetisi teknologi tahunan tingkat nasional dari Universitas Dinamika,
              terbuka untuk siswa/i SMA/SMK se-Indonesia.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "4", label: "Cabang Lomba" },
              { value: "Ke-4", label: "Penyelenggaraan" },
              { value: "Nasional", label: "Lingkup Peserta" },
              { value: "2026", label: "Tahun Pelaksanaan" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4"
              >
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-white/40 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tentang ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-fitcom-dark/40 mb-4">
              Latar Belakang
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-fitcom-darkest leading-tight mb-6">
              Apa itu FITCOM?
            </h2>
            <div className="flex flex-col gap-4 text-gray-500 text-sm leading-relaxed">
              <p>
                FITCOM adalah ajang kompetisi teknologi tahunan yang diselenggarakan oleh
                Fakultas Teknologi dan Informatika Universitas Dinamika. Terbuka untuk
                siswa/i SMA, SMK, dan sederajat se-Indonesia.
              </p>
              <p>
                Memasuki tahun keempat, FITCOM 4.0 hadir dengan tema{" "}
                <span className="font-semibold text-fitcom-dark">
                  Intelligent Living Systems
                </span>{" "}
                — mencerminkan arah teknologi masa depan di mana sistem cerdas menyatu
                dalam kehidupan sehari-hari.
              </p>
              <p>
                Peserta berkesempatan membangun jaringan dengan pelajar berbakat dari
                seluruh Indonesia, mendapat sertifikat resmi, dan pengalaman berharga
                sebelum memasuki dunia kuliah maupun industri teknologi.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-fitcom-darkest p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-dot-grid opacity-60" />
            <div className="relative z-10">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/35 mb-4">
                Tema FITCOM 4.0
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-5">
                Intelligent
                <br />
                Living Systems
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                AI, IoT, dan keamanan siber tidak lagi berdiri sendiri — mereka menyatu
                membentuk ekosistem teknologi yang menopang kehidupan manusia.
              </p>
              <Link
                href="/#cabang"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors group"
              >
                Lihat cabang lomba
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Cabang ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-fitcom-darkest">
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
            {CABANG.map(({ Icon, ...c }) => (
              <Link
                key={c.slug}
                href={`/competitions/${c.slug}/register`}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-7 hover:bg-white/[0.09] hover:-translate-y-1.5 hover:border-white/20 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <span
                  className="absolute top-5 right-6 font-black text-white/[0.06] leading-none select-none"
                  style={{ fontSize: "4.5rem" }}
                  aria-hidden
                >
                  {c.num}
                </span>
                <div>
                  <Icon
                    size={28}
                    className="text-white/40 mb-5 group-hover:text-white/75 transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-white">{c.name}</h3>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/50 shrink-0 mt-0.5">
                      {c.type}
                    </span>
                  </div>
                  <p className="text-sm text-white/45 leading-relaxed">{c.detail}</p>
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

      {/* ── Timeline (dinamis — status dihitung dari tanggal hari ini) ────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            {/* Left: sticky heading + progress */}
            <div className="md:sticky md:top-24">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-fitcom-dark/40 mb-4">
                Jadwal
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-fitcom-darkest leading-tight mb-5">
                Timeline
                <br />
                FITCOM 4.0
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-8">
                Pendaftaran dibuka 1 Juli – 1 September 2026. Final onsite di
                Universitas Dinamika Surabaya.
              </p>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>{passedCount} dari {timeline.length} milestone tercapai</span>
                  <span className="font-semibold text-fitcom-dark">{progressPct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-fitcom-neutral overflow-hidden">
                  <div
                    className="h-full rounded-full bg-fitcom-dark transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right: timeline list */}
            <ol className="relative flex flex-col">
              {timeline.map((item, i) => {
                const isLast = i === timeline.length - 1;

                /* Warna titik dan garis vertikal berdasarkan status */
                const dotClass =
                  item.status === "passed"
                    ? "bg-green-500 border-green-500"
                    : item.status === "today"
                    ? "bg-fitcom-dark border-fitcom-dark"
                    : item.isNext
                    ? "bg-white border-fitcom-dark"
                    : "bg-white border-fitcom-neutral";

                const lineClass =
                  item.status === "passed" ? "bg-green-400" : "bg-fitcom-neutral";

                return (
                  <li key={i} className="relative flex gap-5 pb-8 last:pb-0">
                    {/* Vertical line + dot column */}
                    <div className="flex flex-col items-center">
                      <span
                        className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 z-10 ${dotClass}`}
                      />
                      {!isLast && (
                        <div className={`w-0.5 flex-1 mt-1 ${lineClass}`} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-0 flex-1">
                      {/* Status badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {item.status === "passed" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            <CheckCircle2 size={10} />
                            Selesai
                          </span>
                        )}
                        {item.status === "today" && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white bg-fitcom-dark px-2.5 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                            HARI INI
                          </span>
                        )}
                        {item.isNext && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-fitcom-dark bg-fitcom-dark/10 px-2.5 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-fitcom-dark inline-block" />
                            {item.diffDays === 1
                              ? "Besok"
                              : `${item.diffDays} hari lagi`}
                          </span>
                        )}
                      </div>

                      <p
                        className={`text-xs font-bold tracking-wide uppercase mb-0.5 ${
                          item.status === "passed"
                            ? "text-green-600"
                            : item.status === "today" || item.isNext
                            ? "text-fitcom-dark"
                            : "text-gray-400"
                        }`}
                      >
                        {formatDate(item.date)}
                      </p>
                      <p
                        className={`text-base font-semibold mb-1 ${
                          item.status === "passed"
                            ? "text-gray-400 line-through decoration-1"
                            : item.status === "today" || item.isNext
                            ? "text-fitcom-darkest"
                            : "text-gray-600"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Penyelenggara ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-fitcom-darkest">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                Penyelenggara
              </p>

              {/* Undika logo */}
              <div className="mb-6">
                <Image
                  src="/undika-logo.png"
                  alt="Universitas Dinamika"
                  width={3509}
                  height={955}
                  className="h-12 w-auto"
                />
              </div>

              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Fakultas Teknologi dan Informatika, universitas swasta di Surabaya yang
                fokus di bidang teknologi informasi dan komunikasi.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <MapPin size={14} className="text-white/30 shrink-0" />
                  Jl. Raya Kedung Baruk No. 98, Surabaya, Jawa Timur
                </div>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <CalendarDays size={14} className="text-white/30 shrink-0" />
                  Pelaksanaan: 29 Oktober 2026
                </div>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <Building2 size={14} className="text-white/30 shrink-0" />
                  Fakultas Teknologi dan Informatika
                </div>
              </div>
            </div>

            {/* CTA card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
              <h3 className="text-xl font-black text-white mb-3">Siap berkompetisi?</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-7">
                Pendaftaran dibuka 1 Juli – 1 September 2026. Daftarkan dirimu sekarang
                dan buktikan kemampuanmu di tingkat nasional.
              </p>
              <Link
                href="/#cabang"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-fitcom-darkest font-bold text-sm hover:bg-fitcom-neutral transition-colors group"
              >
                Lihat Cabang Lomba
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
