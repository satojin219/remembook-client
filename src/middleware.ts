import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * 以下で始まるリクエストパスを除くすべてのリクエストパスに一致：
     * - api（APIルート）
     * - _next/static（静的ファイル）
     * - _next/image（画像最適化ファイル）
     * - favicon.ico（ファビコンファイル）
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
