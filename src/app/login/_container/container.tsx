import Link from "next/link";
import { LoginPresentational } from "./presentational";

export type Parameter = {
  email: string;
  password: string;
};

export const LgoinContainer = () => {
  return (
    <>
      <LoginPresentational />
      <Link href="/signup">新規登録</Link>
    </>
  );
};
