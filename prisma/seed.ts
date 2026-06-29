import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // ── 1. User panitia dummy ────────────────────────────────────────────────
  // id sengaja di-hardcode supaya seed bisa diulang (upsert idempotent).
  // Di production, id HARUS sama dengan Supabase auth.users.id — ini hanya
  // untuk development/testing.
  const PANITIA_ID = "00000000-0000-0000-0000-000000000001";

  const panitia = await prisma.user.upsert({
    where: { id: PANITIA_ID },
    update: {},
    create: {
      id: PANITIA_ID,
      email: "panitia@fitcom.test",
      fullName: "Panitia FITCOM",
      roles: {
        create: { role: "PANITIA" },
      },
    },
  });

  console.log(`✓ User panitia: ${panitia.email}`);

  // ── 2. Competition ───────────────────────────────────────────────────────
  const competition = await prisma.competition.upsert({
    where: { slug: "fitcom-4-0" },
    update: {},
    create: {
      title: "FITCOM 4.0",
      slug: "fitcom-4-0",
      description:
        "Festival IT Competition 4.0 — lomba IT tahunan Universitas Dinamika.",
      theme: "Intelligent Living Systems",
      status: "OPEN",
      eventDate: new Date("2026-10-29T00:00:00+07:00"),
      location: "Universitas Dinamika, Surabaya, Jl. Raya Kedung Baruk No. 98",
      createdById: PANITIA_ID,
    },
  });

  console.log(`✓ Competition: ${competition.title}`);

  const REG_START = new Date("2026-07-01T00:00:00+07:00");
  const REG_END = new Date("2026-09-01T00:00:00+07:00");

  // ── 3. CompetitionBranch + SubmissionStage ───────────────────────────────

  // ── 3a. Cyber Security ──────────────────────────────────────────────────
  const cyberSec = await prisma.competitionBranch.upsert({
    where: { competitionId_slug: { competitionId: competition.id, slug: "cyber-security" } },
    update: {},
    create: {
      competitionId: competition.id,
      name: "Cyber Security",
      slug: "cyber-security",
      participantType: "INDIVIDUAL",
      maxTeamsPerSchool: 3,
      registrationFee: 100000,
      uniqueCode: 1,
      registrationStart: REG_START,
      registrationEnd: REG_END,
      submissionStages: {
        create: [
          {
            name: "Pengumpulan Project",
            order: 1,
            deadline: new Date("2026-09-17T23:59:00+07:00"),
            expectedFileHint: ".pka",
            allowsLink: false,
          },
        ],
      },
    },
  });

  console.log(`✓ Branch: ${cyberSec.name}`);

  // ── 3b. Web Programming ─────────────────────────────────────────────────
  const webProg = await prisma.competitionBranch.upsert({
    where: { competitionId_slug: { competitionId: competition.id, slug: "web-programming" } },
    update: {},
    create: {
      competitionId: competition.id,
      name: "Web Programming",
      slug: "web-programming",
      participantType: "TEAM",
      teamSize: 2,
      maxTeamsPerSchool: 3,
      registrationFee: 100000,
      uniqueCode: 2,
      registrationStart: REG_START,
      registrationEnd: REG_END,
      submissionStages: {
        create: [
          {
            name: "Pengumpulan Proposal & Figma",
            order: 1,
            deadline: new Date("2026-09-17T23:59:00+07:00"),
            expectedFileHint: "PDF",
            allowsLink: true,
          },
        ],
      },
    },
  });

  console.log(`✓ Branch: ${webProg.name}`);

  // ── 3c. Internet of Things ──────────────────────────────────────────────
  const iot = await prisma.competitionBranch.upsert({
    where: { competitionId_slug: { competitionId: competition.id, slug: "internet-of-things" } },
    update: {},
    create: {
      competitionId: competition.id,
      name: "Internet of Things",
      slug: "internet-of-things",
      participantType: "TEAM",
      teamSize: 2,
      maxTeamsPerSchool: 3,
      registrationFee: 100000,
      uniqueCode: 3,
      registrationStart: REG_START,
      registrationEnd: REG_END,
      submissionStages: {
        create: [
          {
            name: "Pengumpulan Proposal",
            order: 1,
            deadline: new Date("2026-09-17T23:59:00+07:00"),
            expectedFileHint: "PDF",
            allowsLink: false,
          },
          {
            name: "Pengumpulan Video dan Poster",
            order: 2,
            deadline: new Date("2026-10-18T23:59:00+07:00"),
            expectedFileHint: "zip/rar",
            allowsLink: false,
          },
          {
            name: "Pengumpulan PPT Presentasi",
            order: 3,
            deadline: new Date("2026-10-28T23:59:00+07:00"),
            expectedFileHint: "PPT",
            allowsLink: false,
          },
        ],
      },
    },
  });

  console.log(`✓ Branch: ${iot.name}`);

  // ── 3d. Sumo Bot RC 1kg ─────────────────────────────────────────────────
  // Tidak ada SubmissionStage — langsung tanding di hari H.
  const sumoBot = await prisma.competitionBranch.upsert({
    where: { competitionId_slug: { competitionId: competition.id, slug: "sumo-bot-rc-1kg" } },
    update: {},
    create: {
      competitionId: competition.id,
      name: "Sumo Bot RC 1kg",
      slug: "sumo-bot-rc-1kg",
      participantType: "TEAM",
      teamSize: 2,
      maxTeamsPerSchool: 3,
      registrationFee: 100000,
      uniqueCode: 4,
      registrationStart: REG_START,
      registrationEnd: REG_END,
    },
  });

  console.log(`✓ Branch: ${sumoBot.name}`);
  console.log("\nSeed selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
