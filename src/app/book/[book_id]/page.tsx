import type { FC } from "react";
import { BookDetailContainer } from "./_container/container";

type Props = {
  params: {
    book_id: string; // パスパラメータ名
  };
};

const Page: FC<Props> = async (props) => {
  const params = await props.params;
  return <BookDetailContainer bookId={params.book_id} />;
};

export default Page;
