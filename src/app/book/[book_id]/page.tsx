import { BookDetailContainer } from "./_feature/container";

const Page = async ({ params }: { params: Promise<{ book_id: string }> }) => {
  const bookId = (await params).book_id;
  return <BookDetailContainer bookId={bookId} />;
};

export default Page;
