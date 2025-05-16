import { TransactionContent } from "@/components/policies/TransactionContent";

export const runtime = "edge";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">特定商取引法に基づく表示</h1>
      <TransactionContent />
    </div>
  );
}
