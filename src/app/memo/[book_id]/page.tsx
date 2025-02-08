import { MemoContainer } from "./_feature/container";

const Page = async ({ params }: { params: Promise<{ book_id: string }> }) => {
  const bookId = (await params).book_id;
  return <MemoContainer bookId={bookId} />;
};

export default Page;
