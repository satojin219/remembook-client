"use client";

import { Button, Field, Input, Label } from "@headlessui/react";
import { useActionState, type FC } from "react";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { changePassword } from "./_api/change-password";
import { changePasswordSchema } from "./_schema";

export const ChangePasswordPresentational: FC = () => {
  const [lastResult, action, isPending] = useActionState(
    changePassword,
    undefined
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: changePasswordSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            パスワード変更
          </h2>
        </div>

        <form action={action} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <Field className="space-y-1">
              <Label className="block text-sm font-medium text-gray-700">
                現在のパスワード
              </Label>
              <Input
                type="password"
                key={fields.oldPassword.key}
                name={fields.oldPassword.name}
                defaultValue={fields.oldPassword.initialValue}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
              {fields.oldPassword.errors && (
                <p className="text-red-500 text-xs" role="alert">
                  {fields.oldPassword.errors}
                </p>
              )}
            </Field>

            <Field className="space-y-1">
              <Label className="block text-sm font-medium text-gray-700">
                新しいパスワード
              </Label>
              <Input
                type="password"
                key={fields.newPassword.key}
                name={fields.newPassword.name}
                defaultValue={fields.newPassword.initialValue}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
              {fields.newPassword.errors && (
                <p className="text-red-500 text-xs" role="alert">
                  {fields.newPassword.errors}
                </p>
              )}
            </Field>

            <Field className="space-y-1">
              <Label className="block text-sm font-medium text-gray-700">
                新しいパスワード（確認）
              </Label>
              <Input
                type="password"
                key={fields.confirmPassword.key}
                name={fields.confirmPassword.name}
                defaultValue={fields.confirmPassword.initialValue}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
              {fields.confirmPassword.errors && (
                <p className="text-red-500 text-xs" role="alert">
                  {fields.confirmPassword.errors}
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
              "パスワードを変更"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
