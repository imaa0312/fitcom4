<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Lomba Platform — Project Context

## Apa ini
Platform registrasi lomba, studi kasus pertama: **FITCOM 4.0** (event lomba
IT tahunan Universitas Dinamika, 4 cabang: Cyber Security, Web Programming,
Internet of Things, Sumo Bot). Rencana ekspansi ke forum, share artikel,
grup komunitas, dan short course — **belum dikerjakan, jangan dibangun
kecuali diminta eksplisit.**

## Struktur data inti (WAJIB dipahami sebelum ubah skema)
```
Competition (event, contoh: "FITCOM 4.0")
  └── CompetitionBranch (cabang lomba, contoh: "Cyber Security")
        ├── CompetitionRegistration (1 entri = 1 peserta individu ATAU 1 tim)
        │     └── TeamMember[] (detail per-orang: nama, kelas, email, kartu siswa)
        │     └── Submission[] (karya yang dikumpulkan, relasi ke SubmissionStage)
        └── SubmissionStage[] (definisi tahap pengumpulan karya, dibuat panitia)
```

Kenapa dipisah begini (jangan disederhanakan tanpa diskusi):
- **Competition vs CompetitionBranch**: satu event punya beberapa cabang lomba
  dengan jadwal, biaya, dan tipe peserta yang TOTAL BEDA. FITCOM = 1 Competition,
  4 CompetitionBranch.
- **CompetitionRegistration vs TeamMember**: registrasi adalah "wadah" (tim atau
  individu), TeamMember adalah detail tiap orang di dalamnya. Bahkan peserta
  individu (Cyber Security) tetap punya 1 row TeamMember — supaya field
  per-orang (nama, kelas, kartu siswa) konsisten di satu tempat, tidak
  tersebar antara kolom registrasi vs kolom tim.
- **SubmissionStage vs Submission**: stage = definisi tahap (panitia yang
  bikin, contoh "Pengumpulan Proposal" deadline 17 Sept). Submission = karya
  aktual yang dikumpulkan peserta untuk 1 stage. Satu CompetitionBranch bisa
  punya 0 stage (Sumo Bot — langsung tanding hari H) sampai 3 stage berurutan
  (IoT: proposal → PPT → video).

## Stack (sudah final, jangan diganti tanpa diskusi)
- Next.js 15 (App Router), TypeScript, Tailwind
- Prisma sebagai ORM
- Supabase: Auth + Postgres + Storage + Realtime
- Database: PostgreSQL (lewat Supabase)

## Aturan arsitektur yang WAJIB diikuti

1. **Satu sumber identitas.** Semua user, baik admin/panitia/peserta, ada di
   tabel `User` (lihat `prisma/schema.prisma`). `User.id` harus sama dengan
   `auth.users.id` di Supabase Auth. Jangan bikin tabel akun terpisah untuk
   fitur baru (forum, grup, course) — semua harus relasi ke `User.id` yang
   sudah ada.

2. **Role pakai tabel `UserRole`, bukan enum tunggal.** Satu user bisa
   punya lebih dari satu role sekaligus (misal panitia + peserta). Saat
   cek permission, query semua role user, jangan asumsikan satu user =
   satu role.

3. **Pembayaran masih manual, bukan payment gateway.** Peserta transfer
   manual ke rekening panitia dengan kode unik per cabang (lihat
   `CompetitionBranch.uniqueCode`), lalu upload bukti (`paymentProofUrl`).
   Panitia verifikasi manual lewat dashboard (`paymentVerifiedAt`,
   `paymentVerifiedById`). JANGAN integrasikan payment gateway kecuali
   diminta eksplisit — ini bukan requirement saat ini.

4. **Bukti follow Instagram itu requirement wajib di semua cabang FITCOM**
   (`instagramProofUrls`, 2 foto per peserta). Jangan dihapus dari form
   meski terasa tidak penting secara teknis.

5. **Saat menambah fitur baru (forum/grup/course) nanti:**
   - Buat model Prisma baru, relasi ke `User.id` yang sudah ada.
   - Jangan ubah model `User` itu sendiri kecuali benar-benar perlu field
     baru yang sifatnya universal (bukan spesifik ke satu fitur).
   - Ikuti pola: `createdAt`, `updatedAt`, `createdById`/`authorId` yang
     relasi ke `User`.

## Auth flow
- Pakai Supabase Auth (`lib/supabase/client.ts` untuk client component,
  `lib/supabase/server.ts` untuk server component/route handler).
- `middleware.ts` sudah handle auto-refresh session — jangan dihapus.
- Setelah signup di Supabase Auth, WAJIB insert row ke tabel `User` (Prisma)
  dengan id yang sama. Biasanya lewat Supabase trigger atau di
  signup route handler — pilih salah satu, jangan dua-duanya supaya tidak
  ada race condition.
- Catatan penting: peserta FITCOM adalah siswa SMA/SMK, kemungkinan banyak
  yang belum pernah punya akun semacam ini. Form pendaftaran HARUS tetap
  bisa diisi dengan UX sesederhana mungkin — pertimbangkan apakah registrasi
  akun Supabase wajib di depan, atau peserta bisa isi form dulu baru bikin
  akun belakangan (verifikasi lewat email/WA yang sudah diisi di form).

## Yang TIDAK perlu dikerjakan sekarang (jangan over-engineer)
- Payment gateway (masih manual transfer + verifikasi manual)
- Forum, grup, course — desain DB-nya sudah diantisipasi, tapi belum
  implement sampai diminta eksplisit
- Notifikasi realtime — Supabase Realtime sudah tersedia di stack, tapi
  belum dipakai di MVP ini
- Sistem juri/penilaian otomatis — penjurian masih manual oleh panitia
- **Tracking babak/bracket lomba** (Penyisihan → Semifinal → Final, sistem
  poin grup, knockout bracket) — keputusan sadar untuk skip ini di MVP.
  Sumo Bot punya struktur turnamen kompleks (4 grup round-robin lalu
  knockout 16 besar→8 besar→semifinal→final), Cyber Security punya 3
  babak (Packet Tracer→CTF→Wireless Exploitation). SEMUA itu dikerjakan
  manual oleh panitia (spreadsheet) untuk batch FITCOM 2026 ini. Kalau
  nanti diminta implement, ini butuh model baru (semacam `BranchRound`,
  `Match`, `MatchResult`) — JANGAN dipaksa masuk ke `CompetitionRegistration`
  yang sudah ada.
- **Detail teknis lomba** (dimensi robot, larangan sensor, kriteria
  penilaian per babak, dst) — ini konten statis untuk halaman info publik
  (bisa hardcode di halaman/CMS sederhana), BUKAN data terstruktur di
  database. Jangan bikin tabel untuk ini kecuali ada alasan kuat.

## Cara jalanin project
```bash
npm install
cp .env.example .env       # isi dengan kredensial Supabase asli
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Kalau ragu
Tim ini 2-4 orang, target awal <500 user. Pilih solusi paling sederhana
yang benar, bukan yang paling "scalable" secara teori. Jangan tambah
dependency atau abstraksi baru tanpa alasan konkret.
