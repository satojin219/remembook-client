"use server";

import { getMe } from "@/lib/api/getMe";

export const Header = async () => {
  const user = await getMe();
  return <header>{user.data?.coins}</header>;
};
