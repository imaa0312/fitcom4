import Link from "next/link";
import { Shield, Code2, Cpu, Bot, CalendarDays, MapPin, Building2 } from "lucide-react";

const CABANG = [
  {
    Icon: Shield,
    name: "Cyber Security",
    type: "Individu",
    slug: "cyber-security",
    detail:
      "Uji kemampuan keamanan siber dalam 2 babak — Packet Tracer (konfigurasi jaringan) dan CTF (Capture The Flag). Peserta bersaing secara individu.",
  },
  {
    Icon: Code2,
    name: "Web Programming",
    type: "Tim (2 orang)",
    slug: "web-programming",
    detail:
      "Adu kemampuan membangun website dalam tim 2 orang. Babak penyisihan online dilanjut final live coding onsite di kampus.",
  },
  {
    Icon: Cpu,
    name: "Internet of Things",
    type: "Tim (2 orang)",
    slug: "internet-of-things",
    detail:
      "Rancang solusi IoT inovatif dalam 3 tahap: pengumpulan Proposal, Video & Poster, hingga presentasi langsung di depan juri.",
  },
  {
    Icon: Bot,
    name: "Sumo Bot RC 1kg",
    type: "Tim (2 orang)",
    slug: "sumo-bot-rc-1kg",
    detail:
      "Bangun dan kendalikan robot sumo berbobot maksimal 1kg. Turnamen berlangsung dalam format grup round-robin dilanjut babak knockout.",
  },
];

const TIMELINE = [
  { date: "1 Juli 2026", label: "Pendaftaran Dibuka", accent: true },
  { date: "1 September 2026", label: "Pendaftaran Ditutup" },
  { date: "17 September 2026", label: "Deadline Pengumpulan Tahap 1 (CS · Web · IoT)" },
  { date: "18 Oktober 2026", label: "Deadline Video & Poster IoT" },
  { date: "28 Oktober 2026", label: "Deadline PPT Presentasi IoT" },
  { date: "29 Oktober 2026", label: "Hari Pelaksanaan Final", accent: true },
];

export default function TentangPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="hero-gradient py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-fitcom-accent/15 border border-fitcom-accent/30 px-4 py-1.5 text-sm font-medium text-fitcom-dark mb-5">
            <span className="w-2 h-2 rounded-full bg-fitcom-accent inline-block" />
            Tentang Kami
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-fitcom-darkest leading-tight mb-4">
            FITCOM 4.0
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Faculty of Informatics Technology Competition — kompetisi teknologi tahunan
            tingkat nasional dari Universitas Dinamika Surabaya.
          </p>
        </div>
      </section>

      {/* ── Tentang ──────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-fitcom-darkest mb-6">
            Apa itu FITCOM?
          </h2>
          <div className="flex flex-col gap-4 text-gray-600 leading-relaxed">
            <p>
              FITCOM (Faculty of Informatics Technology Competition) adalah ajang kompetisi
              teknologi tahunan yang diselenggarakan oleh Fakultas Teknologi dan
              Informatika Universitas Dinamika. Kompetisi ini terbuka untuk siswa/i
              SMA, SMK, dan sederajat se-Indonesia yang ingin mengasah kemampuan
              teknologi mereka di tingkat nasional.
            </p>
            <p>
              Memasuki tahun keempat penyelenggaraan, FITCOM 4.0 hadir dengan tema{" "}
              <strong className="text-fitcom-dark">Intelligent Living Systems</strong> —
              mencerminkan arah teknologi masa depan di mana sistem cerdas menjadi
              bagian tak terpisahkan dari kehidupan sehari-hari. Tema ini menjadi
              benang merah keempat cabang lomba yang ada.
            </p>
            <p>
              Selain berkompetisi, peserta berkesempatan membangun jaringan dengan
              sesama pelajar berbakat dari seluruh Indonesia, mendapat pengakuan
              prestasi lewat sertifikat resmi, dan memperoleh pengalaman berharga
              sebelum memasuki dunia kuliah maupun industri teknologi.
            </p>
          </div>
        </div>
      </section>

      {/* ── Tema ─────────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-fitcom-darkest">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-fitcom-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Tema FITCOM 4.0
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
            Intelligent Living Systems
          </h2>
          <p className="text-fitcom-neutral/80 leading-relaxed max-w-xl mx-auto">
            Di era modern, kecerdasan buatan, Internet of Things, dan keamanan siber
            bukan lagi bidang yang berdiri sendiri — mereka menyatu membentuk ekosistem
            teknologi yang menopang kehidupan manusia. FITCOM 4.0 mengajak peserta
            mengeksplorasi dan membuktikan kemampuan mereka di tengah ekosistem ini.
          </p>
        </div>
      </section>

      {/* ── 4 Cabang Lomba ───────────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-fitcom-darkest text-center mb-2">
            4 Cabang Lomba
          </h2>
          <p className="text-center text-gray-400 text-sm mb-10">
            Setiap cabang dirancang untuk mengasah kompetensi yang berbeda
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CABANG.map(({ Icon, ...c }) => (
              <div
                key={c.slug}
                className="rounded-2xl border border-fitcom-neutral bg-white p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <Icon size={32} className="text-fitcom-accent mb-4" strokeWidth={1.75} />
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-fitcom-darkest">{c.name}</h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-fitcom-accent/10 text-fitcom-dark font-medium shrink-0 ml-2">
                    {c.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{c.detail}</p>
                <Link
                  href={`/competitions/${c.slug}/register`}
                  className="text-sm font-medium text-fitcom-dark hover:text-fitcom-accent transition-colors"
                >
                  Daftar cabang ini →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-fitcom-neutral/20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-fitcom-darkest mb-10 text-center">
            Jadwal & Timeline
          </h2>

          <ol className="relative border-l-2 border-fitcom-accent/30 flex flex-col gap-0">
            {TIMELINE.map((item, i) => (
              <li key={i} className="pl-6 pb-8 last:pb-0 relative">
                <span
                  className={[
                    "absolute -left-[9px] top-0.5 w-4 h-4 rounded-full border-2",
                    item.accent
                      ? "bg-fitcom-accent border-fitcom-accent"
                      : "bg-white border-fitcom-neutral",
                  ].join(" ")}
                />
                <p
                  className={[
                    "text-sm font-bold",
                    item.accent ? "text-fitcom-accent" : "text-fitcom-dark",
                  ].join(" ")}
                >
                  {item.date}
                </p>
                <p className="text-sm text-gray-600 mt-0.5">{item.label}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Penyelenggara ────────────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-fitcom-darkest mb-8 text-center">
            Penyelenggara
          </h2>

          <div className="rounded-2xl border border-fitcom-neutral p-8 flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-xl bg-fitcom-accent/10 flex items-center justify-center shrink-0">
              <Building2 size={24} className="text-fitcom-accent" />
            </div>
            <div>
              <h3 className="font-bold text-fitcom-darkest text-lg mb-1">
                Universitas Dinamika
              </h3>
              <p className="text-fitcom-dark font-medium text-sm mb-3">
                Fakultas Teknologi dan Informatika
              </p>
              <div className="flex flex-col gap-1.5 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-fitcom-accent shrink-0" />
                  Jl. Raya Kedung Baruk No. 98, Surabaya, Jawa Timur
                </span>
                <span className="flex items-center gap-2">
                  <CalendarDays size={14} className="text-fitcom-accent shrink-0" />
                  Pelaksanaan: 29 Oktober 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-fitcom-darkest text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-3">
            Siap berkompetisi?
          </h2>
          <p className="text-fitcom-neutral/80 text-sm mb-6">
            Pendaftaran dibuka 1 Juli – 1 September 2026. Daftarkan dirimu sekarang.
          </p>
          <Link
            href="/#cabang"
            className="inline-block px-8 py-3 rounded-xl bg-fitcom-accent text-white font-semibold hover:bg-fitcom-darkest transition-colors shadow-md"
          >
            Lihat Cabang Lomba
          </Link>
        </div>
      </section>
    </>
  );
}
