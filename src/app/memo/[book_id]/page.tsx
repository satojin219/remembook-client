import type { Metadata } from "next";
import { MemoContainer } from "./_feature/container";

export const metadata: Metadata = {
  title: "メモ - remembook",
  description:
    "メモを作成して、読書の理解度を深めましょう。メモをもとにAIが質問を生成し、最適なタイミングで復習をリマインドします。",
  robots: "noindex",
  openGraph: {
    title: "メモ - remembook",
    description:
      "メモを作成して、読書の理解度を深めましょう。メモをもとにAIが質問を生成し、最適なタイミングで復習をリマインドします。",
    type: "website",
  },
};

const Page = async ({ params }: { params: Promise<{ book_id: string }> }) => {
  const bookId = (await params).book_id;
  return <MemoContainer bookId={bookId} />;
};

export default Page;
