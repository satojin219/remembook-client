import type { Metadata } from "next";
import { ChangePasswordContainer } from "./_feature/container";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "パスワード変更 - remembook",
  description: "remembookのパスワードを変更します。",
  robots: "noindex",
};

const Page = () => {
  return <ChangePasswordContainer />;
};

export default Page;
