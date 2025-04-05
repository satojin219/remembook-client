import { UnAuthorizeHeader } from "@/components/UnAuthorizeHeader";


export default function Custom404() {
  return (
    <>
      <UnAuthorizeHeader />
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-xl mb-6">ページが見つかりません</h2>
        <p className="text-gray-600 mb-8 text-center">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
      </div>
    </>
  );
}
