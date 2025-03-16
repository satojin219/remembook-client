import type { Metadata } from "next";
import { LgoinContainer } from "./_feature";

export const metadata: Metadata = {
  title: "ログイン - remembook",
  description:
    "AIが生成した質問に回答して、読書の理解度を確認しましょう。スコアに応じて最適なタイミングで復習を行うことができます。",
  robots: "noindex",
  openGraph: {
    title: "復習一覧 - remembook",
    description:
      "AIが生成した質問に回答して、読書の理解度を確認しましょう。スコアに応じて最適なタイミングで復習を行うことができます。",
    type: "website",
  },
};
export default function LoginPage() {
  return <LgoinContainer />;
}
