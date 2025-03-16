import type { Metadata } from "next";
import { QuestionContainer } from "./_feature/container";

export const metadata: Metadata = {
  title: "質問回答 - remembook",
  description:
    "メモを作成して、読書の理解度を深めましょう。メモをもとにAIが質問を生成し、最適なタイミングで復習をリマインドします。",
  robots: "noindex",
};

const Page = async ({ params }: { params: Promise<{ memo_id: string }> }) => {
  const memoId = (await params).memo_id;
  return <QuestionContainer memoId={memoId} />;
};

export default Page;
