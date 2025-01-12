import type { SubmissionResult } from "@conform-to/react";

export type ServerActionResponse<T> = {
  ok: boolean;
  submission?: SubmissionResult;
  errorMessage?: string;
  data?: T;
};
