import type { Metadata } from "next";
import { NotedContainer } from "./_feature/container";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "メモ一覧 - remembook",
  description:
    "メモを作成して、読書の理解度を深めましょう。メモをもとにAIが質問を生成し、最適なタイミングで復習をリマインドします。",
  robots: "noindex",
};

const Page = () => {
  return <NotedContainer />;
};

export default Page;
