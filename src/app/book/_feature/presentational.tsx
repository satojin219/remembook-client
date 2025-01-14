"use client";
import { useActionState } from "react";
import type { FC } from "react";
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
    constraint: getZodConstraint(searchBookSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: searchBookSchema });
    },
  });

  return (
    <>
      <form action={action}>
        <Field>
          <Label>検索したい本のタイトルを入力して下さい</Label>
          <Input
            type="text"
            key={fields.searchWord.key}
            name={fields.searchWord.name}
            value={fields.searchWord.value}
            placeholder="検索ワードを入力"
          />
        </Field>
        {fields.searchWord.errors && (
          <p className="text-red-500">{fields.searchWord.errors}</p>
        )}
        <Button type="submit" disabled={isPending}>
          検索
        </Button>
      </form>

      {isPending && <p>検索中...</p>}
      {response.ok && response.data && <BookLinkList books={response.data} />}
    </>
  );
};
