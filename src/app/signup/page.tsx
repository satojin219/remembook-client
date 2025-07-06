import type { Metadata } from "next";
import { SignupContainer } from "./_feature/container";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "新規登録 - remembook",
  description:
    "remembookに新規登録して、AIを活用した効率的な読書学習を始めましょう。要約作成からAI質問生成、最適な復習リマインドまで、あなたの学習をサポートします。",
  robots: "noindex",
};

const Page = () => {
  return <SignupContainer />;
};

export default Page;
