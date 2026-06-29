# Lomba Platform

Platform registrasi lomba — fase MVP. Forum, grup, dan short course
direncanakan untuk fase berikutnya (skema DB sudah diantisipasi, belum
diimplementasi).

## Stack
- **Framework**: Next.js 15 (App Router) + TypeScript + Tailwind
- **ORM**: Prisma
- **Backend services**: Supabase (Auth, Postgres, Storage, Realtime)

## Struktur penting
```
prisma/schema.prisma   ← desain database, BACA dulu sebelum nambah model
AGENTS.md              ← instruksi untuk Claude Code / AI agent, baca ini juga
lib/supabase/          ← client/server/middleware Supabase
lib/prisma.ts          ← Prisma client singleton
app/                    ← halaman (login, register, competitions, dashboard)
```

## Setup pertama kali

1. Bikin project di [supabase.com](https://supabase.com), catat URL + anon key
   + service role key dari Project Settings > API, dan connection string dari
   Project Settings > Database.

2. Copy env:
   ```bash
   cp .env.example .env
   ```
   Isi semua value di `.env` dengan kredensial dari Supabase dashboard.

3. Install dependencies:
   ```bash
   npm install
   ```

4. Generate Prisma client & jalankan migration pertama:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Jalankan dev server:
   ```bash
   npm run dev
   ```

## Catatan untuk tim
Baca `AGENTS.md` sebelum mulai "vibe coding" pakai Claude Code — di situ
ada aturan arsitektur yang harus diikuti supaya pengembangan forum/grup/
course nanti tidak perlu rewrite skema dari nol.
