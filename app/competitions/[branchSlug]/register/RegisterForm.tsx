"use client";

import { useActionState } from "react";
import { submitRegistrationAction, type ActionState } from "./actions";

interface Props {
  branchId: string;
  branchSlug: string;
  participantType: "INDIVIDUAL" | "TEAM";
  teamSize: number;
  useTeamRoles: boolean;
  hasRobotName: boolean;
  userEmail: string;
}

const initialState: ActionState = {};

const REFERRAL_OPTIONS = [
  "Instagram",
  "Poster",
  "Sekolah atau Guru",
  "Teman atau Saudara",
  "Other",
];

const CLASS_OPTIONS = ["Kelas X", "Kelas XI", "Kelas XII"];

// ── Primitive helpers ────────────────────────────────────────────────────────

function FieldError({
  errors,
  name,
}: {
  errors?: Record<string, string[]>;
  name: string;
}) {
  const msgs = errors?.[name];
  if (!msgs?.length) return null;
  return <p className="mt-1 text-xs text-red-600">{msgs[0]}</p>;
}

function TextInput({
  name,
  label,
  type = "text",
  required = true,
  readOnly = false,
  defaultValue,
  placeholder,
  errors,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  readOnly?: boolean;
  defaultValue?: string;
  placeholder?: string;
  errors?: Record<string, string[]>;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        readOnly={readOnly}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={
          readOnly
            ? "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
            : "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        }
      />
      <FieldError errors={errors} name={name} />
    </div>
  );
}

function FileInput({
  name,
  label,
  hint,
  accept,
  errors,
}: {
  name: string;
  label: string;
  hint: string;
  accept: string;
  errors?: Record<string, string[]>;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        required
        className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-gray-200 cursor-pointer"
      />
      <p className="mt-1 text-xs text-gray-500">{hint}</p>
      <FieldError errors={errors} name={name} />
    </div>
  );
}

// ── TeamMemberFields ─────────────────────────────────────────────────────────
// Satu set field untuk satu anggota tim (atau peserta individu).
// index menentukan prefix nama field (member_0_*, member_1_*, dst).
// userEmail: kalau diisi, field email di-autofill dan readonly.

function TeamMemberFields({
  index,
  userEmail,
  errors,
}: {
  index: number;
  userEmail?: string;
  errors?: Record<string, string[]>;
}) {
  const p = `member_${index}_`; // prefix

  return (
    <div className="flex flex-col gap-4">
      <TextInput
        name={`${p}fullName`}
        label="Nama lengkap"
        errors={errors}
      />

      <div>
        <label
          className="block text-sm font-medium mb-1"
          htmlFor={`${p}classLevel`}
        >
          Kelas
        </label>
        <select
          id={`${p}classLevel`}
          name={`${p}classLevel`}
          required
          defaultValue=""
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
        >
          <option value="" disabled>
            Pilih kelas
          </option>
          {CLASS_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name={`${p}classLevel`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          name={`${p}email`}
          label="Email"
          type="email"
          readOnly={!!userEmail}
          defaultValue={userEmail}
          errors={errors}
        />
        <TextInput
          name={`${p}whatsapp`}
          label="WhatsApp"
          type="tel"
          placeholder="08xxxxxxxxxx"
          errors={errors}
        />
      </div>

      <FileInput
        name={`${p}studentCard`}
        label="Foto kartu siswa"
        hint="JPG / PNG / WEBP · maks 5 MB"
        accept="image/jpeg,image/png,image/webp,image/heic"
        errors={errors}
      />
    </div>
  );
}

// ── RegisterForm ─────────────────────────────────────────────────────────────

export default function RegisterForm({
  branchId,
  branchSlug,
  participantType,
  teamSize,
  useTeamRoles,
  hasRobotName,
  userEmail,
}: Props) {
  const boundAction = submitRegistrationAction.bind(
    null,
    branchId,
    branchSlug,
    participantType,
    teamSize,
    useTeamRoles,
    hasRobotName
  );
  const [state, formAction, pending] = useActionState(boundAction, initialState);

  const isTeam = participantType === "TEAM";

  return (
    <form action={formAction} className="flex flex-col gap-8">

      {/* ── Identifier: alias (INDIVIDUAL) atau nama tim (TEAM) ─── */}
      <section>
        <h2 className="text-base font-semibold mb-4 pb-2 border-b">
          {isTeam ? "Data Tim" : "Data Peserta"}
        </h2>
        <div className="flex flex-col gap-4">
          {isTeam ? (
            <>
              <TextInput
                name="teamName"
                label="Nama tim"
                placeholder="Nama tim yang dipakai saat kompetisi"
                errors={state.errors}
              />
              {hasRobotName && (
                <TextInput
                  name="robotName"
                  label="Nama robot"
                  placeholder="Nama robot yang akan digunakan"
                  errors={state.errors}
                />
              )}
            </>
          ) : (
            <TextInput
              name="alias"
              label="Alias / Nama panggilan"
              placeholder="Nama yang dipakai saat kompetisi"
              errors={state.errors}
            />
          )}
        </div>
      </section>

      {/* ── Member fields ─────────────────────────────────────────── */}
      {Array.from({ length: teamSize }, (_, i) => (
        <section key={i}>
          <h2 className="text-base font-semibold mb-4 pb-2 border-b">
            {!isTeam
              ? "Data Diri"
              : useTeamRoles
              ? i === 0
                ? "Ketua Tim"
                : "Anggota"
              : `Peserta ${i + 1}`}
          </h2>
          <TeamMemberFields
            index={i}
            userEmail={i === 0 ? userEmail : undefined}
            errors={state.errors}
          />
        </section>
      ))}

      {/* ── Sekolah & Guru ────────────────────────────────────────── */}
      <section>
        <h2 className="text-base font-semibold mb-4 pb-2 border-b">
          Data Sekolah
        </h2>
        <div className="flex flex-col gap-4">
          <TextInput
            name="schoolName"
            label="Nama sekolah"
            errors={state.errors}
          />
          <TextInput
            name="teacherName"
            label="Nama guru pendamping"
            errors={state.errors}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              name="teacherEmail"
              label="Email guru"
              type="email"
              errors={state.errors}
            />
            <TextInput
              name="teacherWhatsapp"
              label="WhatsApp guru"
              type="tel"
              placeholder="08xxxxxxxxxx"
              errors={state.errors}
            />
          </div>
        </div>
      </section>

      {/* ── Pembayaran ────────────────────────────────────────────── */}
      <section>
        <h2 className="text-base font-semibold mb-4 pb-2 border-b">
          Bukti Pembayaran
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Transfer ke rekening panitia dengan kode unik yang tertera, lalu
          unggah screenshot bukti transfer.
        </p>
        <FileInput
          name="paymentProof"
          label="Bukti transfer"
          hint="JPG / PNG / PDF · maks 5 MB"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          errors={state.errors}
        />
      </section>

      {/* ── Instagram ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-base font-semibold mb-4 pb-2 border-b">
          Bukti Follow Instagram
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {isTeam
            ? "Masing-masing anggota unggah 2 foto screenshot bukti follow akun Instagram FITCOM."
            : "Unggah 2 foto screenshot bukti follow akun Instagram FITCOM."}
        </p>
        <div className="flex flex-col gap-6">
          {Array.from({ length: teamSize }, (_, i) => (
            <div key={i} className="flex flex-col gap-4">
              {isTeam && (
                <p className="text-sm font-medium text-gray-700">
                  Peserta {i + 1}
                </p>
              )}
              <FileInput
                name={`instagramProof_${i}_1`}
                label="Foto 1"
                hint="JPG / PNG / WEBP · maks 5 MB"
                accept="image/jpeg,image/png,image/webp"
                errors={state.errors}
              />
              <FileInput
                name={`instagramProof_${i}_2`}
                label="Foto 2"
                hint="JPG / PNG / WEBP · maks 5 MB"
                accept="image/jpeg,image/png,image/webp"
                errors={state.errors}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Sumber info ───────────────────────────────────────────── */}
      <section>
        <h2 className="text-base font-semibold mb-4 pb-2 border-b">
          Dari mana kamu tahu FITCOM?
        </h2>
        <div className="flex flex-col gap-3">
          {REFERRAL_OPTIONS.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="referralSource"
                value={opt}
                required
              />
              <span>{opt === "Other" ? "Lainnya…" : opt}</span>
            </label>
          ))}
          <div className="pl-5">
            <input
              name="referralOther"
              type="text"
              placeholder="Tuliskan sumbernya"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <FieldError errors={state.errors} name="referralSource" />
        </div>
      </section>

      {/* ── Error & submit ─────────────────────────────────────────── */}
      {state.message && (
        <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-black text-white px-4 py-3 text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 transition-colors"
      >
        {pending ? "Mengirim pendaftaran…" : "Kirim Pendaftaran"}
      </button>
    </form>
  );
}
