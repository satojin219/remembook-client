import { AuthPresentational } from "./presentational";

export type Parameter = {
  email: string;
  password: string;
};

export const AuthContainer = () => {
  return <AuthPresentational />;
};
