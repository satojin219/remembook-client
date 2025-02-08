"use server";

import { buyCoin } from "./_api/buyCoin";
import { BillingPresentational } from "./presentational";

export const BillingContainer = async () => {
  return <BillingPresentational buyCoin={buyCoin} />;
};
