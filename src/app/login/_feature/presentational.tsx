"use client";

import { Button, Field, Input, Label } from "@headlessui/react";
import { loginSchema } from "./_schema";
import { useActionState, type FC } from "react";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { login } from "./_api";
import Image from "next/image";
import Link from "next/link";
import { PolicyDialog } from "@/components/PolicyDialog";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/logo.svg"
            alt="Remembook"
            width={180}
            height={48}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            アカウントにログイン
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            または{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500">
              新規登録はこちら
            </Link>
          </p>
        </div>

        <form action={action} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <Field className="space-y-1">
              <Label className="block text-sm font-medium text-gray-700">
                メールアドレス
              </Label>
              <Input
                type="email"
                key={fields.email.key}
                name={fields.email.name}
                defaultValue={fields.email.initialValue}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="example@email.com"
              />
              {fields.email.errors && (
                <p className="text-red-500 text-xs" role="alert">
                  {fields.email.errors}
                </p>
              )}
            </Field>

            <Field className="space-y-1">
              <Label className="block text-sm font-medium text-gray-700">
                パスワード
              </Label>
              <Input
                type="password"
                key={fields.password.key}
                name={fields.password.name}
                defaultValue={fields.password.initialValue}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
              {fields.password.errors && (
                <p className="text-red-500 text-xs" role="alert">
                  {fields.password.errors}
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
              <div className="flex items-center">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                ログイン中...
              </div>
            ) : (
              "ログイン"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
