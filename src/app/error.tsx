"use client";

import Link from "next/link";
import { UnAuthorizeHeader } from "@/components/UnAuthorizeHeader";

export default function Custom500({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      {/* <UnAuthorizeHeader /> */}
      <h1 className="text-4xl font-bold mb-4">500</h1>
      <h2 className="text-xl mb-6">サーバーエラーが発生しました</h2>
      <p className="text-gray-600 mb-8 text-center">
        申し訳ありません。一時的な問題が発生しています。
        <br />
        しばらく時間をおいて再度お試しください。
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          もう一度試す
        </button>
        <Link
          href="/"
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}
