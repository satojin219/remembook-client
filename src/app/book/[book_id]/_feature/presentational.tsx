"use client";

import { type FC, useActionState } from "react";
import { type SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createSummarySchema } from "./_schema";
import type { Book } from "@/types/book";

type Props = {
  book: Book | undefined;
  createSummary: (
    book: Book,
    _prevState: unknown,
    formData: FormData
  ) => Promise<SubmissionResult<string[]>>;
};

export const BookDetailPresentational: FC<Props> = ({
  book,
  createSummary,
}) => {
  if (!book) {
    return null;
  }
  const createSummaryWithBookId = createSummary.bind(null, book);
  const [lastResult, action, isPending] = useActionState(
    createSummaryWithBookId,
    null
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createSummarySchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form action={action}>
      <textarea
        key={fields.summary.key}
        name={fields.summary.name}
        value={fields.summary.value}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "要約を作成中..." : "要約を作成"}
      </button>
    </form>
  );
};
