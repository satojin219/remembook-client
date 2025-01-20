"use client";

import { Button, Field, Input, Label } from "@headlessui/react";

import { useActionState, type FC } from "react";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { signup } from "./_api";
import { signupSchema } from "./_schema";

export const SignupPresentational: FC = () => {
  const [lastResult, action, isPending] = useActionState(signup, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signupSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form action={action}>
      <Field>
        <Label>ユーザー名</Label>
        <Input
          type="text"
          key={fields.name.key}
          name={fields.name.name}
          defaultValue={fields.name.initialValue}
        />
        <p className="text-red-500">{fields.name.errors}</p>
      </Field>
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
        {isPending ? "登録中..." : "新規登録"}
      </Button>
    </form>
  );
};
