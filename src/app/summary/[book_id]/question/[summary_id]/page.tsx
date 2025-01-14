import { QuestionContainer } from "./_container/container";

const Page = async ({
  params,
}: {
  params: Promise<{ summary_id: string }>;
}) => {
  const summaryId = (await params).summary_id;
  return <QuestionContainer summaryId={summaryId} />;
};

export default Page;
