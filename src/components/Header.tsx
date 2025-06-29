"use server";

import { getMe } from "@/lib/api/getMe";
import Image from "next/image";
import Link from "next/link";

export const Header = async () => {
  const user = await getMe();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/memo" className="flex items-center">
          <Image
            src="/headerLogo.svg"
            alt="remembook"
            width={200}
            height={60}
            className="object-contain w-[200px] sm:w-[250px]"
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
            <span className="font-medium hidden sm:inline">設定</span>
          </Link>
          <Link
            href="/charge"
            className="flex items-center gap-2 bg-yellow-50 hover:bg-yellow-100 px-4 py-2 rounded-full transition-colors font-medium text-yellow-700">
            <Image src="/coin.svg" alt="coin" width={24} height={24} />
            {user.data?.coins ?? 0}
            <span className=" hidden sm:inline">コイン</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
