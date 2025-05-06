"use client";

import { Button, Field, Input, Label } from "@headlessui/react";
import { useActionState, type FC } from "react";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { changeEmail } from "./_api/change-email";
import { changeEmailSchema } from "./_schema";

export const ChangeEmailPresentational: FC = () => {
  const [lastResult, action, isPending] = useActionState(
    changeEmail,
    undefined
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: changeEmailSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            メールアドレス変更
          </h2>
        </div>

        <form action={action} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <Field className="space-y-1">
              <Label className="block text-sm font-medium text-gray-700">
                現在のメールアドレス
              </Label>
              <Input
                type="email"
                key={fields.oldEmail.key}
                name={fields.oldEmail.name}
                defaultValue={fields.oldEmail.initialValue}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="example@email.com"
              />
              {fields.oldEmail.errors && (
                <p className="text-red-500 text-xs" role="alert">
                  {fields.oldEmail.errors}
                </p>
              )}
            </Field>

            <Field className="space-y-1">
              <Label className="block text-sm font-medium text-gray-700">
                新しいメールアドレス
              </Label>
              <Input
                type="email"
                key={fields.newEmail.key}
                name={fields.newEmail.name}
                defaultValue={fields.newEmail.initialValue}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="example@email.com"
              />
              {fields.newEmail.errors && (
                <p className="text-red-500 text-xs" role="alert">
                  {fields.newEmail.errors}
                </p>
              )}
            </Field>
          </div>
          {lastResult?.error && (
            <p className="text-red-500 text-xs" role="alert">
              {lastResult?.error?.[""]?.[0]}
            </p>
          )}
          <Button
            type="submit"
            disabled={isPending}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
            {isPending ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                変更中...
              </div>
            ) : (
              "メールアドレスを変更"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
