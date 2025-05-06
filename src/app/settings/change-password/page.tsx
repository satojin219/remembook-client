import type { Metadata } from "next";
import { ChangePasswordContainer } from "./_feature/container";

export const metadata: Metadata = {
  title: "パスワード変更 - remembook",
  description: "remembookのパスワードを変更します。",
  robots: "noindex",
  openGraph: {
    title: "パスワード変更 - remembook",
    description: "remembookのパスワードを変更します。",
    type: "website",
  },
};

const Page = () => {
  return <ChangePasswordContainer />;
};

export default Page;
