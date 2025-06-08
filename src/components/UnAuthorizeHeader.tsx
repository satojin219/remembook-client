"use server";

import Image from "next/image";
import Link from "next/link";

export const UnAuthorizeHeader = async () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/headerLogo.svg"
            alt="remembook"
            width={250}
            height={60}
            className="object-contain"
          />
        </Link>
      </div>
    </header>
  );
};
