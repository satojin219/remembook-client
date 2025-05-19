"use server";

import { getMe } from "@/lib/api/getMe";
import Image from "next/image";
import Link from "next/link";

export const Header = async () => {
  const user = await getMe();

  return (
    <header className=" bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/memo" className="flex items-center">
          <Image
            src="/headerLogo.svg"
            alt="remembook"
            width={250}
            height={60}
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/settings"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Image
              role="img"
              src="/setting.svg"
              alt="設定"
              className="w-6 h-6"
              width={24}
              height={24}
            />
            <span className="font-medium">設定</span>
          </Link>
          <Link
            href="/charge"
            className="flex items-center gap-2 bg-yellow-50 hover:bg-yellow-100 px-4 py-2 rounded-full transition-colors">
            <Image src="/coin.svg" alt="coin" width={24} height={24} />
            <span className="font-medium text-yellow-700">
              {user.data?.coins ?? 0} コイン
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
