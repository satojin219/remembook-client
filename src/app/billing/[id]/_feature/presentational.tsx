import type { APIResponse } from "@/types/common";
import { useParams } from "next/navigation";
import { type FC, useEffect, useState } from "react";
import type { CheckPaymentStatusResponse } from "./_api/checkPaymentStatus";

type Props = {
  checkPaymentStatus: (
    id: string
  ) => Promise<APIResponse<CheckPaymentStatusResponse>>;
};

export const CheckPaymentPresentational: FC<Props> = ({
  checkPaymentStatus,
}) => {
  const { id } = useParams();
  const [paymentStatus, setPaymentStatus] = useState("PENDING"); // Default to PENDING until first check

  useEffect(() => {
    const interval = setInterval(() => {
      checkPaymentStatus(id as string)
        .then((response) => {
          const status = response.data?.status as string;
          setPaymentStatus(status);
          console.log(status);
          if (status === "COMPLETED" || status === "FAILED") {
            clearInterval(interval);
          }
        })
        .catch((error) => {
          console.error("Failed to check payment status:", error);
          clearInterval(interval);
        });
    }, 4500);

    return () => clearInterval(interval);
  }, [id, checkPaymentStatus]);

  return (
    <div>
      <div>
        <h1>Payment Status</h1>
        <div>{paymentStatus}</div>
        {paymentStatus === "COMPLETED" && (
          <div>Payment completed successfully!</div>
        )}
        {paymentStatus === "FAILED" && (
          <div className="mt-4 p-3 rounded bg-red-500 text-white text-center">
            Payment failed. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};
