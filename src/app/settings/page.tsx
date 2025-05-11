import type { Metadata } from "next";
import { SettingsContainer } from "./_feature/container";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "設定 - remembook",
  description: "remembookの設定ページです。",
  robots: "noindex",
  openGraph: {
    title: "設定 - remembook",
    description: "remembookの設定ページです。",
    type: "website",
  },
};

const Page = () => {
  return <SettingsContainer />;
};

export default Page;
