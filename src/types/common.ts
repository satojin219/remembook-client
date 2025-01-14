import type { SubmissionResult } from "@conform-to/react";

export type APIResponse<T> = {
  ok: boolean;
  submission?: SubmissionResult;
  errorMessage?: string;
  data?: T;
};
