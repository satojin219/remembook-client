import { PrivacyContent } from "@/components/policies/PrivacyContent";

export const runtime = "edge";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>
      <PrivacyContent />
    </div>
  );
}
