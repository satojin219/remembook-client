import { QuestionContainer } from "./_feature/container";

const Page = async ({
  params,
}: {
  params: Promise<{ summary_id: string }>;
}) => {
  const summaryId = (await params).summary_id;
  return <QuestionContainer summaryId={summaryId} />;
};

export default Page;
