import { LoginPresentational } from "./presentational";

export type Parameter = {
  email: string;
  password: string;
};

export const LgoinContainer = () => {
  return (
    <>
      <LoginPresentational />
    </>
  );
};
