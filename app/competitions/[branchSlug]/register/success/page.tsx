import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ branchSlug: string }>;
}) {
  const { branchSlug } = await params;

  const branch = await prisma.competitionBranch.findFirst({
    where: { slug: branchSlug },
    select: { name: true },
  });

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-bold">Pendaftaran Terkirim!</h1>
        <p className="mt-3 text-gray-600">
          Pendaftaran kamu di cabang{" "}
          <strong>{branch?.name ?? branchSlug}</strong> sudah kami terima.
          Panitia akan memverifikasi bukti pembayaran dan menghubungi kamu
          melalui email atau WhatsApp.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
