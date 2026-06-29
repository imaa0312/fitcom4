"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import type { SupabaseClient } from "@supabase/supabase-js";

// ── Types ────────────────────────────────────────────────────────────────────

export type ActionState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};

// ── Sign Up ──────────────────────────────────────────────────────────────────

const signUpSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  fullName: z.string().min(2, "Nama minimal 2 karakter"),
});

export async function signUpAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { email, password, fullName } = parsed.data;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { message: error.message };
  }

  if (!data.user) {
    return { message: "Gagal membuat akun. Coba lagi." };
  }

  await prisma.user.upsert({
    where: { id: data.user.id },
    update: {},
    create: {
      id: data.user.id,
      email,
      fullName,
      roles: { create: { role: "PESERTA" } },
    },
  });

  if (!data.session) {
    return {
      message:
        "Akun berhasil dibuat! Cek email kamu untuk konfirmasi, lalu kembali ke halaman ini dan login.",
    };
  }

  return { success: true };
}

// ── Registration ─────────────────────────────────────────────────────────────

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
const ALLOWED_PROOF_TYPES = [...ALLOWED_IMAGE_TYPES, "application/pdf"];

function validateFile(
  file: File | null,
  allowedTypes: string[],
  label: string
): string | null {
  if (!file || file.size === 0) return `${label} wajib diunggah`;
  if (file.size > MAX_FILE_BYTES) return `${label} maksimal 5 MB`;
  if (!allowedTypes.includes(file.type))
    return `${label}: format tidak didukung`;
  return null;
}

async function uploadFile(
  client: SupabaseClient,
  file: File,
  bucket: string,
  path: string
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await client.storage
    .from(bucket)
    .upload(path, buffer, { contentType: file.type, upsert: false });
  if (error) throw new Error(`Upload gagal (${path}): ${error.message}`);
  return path;
}

const commonSchema = z.object({
  schoolName: z.string().min(2, "Nama sekolah wajib diisi"),
  teacherName: z.string().min(2, "Nama guru pendamping wajib diisi"),
  teacherEmail: z.string().email("Email guru tidak valid"),
  teacherWhatsapp: z.string().min(8, "Nomor WhatsApp guru tidak valid"),
  referralSource: z.string().min(1, "Sumber informasi wajib dipilih"),
  referralOther: z.string().optional(),
});

const memberSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap wajib diisi"),
  classLevel: z.enum(["Kelas X", "Kelas XI", "Kelas XII"], { error: "Pilih kelas" }),
  email: z.string().email("Email peserta tidak valid"),
  whatsapp: z.string().min(8, "Nomor WhatsApp peserta tidak valid"),
});

// Bound args: branchId, branchSlug, participantType, teamSize, useTeamRoles, hasRobotName
// useActionState menambahkan prevState dan formData secara otomatis di belakang.
export async function submitRegistrationAction(
  branchId: string,
  branchSlug: string,
  participantType: "INDIVIDUAL" | "TEAM",
  teamSize: number,
  useTeamRoles: boolean,
  hasRobotName: boolean,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // ── Auth ────────────────────────────────────────────────────────────────
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { message: "Sesi habis. Silakan login ulang." };

  const allErrors: Record<string, string[]> = {};

  // ── Common field validation ──────────────────────────────────────────────
  const commonParsed = commonSchema.safeParse({
    schoolName: formData.get("schoolName"),
    teacherName: formData.get("teacherName"),
    teacherEmail: formData.get("teacherEmail"),
    teacherWhatsapp: formData.get("teacherWhatsapp"),
    referralSource: formData.get("referralSource"),
    referralOther: formData.get("referralOther") ?? undefined,
  });
  if (!commonParsed.success) {
    Object.assign(allErrors, commonParsed.error.flatten().fieldErrors);
  }

  // ── Identifier validation (alias vs teamName) ────────────────────────────
  let alias: string | null = null;
  let teamName: string | null = null;

  if (participantType === "INDIVIDUAL") {
    const r = z
      .object({ alias: z.string().min(1, "Alias wajib diisi") })
      .safeParse({ alias: formData.get("alias") });
    if (!r.success) Object.assign(allErrors, r.error.flatten().fieldErrors);
    else alias = r.data.alias;
  } else {
    const r = z
      .object({ teamName: z.string().min(2, "Nama tim wajib diisi") })
      .safeParse({ teamName: formData.get("teamName") });
    if (!r.success) Object.assign(allErrors, r.error.flatten().fieldErrors);
    else teamName = r.data.teamName;
  }

  // ── robotName (Sumo Bot only) ────────────────────────────────────────────
  let robotName: string | null = null;
  if (hasRobotName) {
    const r = z
      .object({ robotName: z.string().trim().min(1, "Nama robot wajib diisi") })
      .safeParse({ robotName: formData.get("robotName") });
    if (!r.success) Object.assign(allErrors, r.error.flatten().fieldErrors);
    else robotName = r.data.robotName;
  }

  // ── Per-member text field validation ────────────────────────────────────
  type MemberData = { fullName: string; classLevel: string; email: string; whatsapp: string };
  const memberData: MemberData[] = [];

  for (let i = 0; i < teamSize; i++) {
    const r = memberSchema.safeParse({
      fullName: formData.get(`member_${i}_fullName`),
      classLevel: formData.get(`member_${i}_classLevel`),
      email: formData.get(`member_${i}_email`),
      whatsapp: formData.get(`member_${i}_whatsapp`),
    });
    if (!r.success) {
      for (const [key, msgs] of Object.entries(r.error.flatten().fieldErrors)) {
        allErrors[`member_${i}_${key}`] = msgs as string[];
      }
    } else {
      memberData.push(r.data);
    }
  }

  // ── File validation ──────────────────────────────────────────────────────
  const paymentProof = formData.get("paymentProof") as File | null;
  const ppErr = validateFile(paymentProof, ALLOWED_PROOF_TYPES, "Bukti pembayaran");
  if (ppErr) allErrors["paymentProof"] = [ppErr];

  for (let i = 0; i < teamSize; i++) {
    const sc = formData.get(`member_${i}_studentCard`) as File | null;
    const scErr = validateFile(sc, ALLOWED_IMAGE_TYPES, "Kartu siswa");
    if (scErr) allErrors[`member_${i}_studentCard`] = [scErr];

    const ig1 = formData.get(`instagramProof_${i}_1`) as File | null;
    const ig1Err = validateFile(ig1, ALLOWED_IMAGE_TYPES, "Bukti follow Instagram (foto 1)");
    if (ig1Err) allErrors[`instagramProof_${i}_1`] = [ig1Err];

    const ig2 = formData.get(`instagramProof_${i}_2`) as File | null;
    const ig2Err = validateFile(ig2, ALLOWED_IMAGE_TYPES, "Bukti follow Instagram (foto 2)");
    if (ig2Err) allErrors[`instagramProof_${i}_2`] = [ig2Err];
  }

  if (Object.keys(allErrors).length > 0) {
    return { errors: allErrors };
  }

  // ── Upload ───────────────────────────────────────────────────────────────
  // Urutan hasil: [paymentProof, member0_sc, member0_ig1, member0_ig2, member1_sc, ...]
  // Offset member i: 1 + i * 3
  const regId = crypto.randomUUID();
  const base = `registrations/${regId}`;
  const ext = (f: File) => f.name.split(".").pop() ?? "bin";

  const uploadTasks: Promise<string>[] = [
    uploadFile(supabase, paymentProof!, "fitcom", `${base}/bukti-bayar.${ext(paymentProof!)}`),
  ];

  for (let i = 0; i < teamSize; i++) {
    const sc = formData.get(`member_${i}_studentCard`) as File;
    const ig1 = formData.get(`instagramProof_${i}_1`) as File;
    const ig2 = formData.get(`instagramProof_${i}_2`) as File;
    uploadTasks.push(
      uploadFile(supabase, sc, "fitcom", `${base}/member-${i}-kartu-siswa.${ext(sc)}`),
      uploadFile(supabase, ig1, "fitcom", `${base}/member-${i}-ig-1.${ext(ig1)}`),
      uploadFile(supabase, ig2, "fitcom", `${base}/member-${i}-ig-2.${ext(ig2)}`)
    );
  }

  let uploadResults: string[];
  try {
    uploadResults = await Promise.all(uploadTasks);
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Upload gagal" };
  }

  const paymentProofUrl = uploadResults[0];
  const studentCardUrls = Array.from({ length: teamSize }, (_, i) => uploadResults[1 + i * 3]);
  const instagramProofUrls = Array.from({ length: teamSize }, (_, i) => [
    uploadResults[2 + i * 3],
    uploadResults[3 + i * 3],
  ]).flat();

  // ── Database ─────────────────────────────────────────────────────────────
  const { referralSource, referralOther } = commonParsed.data!;
  const effectiveReferral =
    referralSource === "Other" && referralOther ? referralOther : referralSource;

  try {
    await prisma.competitionRegistration.create({
      data: {
        id: regId,
        branchId,
        alias,
        teamName,
        robotName,
        schoolName: commonParsed.data!.schoolName,
        teacherName: commonParsed.data!.teacherName,
        teacherEmail: commonParsed.data!.teacherEmail,
        teacherWhatsapp: commonParsed.data!.teacherWhatsapp,
        paymentProofUrl,
        instagramProofUrls,
        referralSource: effectiveReferral,
        registeredById: user.id,
        members: {
          create: memberData.map((m, i) => ({
            fullName: m.fullName,
            classLevel: m.classLevel,
            email: m.email,
            whatsapp: m.whatsapp,
            studentCardUrl: studentCardUrls[i],
            teamRole: useTeamRoles ? (i === 0 ? "LEADER" : "MEMBER") : null,
          })),
        },
      },
    });
  } catch {
    return { message: "Gagal menyimpan pendaftaran. Coba lagi." };
  }

  redirect(`/competitions/${branchSlug}/register/success`);
}
