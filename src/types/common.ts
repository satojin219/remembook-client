import type { SubmissionResult } from "@conform-to/react";

export type APIResponse<T = undefined> = {
  ok: boolean;
  submission?: SubmissionResult;
  errorMessage?: string;
  data?: T;
};
