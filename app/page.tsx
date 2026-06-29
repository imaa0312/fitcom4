import Link from "next/link";

const BRANCHES = [
  {
    name: "Cyber Security",
    slug: "cyber-security",
    description:
      "Asah kemampuan keamanan siber lewat 2 babak: Packet Tracer dan CTF. Kompetisi individu.",
  },
  {
    name: "Web Programming",
    slug: "web-programming",
    description:
      "Tunjukkan kemampuan coding tim Anda lewat penyisihan online dan final live coding onsite.",
  },
  {
    name: "Internet of Things",
    slug: "internet-of-things",
    description:
      "Wujudkan solusi IoT inovatif lewat 3 tahap: Proposal, Video & Poster, hingga presentasi.",
  },
  {
    name: "Sumo Bot RC 1kg",
    slug: "sumo-bot-rc-1kg",
    description:
      "Rakit dan tarungkan robot sumo 1kg Anda dalam turnamen grup dan knockout.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-fitcom-darkest text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-6">
          {/* Logo placeholder — ganti dengan <Image src="/fitcom-logo.png"> setelah file di-upload */}
          <p className="text-5xl font-black tracking-tight">FITCOM 4.0</p>

          <p className="text-fitcom-accent text-lg font-medium tracking-wide uppercase">
            Faculty of Informatics &amp; Technology Competition
          </p>

          <p className="max-w-2xl text-fitcom-neutral leading-relaxed">
            FITCOM 4.0 adalah kompetisi teknologi tahunan tingkat nasional dari
            Fakultas Teknologi dan Informatika Universitas Dinamika, untuk
            siswa/i SMA/SMK/sederajat se-Indonesia. Tahun ini hadir dengan tema{" "}
            <span className="text-white font-medium">
              Intelligent Living Systems
            </span>{" "}
            dan 4 cabang lomba: Cyber Security, Web Programming, Internet of
            Things, dan Sumo Bot RC 1kg.
          </p>

          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-fitcom-accent/10 border border-fitcom-accent/30 px-5 py-2.5 text-fitcom-accent text-sm font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-fitcom-accent" />
            Pendaftaran dibuka 1 Juli – 1 September 2026
          </div>
        </div>
      </section>

      {/* ── 4 Cabang Lomba ─────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-fitcom-darkest mb-10 text-center">
            4 Cabang Lomba
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BRANCHES.map((branch) => (
              <div
                key={branch.slug}
                className="flex flex-col justify-between rounded-2xl border border-fitcom-neutral p-6 hover:shadow-md hover:border-fitcom-accent/50 transition-all"
              >
                <div>
                  <h3 className="text-lg font-semibold text-fitcom-darkest mb-2">
                    {branch.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {branch.description}
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/competitions/${branch.slug}/register`}
                    className="inline-block rounded-lg bg-fitcom-dark text-white text-sm font-medium px-4 py-2 hover:bg-fitcom-primary transition-colors"
                  >
                    Daftar Sekarang
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tentang FITCOM (collapsible) ───────────────────────────────── */}
      <section className="bg-fitcom-neutral/20 py-14">
        <div className="max-w-3xl mx-auto px-6">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <h2 className="text-xl font-bold text-fitcom-darkest">
                Tentang FITCOM
              </h2>
              <span className="text-fitcom-dark text-sm font-medium group-open:hidden">
                Selengkapnya ↓
              </span>
              <span className="text-fitcom-dark text-sm font-medium hidden group-open:inline">
                Tutup ↑
              </span>
            </summary>

            <div className="mt-6 flex flex-col gap-4 text-sm text-gray-700 leading-relaxed">
              {/* TODO: teks lengkap 4 paragraf akan diisi setelah diterima */}
              <p>
                Teks lengkap tentang FITCOM akan diisi di sini.
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="bg-fitcom-darkest text-fitcom-neutral">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-white">FITCOM 4.0</span>
          <span>
            © 2026 Fakultas Teknologi dan Informatika, Universitas Dinamika.
          </span>
        </div>
      </footer>
    </>
  );
}
