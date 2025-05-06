import { UnAuthorizeHeader } from "@/components/UnAuthorizeHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <UnAuthorizeHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
