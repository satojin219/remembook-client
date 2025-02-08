"use client";

import { type FC, useActionState } from "react";
import { type SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createMemoSchema } from "./_schema";
import type { Book } from "@/types/book";

type Props = {
  book: Book | undefined;
  createMemo: (
    book: Book,
    _prevState: unknown,
    formData: FormData
  ) => Promise<SubmissionResult<string[]>>;
};

export const BookDetailPresentational: FC<Props> = ({ book, createMemo }) => {
  if (!book) {
    return null;
  }
  const createMemoWithBookId = createMemo.bind(null, book);
  const [lastResult, action, isPending] = useActionState(
    createMemoWithBookId,
    null
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createMemoSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form action={action}>
      <textarea
        key={fields.memo.key}
        name={fields.memo.name}
        value={fields.memo.value}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "メモを作成中..." : "メモを作成"}
      </button>
    </form>
  );
};
