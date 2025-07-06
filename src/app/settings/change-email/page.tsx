import type { Metadata } from "next";
import { ChangeEmailContainer } from "./_feature/container";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "メールアドレス変更 - remembook",
  description: "remembookのメールアドレスを変更します。",
  robots: "noindex",
};

const Page = () => {
  return <ChangeEmailContainer />;
};

export default Page;
