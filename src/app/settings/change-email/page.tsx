import type { Metadata } from "next";
import { ChangeEmailContainer } from "./_feature/container";

export const metadata: Metadata = {
  title: "メールアドレス変更 - remembook",
  description: "remembookのメールアドレスを変更します。",
  robots: "noindex",
  openGraph: {
    title: "メールアドレス変更 - remembook",
    description: "remembookのメールアドレスを変更します。",
    type: "website",
  },
};

const Page = () => {
  return <ChangeEmailContainer />;
};

export default Page;
