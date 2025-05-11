import { BookDetailContainer } from "./_feature/container";

export const runtime = "edge";

const Page = async ({ params }: { params: Promise<{ book_id: string }> }) => {
  const bookId = (await params).book_id;
  return <BookDetailContainer bookId={bookId} />;
};

export default Page;
