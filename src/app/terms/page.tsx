import { TermsContent } from "@/components/policies/TermsContent";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">利用規約</h1>
      <TermsContent />
    </div>
  );
}
