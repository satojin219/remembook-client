"use client";
import type { FC } from "react";
import { useActionState } from "react";
import { searchBook } from "./_api";
import { BookLinkList } from "./_components/BookLinkList";
import { useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { searchBookSchema } from "./_schema";
import { Button, Field, Input, Label } from "@headlessui/react";

export const BookPresentational: FC = () => {
  const [response, action, isPending] = useActionState(searchBook, {
    ok: false,
  });
  const [form, fields] = useForm({
    shouldValidate: "onBlur",
    // defaultValue: { searchWord: ""},
    constraint: getZodConstraint(searchBookSchema),
    onValidate({ formData }) {
      console.log(parseWithZod(formData, { schema: searchBookSchema }));
      return parseWithZod(formData, { schema: searchBookSchema });
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">本を探す</h1>

      <form
        action={action}
        className="max-w-2xl mx-auto space-y-6 mb-12"
        aria-label="本の検索フォーム">
        <Field className="space-y-2">
          <Label
            htmlFor={fields.searchWord.id}
            className="block text-sm font-medium text-gray-700">
            検索したい本のタイトルを入力してください
          </Label>
          <div className="relative">
            <Input
              type="text"
              key={fields.searchWord.key}
              id={fields.searchWord.id}
              name={fields.searchWord.name}
              placeholder="検索ワードを入力"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              aria-describedby={
                fields.searchWord.errors ? "search-error" : undefined
              }
              disabled={isPending}
            />
            {isPending && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
              </div>
            )}
          </div>
          {fields.searchWord.errors && (
            <p id="search-error" className="text-red-500 text-sm" role="alert">
              {fields.searchWord.errors}
            </p>
          )}
        </Field>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-busy={isPending}>
          {isPending ? "検索中..." : "検索する"}
        </Button>
      </form>

      <div>
        {response.ok === false && response.errorMessage && (
          <div
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            role="alert">
            <p className="text-red-700">{response.errorMessage}</p>
          </div>
        )}

        {isPending && (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">検索中...</p>
          </div>
        )}

        {response.ok && response.data && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              検索結果
            </h2>
            <BookLinkList books={response.data} />
          </div>
        )}
      </div>
    </div>
  );
};
