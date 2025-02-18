import { ChargeContainer } from "./_feature/container";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const sessionId =
    searchParams.session_id?.replace(/[^a-zA-Z0-9_]/g, "") ?? "";

  return <ChargeContainer sessionId={sessionId} />;
};

export default Page;
