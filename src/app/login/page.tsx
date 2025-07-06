import type { Metadata } from "next";
import { LgoinContainer } from "./_feature/container";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "ログイン - remembook",
  description:
    "AIが生成した質問に回答して、読書の理解度を確認しましょう。スコアに応じて最適なタイミングで復習を行うことができます。",
  robots: "noindex",
};
export default function LoginPage() {
  return <LgoinContainer />;
}
