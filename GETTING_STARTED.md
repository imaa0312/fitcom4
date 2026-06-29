# Panduan Mulai di Claude Code (VS Code)

Baca ini dulu sebelum buka Claude Code. Urutan di bawah didesain supaya
kamu tidak salah arah — JANGAN lompat ke step coding sebelum setup
selesai, karena Claude Code akan gagal generate/migrate tanpa kredensial.

---

## STEP 0 — Setup Supabase (di luar VS Code, lakukan dulu)

1. Buka [supabase.com](https://supabase.com), bikin project baru (gratis).
2. Tunggu provisioning selesai (~2 menit).
3. Ambil 3 hal dari dashboard:
   - **Project Settings > API**: `Project URL` dan `anon public key`
   - **Project Settings > API**: `service_role key` (klik "Reveal")
   - **Project Settings > Database > Connection string**: pilih mode
     "Transaction" (untuk `DATABASE_URL`, port 6543) dan mode "Session"
     (untuk `DIRECT_URL`, port 5432)
4. Buka folder project ini di VS Code.
5. Copy `.env.example` jadi `.env`, isi semua value dengan yang kamu ambil
   di atas.

**Jangan lanjut ke Step 1 sebelum `.env` terisi lengkap** — Claude Code
akan gagal di `prisma migrate` kalau `DATABASE_URL` kosong/salah.

---

## STEP 1 — Buka Claude Code, jalankan setup awal

Buka panel Claude Code (✱ di pojok kanan bawah VS Code), lalu ketik:

```
Baca AGENTS.md dan prisma/schema.prisma supaya paham konteks project
ini. Setelah itu jalankan: npm install, npx prisma generate, dan
npx prisma migrate dev --name init. Laporkan kalau ada error.
```

Tunggu sampai selesai. Kalau ada error soal koneksi database, cek lagi
`.env` — biasanya typo di connection string atau password ada karakter
spesial yang perlu di-encode.

---

## STEP 2 — Bikin Prisma seed untuk data FITCOM (opsional tapi disarankan)

Supaya kamu bisa langsung lihat data nyata tanpa input manual lewat UI:

```
Buatkan prisma/seed.ts yang insert 1 row Competition ("FITCOM 4.0",
tema "Intelligent Living Systems", eventDate 29 Oktober 2026, location
"Universitas Dinamika, Surabaya, Jl. Raya Kedung Baruk No. 98"), lalu
4 row CompetitionBranch di bawahnya:
1. Cyber Security — INDIVIDUAL, maxTeamsPerSchool 3, registrationFee
   100000, uniqueCode 1, registrationStart 1 Juli 2026, registrationEnd
   1 September 2026
2. Web Programming — TEAM, teamSize 2, maxTeamsPerSchool 3,
   registrationFee 100000, uniqueCode 2, tanggal sama
3. Internet of Things — TEAM, teamSize 2, maxTeamsPerSchool 3,
   registrationFee 100000, uniqueCode 3, tanggal sama
4. Sumo Bot RC 1kg — TEAM, teamSize 2, maxTeamsPerSchool 3,
   registrationFee 100000, uniqueCode 4, tanggal sama

Untuk createdById, butuh 1 User dummy dengan role PANITIA — buat juga
itu di seed (email panitia@fitcom.test).

Tambahkan juga SubmissionStage sesuai jadwal:
- Cyber Security: 1 stage "Pengumpulan Project", deadline 17 Sept 2026,
  expectedFileHint ".pka"
- Web Programming: 1 stage "Pengumpulan Proposal & Figma", deadline
  17 Sept 2026, expectedFileHint "PDF", allowsLink true
- IoT: 3 stage berurutan — "Pengumpulan Proposal" (17 Sept),
  "Pengumpulan PPT" (20 Sept — cek ulang tanggal pasti ke saya),
  "Pengumpulan Video" (18 Okt 2026), expectedFileHint masing-masing
  PDF/PPT/zip-rar
- Sumo Bot: tidak ada stage

Lalu jalankan seed-nya.
```

---

## STEP 3 — Bikin halaman pendaftaran (yang paling urgent)

```
Buatkan halaman pendaftaran lomba di app/competitions/[branchSlug]/register
Alurnya:
1. Tampilkan info cabang lomba (nama, biaya, deadline) dari
   CompetitionBranch berdasarkan slug di URL
2. Cek apakah user sudah login (pakai Supabase Auth). Kalau belum,
   tampilkan form signup SEDERHANA dulu (email + password + nama)
   sebelum form pendaftaran lomba muncul — jangan pisah jadi halaman
   terpisah, gabung jadi satu flow biar tidak terasa seperti gate.
3. Setelah login/signup, tampilkan form sesuai participantType cabang:
   - INDIVIDUAL: 1 set field TeamMember (nama, kelas, email, WA, upload
     kartu siswa) + alias
   - TEAM: 2 set field TeamMember (atau sesuai teamSize), + nama tim.
     Kalau cabangnya Sumo Bot, beri label "Ketua Tim" dan "Anggota"
     untuk teamRole; cabang lain tidak perlu label ini.
4. Field guru pendamping (nama, email, WA) — selalu ada di semua cabang
5. Field nama sekolah
6. Upload bukti pembayaran (1 file)
7. Upload bukti follow Instagram (2 file per peserta — ulangi sesuai
   jumlah TeamMember)
8. Dropdown sumber info (Instagram/Poster/Sekolah atau Guru/Teman atau
   Saudara/Other dengan text input kalau Other)
9. Submit -> simpan ke CompetitionRegistration + TeamMember terkait,
   status default PENDING_PAYMENT

Gunakan Server Action untuk submit form, validasi dengan Zod. File
upload ke Supabase Storage, simpan path-nya ke field *Url yang sesuai.
```

**Catatan:** prompt di atas itu besar — kalau Claude Code kelihatan
bingung atau hasilnya berantakan, pecah jadi beberapa prompt lebih
kecil (misal: dulu bikin form INDIVIDUAL saja, baru nanti expand ke
TEAM).

---

## STEP 4 — Dashboard panitia (verifikasi pembayaran)

Setelah Step 3 jalan, baru kerjakan ini:

```
Buatkan halaman dashboard panitia di app/dashboard/registrations yang
menampilkan semua CompetitionRegistration, bisa difilter per
CompetitionBranch. Panitia bisa lihat detail tiap registrasi (termasuk
preview bukti bayar dan bukti follow IG), lalu klik approve/reject yang
update field status, paymentVerifiedAt, paymentVerifiedById.
```

---

## Tips ngoding bareng Claude Code

- **Selalu mulai sesi baru dengan**: "baca AGENTS.md dulu" — supaya dia
  ingat aturan arsitektur, terutama kalau context sebelumnya sudah panjang.
- **Kalau Claude Code mengusulkan ubah skema Prisma**, baca dulu alasannya.
  Skema sudah dirancang sesuai form Google Form yang asli — perubahan
  tanpa alasan kuat kemungkinan besar salah arah.
- **Review tiap diff sebelum accept**, terutama di awal. Jangan auto-accept
  semua perubahan pas masih fase kritis (form pendaftaran).
- **Kalau deadline kepepet dan fitur belum semua jadi**: fallback ke Google
  Form yang sudah ada itu valid. Tidak masalah platform baru launch
  belakangan setelah dites dengan baik.
