"use client";

import { useActionState } from "react";
import { submitRegistrationAction, type ActionState } from "./actions";
import type { ReactNode } from "react";

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

// ── SVG icons ────────────────────────────────────────────────────────────────

const I = {
  person: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.23a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 18.92z" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  cog: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
};

// ── Primitive helpers ────────────────────────────────────────────────────────

function FieldError({ errors, name }: { errors?: Record<string, string[]>; name: string }) {
  const msgs = errors?.[name];
  if (!msgs?.length) return null;
  return <p className="mt-1 text-xs text-red-500">{msgs[0]}</p>;
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-semibold text-fitcom-darkest mb-4 pl-3 border-l-2 border-fitcom-accent text-sm">
      {children}
    </h2>
  );
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
  icon,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  readOnly?: boolean;
  defaultValue?: string;
  placeholder?: string;
  errors?: Record<string, string[]>;
  icon?: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-fitcom-darkest mb-1" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          readOnly={readOnly}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={[
            "w-full rounded-lg border px-3 py-2.5 text-sm transition-colors",
            icon ? "pl-9" : "",
            readOnly
              ? "bg-gray-50 border-fitcom-neutral/50 text-gray-400 cursor-not-allowed"
              : "border-fitcom-neutral bg-white text-fitcom-darkest focus:outline-none focus:border-fitcom-accent focus:ring-2 focus:ring-fitcom-accent/20",
          ].join(" ")}
        />
      </div>
      <FieldError errors={errors} name={name} />
    </div>
  );
}

function SelectInput({
  name,
  label,
  options,
  placeholder,
  errors,
  icon,
}: {
  name: string;
  label: string;
  options: string[];
  placeholder?: string;
  errors?: Record<string, string[]>;
  icon?: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-fitcom-darkest mb-1" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </span>
        )}
        <select
          id={name}
          name={name}
          required
          defaultValue=""
          className={[
            "w-full appearance-none rounded-lg border border-fitcom-neutral bg-white px-3 py-2.5 pr-9 text-sm text-fitcom-darkest",
            "focus:outline-none focus:border-fitcom-accent focus:ring-2 focus:ring-fitcom-accent/20 transition-colors",
            icon ? "pl-9" : "",
          ].join(" ")}
        >
          <option value="" disabled>
            {placeholder ?? "Pilih..."}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
          {I.chevron}
        </span>
      </div>
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
      <label className="block text-sm font-medium text-fitcom-darkest mb-1" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-fitcom-accent">
          {I.upload}
        </span>
        <input
          id={name}
          name={name}
          type="file"
          accept={accept}
          required
          className="block w-full pl-9 text-sm text-gray-500 rounded-lg border-2 border-dashed border-fitcom-neutral cursor-pointer
            file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0
            file:bg-fitcom-accent/10 file:text-fitcom-dark file:text-sm file:font-medium
            hover:file:bg-fitcom-accent/20 hover:border-fitcom-accent transition-colors py-2.5"
        />
      </div>
      <p className="mt-1 text-xs text-gray-400">{hint}</p>
      <FieldError errors={errors} name={name} />
    </div>
  );
}

// ── TeamMemberFields ─────────────────────────────────────────────────────────

function TeamMemberFields({
  index,
  userEmail,
  errors,
}: {
  index: number;
  userEmail?: string;
  errors?: Record<string, string[]>;
}) {
  const p = `member_${index}_`;

  return (
    <div className="flex flex-col gap-4">
      <TextInput
        name={`${p}fullName`}
        label="Nama lengkap"
        errors={errors}
        icon={I.person}
      />

      <SelectInput
        name={`${p}classLevel`}
        label="Kelas"
        options={CLASS_OPTIONS}
        placeholder="Pilih kelas"
        errors={errors}
        icon={I.cap}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          name={`${p}email`}
          label="Email"
          type="email"
          readOnly={!!userEmail}
          defaultValue={userEmail}
          errors={errors}
          icon={I.mail}
        />
        <TextInput
          name={`${p}whatsapp`}
          label="WhatsApp"
          type="tel"
          placeholder="08xxxxxxxxxx"
          errors={errors}
          icon={I.phone}
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
    <form action={formAction} className="flex flex-col gap-7">

      {/* ── Identifier ────────────────────────────────────────────────── */}
      <section>
        <SectionHeading>{isTeam ? "Data Tim" : "Data Peserta"}</SectionHeading>
        <div className="flex flex-col gap-4">
          {isTeam ? (
            <>
              <TextInput
                name="teamName"
                label="Nama tim"
                placeholder="Nama tim yang dipakai saat kompetisi"
                errors={state.errors}
                icon={I.users}
              />
              {hasRobotName && (
                <TextInput
                  name="robotName"
                  label="Nama robot"
                  placeholder="Nama robot yang akan digunakan"
                  errors={state.errors}
                  icon={I.cog}
                />
              )}
            </>
          ) : (
            <TextInput
              name="alias"
              label="Alias / Nama panggilan"
              placeholder="Nama yang dipakai saat kompetisi"
              errors={state.errors}
              icon={I.tag}
            />
          )}
        </div>
      </section>

      {/* ── Member fields ─────────────────────────────────────────────── */}
      {Array.from({ length: teamSize }, (_, i) => (
        <section key={i}>
          <SectionHeading>
            {!isTeam
              ? "Data Diri"
              : useTeamRoles
              ? i === 0
                ? "Ketua Tim"
                : "Anggota"
              : `Peserta ${i + 1}`}
          </SectionHeading>
          <TeamMemberFields
            index={i}
            userEmail={i === 0 ? userEmail : undefined}
            errors={state.errors}
          />
        </section>
      ))}

      {/* ── Sekolah & Guru ────────────────────────────────────────────── */}
      <section>
        <SectionHeading>Data Sekolah</SectionHeading>
        <div className="flex flex-col gap-4">
          <TextInput
            name="schoolName"
            label="Nama sekolah"
            errors={state.errors}
            icon={I.building}
          />
          <TextInput
            name="teacherName"
            label="Nama guru pendamping"
            errors={state.errors}
            icon={I.person}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              name="teacherEmail"
              label="Email guru"
              type="email"
              errors={state.errors}
              icon={I.mail}
            />
            <TextInput
              name="teacherWhatsapp"
              label="WhatsApp guru"
              type="tel"
              placeholder="08xxxxxxxxxx"
              errors={state.errors}
              icon={I.phone}
            />
          </div>
        </div>
      </section>

      {/* ── Pembayaran ────────────────────────────────────────────────── */}
      <section>
        <SectionHeading>Bukti Pembayaran</SectionHeading>
        <p className="text-xs text-gray-400 mb-4">
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

      {/* ── Instagram ─────────────────────────────────────────────────── */}
      <section>
        <SectionHeading>Bukti Follow Instagram</SectionHeading>
        <p className="text-xs text-gray-400 mb-4">
          {isTeam
            ? "Masing-masing anggota unggah 2 foto screenshot bukti follow akun Instagram FITCOM."
            : "Unggah 2 foto screenshot bukti follow akun Instagram FITCOM."}
        </p>
        <div className="flex flex-col gap-6">
          {Array.from({ length: teamSize }, (_, i) => (
            <div key={i} className="flex flex-col gap-4">
              {isTeam && (
                <p className="text-xs font-semibold text-fitcom-dark uppercase tracking-wide">
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

      {/* ── Sumber info ───────────────────────────────────────────────── */}
      <section>
        <SectionHeading>Dari mana kamu tahu FITCOM?</SectionHeading>
        <div className="flex flex-col gap-1">
          {REFERRAL_OPTIONS.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2.5 text-sm text-fitcom-darkest cursor-pointer px-3 py-2 rounded-lg hover:bg-fitcom-neutral/20 transition-colors"
            >
              <input
                type="radio"
                name="referralSource"
                value={opt}
                required
                className="accent-fitcom-accent"
              />
              {opt}
            </label>
          ))}
        </div>
        <div className="mt-3">
          <TextInput
            name="referralOther"
            label="Jika Other, sebutkan"
            required={false}
            placeholder="Tulis sumber informasi..."
            errors={state.errors}
          />
        </div>
        <FieldError errors={state.errors} name="referralSource" />
      </section>

      {/* ── Error / submit ────────────────────────────────────────────── */}
      {state.message && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-fitcom-accent text-white font-semibold py-3 text-sm hover:bg-fitcom-primary hover:text-white disabled:opacity-50 transition-all shadow-md hover:shadow-lg active:shadow-sm active:scale-[0.99]"
      >
        {pending ? "Mengirim pendaftaran…" : "Kirim Pendaftaran"}
      </button>
    </form>
  );
}
