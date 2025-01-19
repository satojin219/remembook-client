"use client";

import type { APIResponse } from "@/types/common";
import type { Question } from "@/types/question";
import type { AnswerResponse } from "./_api/answerQuestion";
import { Button, Field, Label, Textarea } from "@headlessui/react";
import { useActionState, useEffect, type FC } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { answerSchema } from "./_schema";
import { enablePushNotification } from "@/serviceWorker/enablePushNotification";
import { useParams } from "next/navigation";

type Props = {
  question: Question;
  answerQuestion: (
    prevState: unknown,
    formData: FormData
  ) => Promise<APIResponse<AnswerResponse>>;
  sendMessage: (
    userId: string,
    bookId: string,
    summaryId: string,
    body: string,
    score: number
  ) => Promise<APIResponse<void>>;
  userId: string;
};

export const QuestionPresentational: FC<Props> = ({
  question,
  answerQuestion,
  sendMessage,
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

  useEffect(() => {
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      console.log("messageきたよ", event.data);
      if (!event.data.action) {
        return;
      }

      switch (event.data.action) {
        case "redirect-from-notificationclick":
          if (event.data.url) {
            window.open(event.data.url, "_blank");
          }
          break;
      }
    };

    navigator.serviceWorker.addEventListener(
      "message",
      handleServiceWorkerMessage
    );

    return () => {
      navigator.serviceWorker.removeEventListener(
        "message",
        handleServiceWorkerMessage
      );
    };
  }, []);

  return (
    <>
      {!lastResult.ok && !isPending && (
        <form action={action}>
          <Field>
            <Label>{question.body}</Label>
            <Textarea
              name={fields.userAnswer.name}
              value={fields.userAnswer.value}
              key={fields.userAnswer.key}
            />
          </Field>
          {fields.userAnswer.errors && (
            <p className="text-red-500">{fields.userAnswer.errors}</p>
          )}
          <Button type="submit" disabled={isPending}>
            回答する
          </Button>
        </form>
      )}
      {isPending && <p>回答中...</p>}
      {lastResult.ok && lastResult.data && (
        <>
          <h2>{lastResult.data.score}点</h2>
          <p>要約： {lastResult.data.summary}</p>
          <p>あなたの回答： {lastResult.data.userAnswer}</p>
          <button type="button" onClick={enablePushNotification}>
            push通知を有効にす
          </button>
          <button
            type="button"
            onClick={() => {
              sendMessage(
                userId,
                book_id as string,
                question.summaryId,
                question.body,
                lastResult.data?.score || 0
              );
            }}>
            push通知
          </button>
        </>
      )}
    </>
  );
};
