"use client";

import { markdownComponents } from "@/lib/markdownComponent";
import Privacy from "./privacy.mdx";
import { MDXProvider } from "@mdx-js/react";

export const PrivacyContent = () => {
  return (
    <div className="prose prose-sm max-w-none">
      <MDXProvider components={markdownComponents}>
        <Privacy />
      </MDXProvider>
    </div>
  );
};
