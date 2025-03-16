export const markdownComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-2xl font-bold mb-8">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-bold mb-4">{children}</h2>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-2 mb-8">{children}</ol>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-2 mb-8">{children}</ul>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="mb-4">{children}</li>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-8">{children}</p>
  ),
};
