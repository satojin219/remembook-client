"use server";

import { checkPaymentStatus } from "./_api/checkPaymentStatus";
import { CheckPaymentPresentational } from "./presentational";

export const CheckPaymentContainer = () => {
  return <CheckPaymentPresentational checkPaymentStatus={checkPaymentStatus}/>;
}