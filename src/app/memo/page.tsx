import type { Metadata } from "next";
import { NotedContainer } from "./_feature/container";

export const metadata: Metadata = {
  title: "メモ一覧 - remembook",
  description:
    "メモを作成して、読書の理解度を深めましょう。メモをもとにAIが質問を生成し、最適なタイミングで復習をリマインドします。",
  robots: "noindex",
  openGraph: {
    title: "メモ一覧 - remembook",
    description:
      "メモを作成して、読書の理解度を深めましょう。メモをもとにAIが質問を生成し、最適なタイミングで復習をリマインドします。",
    type: "website",
  },
};

const Page = () => {
  return <NotedContainer />;
};

export default Page;
