"use client";

import { markdownComponents } from "@/lib/markdownComponent";
import Transaction from "./transaction.mdx";
import { MDXProvider } from "@mdx-js/react";

export const TransactionContent = () => {
  return (
    <div className="prose prose-sm max-w-none">
      <MDXProvider components={markdownComponents}>
        <Transaction />
      </MDXProvider>
    </div>
  );
};
