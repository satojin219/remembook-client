"use client";

import { Button, Field, Input, Label } from "@headlessui/react";

import { loginSchema } from "./_schema";
import { useActionState, type FC } from "react";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { login } from "./_api";

export const LoginPresentational: FC = () => {
  const [lastResult, action, isPending] = useActionState(login, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form action={action}>
      <Field>
        <Label>メールアドレス</Label>
        <Input
          type="email"
          key={fields.email.key}
          name={fields.email.name}
          defaultValue={fields.email.initialValue}
        />
        <p className="text-red-500">{fields.email.errors}</p>
      </Field>
      <Field>
        <Label>パスワード</Label>
        <Input
          type="password"
          key={fields.password.key}
          name={fields.password.name}
          defaultValue={fields.password.initialValue}
        />
        <p className="text-red-500">{fields.password.errors}</p>
      </Field>

      <Button type="submit" disabled={isPending}>
        {isPending ? "ログイン中..." : "ログイン"}
      </Button>
    </form>
  );
};
