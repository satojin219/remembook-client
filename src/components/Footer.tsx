import Link from "next/link";
import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 text-sm text-center text-gray-600">
            <Link href="/about" className="hover:text-gray-900 hover:underline">
              remembookについて
            </Link>
            <Link href="/terms" className="hover:text-gray-900 hover:underline">
              利用規約
            </Link>
            <Link
              href="/privacy"
              className="hover:text-gray-900 hover:underline">
              プライバシーポリシー
            </Link>
            <Link
              href="/transaction"
              className="hover:text-gray-900 hover:underline">
              特定商取引法に基づく表示
            </Link>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSfQAUV5nibf0Blw8Hq_tcp8HFU-lsUQOWYav2lA2e8csgpJMw/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 hover:underline">
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
