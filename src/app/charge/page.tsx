import { ChargeContainer } from "./_feature/container";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) => {
  const params = await searchParams;
  const sessionId = params.session_id?.replace(/[^a-zA-Z0-9_]/g, "") ?? "";

  return <ChargeContainer sessionId={sessionId} />;
};

export default Page;
