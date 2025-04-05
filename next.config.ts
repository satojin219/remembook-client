import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ["books.google.com"],
  },
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);
