import type { Metadata } from "next";
import { ChargeContainer } from "./_feature/container";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "コインの購入 - remembook",
  description:
    "remembookのコインを購入して、より多くの本の要約と学習を行いましょう。AIによる質問生成や理解度分析で、効率的な学習を継続できます。",
  robots: "noindex",
  openGraph: {
    title: "コインの購入 - remembook",
    description:
      "remembookのコインを購入して、より多くの本の要約と学習を行いましょう。",
    type: "website",
  },
};

export default async function ChargePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id?.replace(/[^a-zA-Z0-9_]/g, "") ?? "";
  return <ChargeContainer sessionId={sessionId} />;
}
