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
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">メモを作成</h2>
      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <textarea
            key={fields.memo.key}
            name={fields.memo.name}
            value={fields.memo.value ?? ""}
            placeholder="本に関するメモを入力してください..."
            className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
            disabled={isPending}
          />
          {fields.memo.errors && (
            <p className="text-red-500 text-sm" role="alert">
              {fields.memo.errors}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {isPending ? "メモを作成中..." : "メモを作成"}
        </button>
      </form>
    </div>
  );
};
