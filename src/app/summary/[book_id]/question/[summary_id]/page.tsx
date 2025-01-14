import type { FC } from "react";
import { QuestionContainer } from "./_container/container";

type Props = {
  params: {
    summary_id: string;
  };
};

const Page: FC<Props> = async (props) => {
  const params = await props.params;
  return <QuestionContainer summaryId={params.summary_id} />;
};

export default Page;
