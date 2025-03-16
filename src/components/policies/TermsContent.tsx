"use client";

import { markdownComponents } from "@/lib/markdownComponent";
import Terms from "./terms.mdx";
import { MDXProvider } from "@mdx-js/react";

export const TermsContent = () => {
  return (
    <div className="prose prose-sm max-w-none">
      <MDXProvider components={markdownComponents}>
        <Terms />
      </MDXProvider>
    </div>
  );
};
