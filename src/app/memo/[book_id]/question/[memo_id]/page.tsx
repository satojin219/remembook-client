import { QuestionContainer } from "./_feature/container";

const Page = async ({
  params,
}: {
  params: Promise<{ memo_id: string }>;
}) => {
  const memoId = (await params).memo_id;
  return <QuestionContainer memoId={memoId} />;
};

export default Page;
