"use client";

import type { APIResponse } from "@/types/common";
import type { Question } from "@/types/question";
import type { AnswerResponse } from "./_api/answerQuestion";
import { Button, Field, Label, Textarea } from "@headlessui/react";
import { useActionState, type FC } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { answerSchema } from "./_schema";
import { enablePushNotification } from "@/serviceWorker/enablePushNotification";
import { useParams } from "next/navigation";
import { registerServiceWorker } from "@/serviceWorker/registerServiceWorker";

type Props = {
  question: Question;
  answerQuestion: (
    prevState: unknown,
    formData: FormData
  ) => Promise<APIResponse<AnswerResponse>>;
  scheduleNotification: (
    userId: string,
    bookId: string,
    memoId: string,
    body: string,
    score: number
  ) => Promise<APIResponse<void>>;
  userId: string;
};

registerServiceWorker();

export const QuestionPresentational: FC<Props> = ({
  question,
  answerQuestion,
  scheduleNotification,
  userId,
}) => {
  const { book_id } = useParams();
  const [lastResult, action, isPending] = useActionState(answerQuestion, {
    ok: false,
  });
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: answerSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      {!lastResult.ok && !isPending && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <form action={action} className="space-y-6">
            <Field className="space-y-3">
              <Label className="block text-lg font-medium text-gray-900">
                {question.body}
              </Label>
              <Textarea
                name={fields.userAnswer.name}
                value={fields.userAnswer.value}
                key={fields.userAnswer.key}
                className="w-full min-h-[200px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
                placeholder="あなたの回答を入力してください..."
              />
            </Field>
            {fields.userAnswer.errors && (
              <p className="text-red-500 text-sm" role="alert">
                {fields.userAnswer.errors}
              </p>
            )}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              回答する
            </Button>
          </form>
        </div>
      )}

      {isPending && (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">回答を評価中...</p>
        </div>
      )}

      {lastResult.ok && lastResult.data && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
              <span className="text-2xl font-bold text-blue-600">
                {lastResult.data.score}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              回答結果
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">メモ</h3>
              <p className="text-gray-900">{lastResult.data.memo}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                あなたの回答
              </h3>
              <p className="text-gray-900">{lastResult.data.userAnswer}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              復習リマインダー
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                onClick={enablePushNotification}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                通知を有効にする
              </Button>
              <Button
                type="button"
                onClick={() => {
                  scheduleNotification(
                    userId,
                    book_id as string,
                    question.memoId,
                    question.body,
                    lastResult.data?.score || 0
                  );
                }}
                className="flex-1 bg-blue-50 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors">
                復習リマインダーを設定
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
