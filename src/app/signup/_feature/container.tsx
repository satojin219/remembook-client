import Link from "next/link";
import { SignupPresentational } from "./presentational";

export const SignupContainer = () => {
  return (
    <>
      <SignupPresentational />
      <Link href="/login">ログイン画面へ</Link>
    </>
  );
};
