/**
 * Inject one or more JSON-LD blocks. Pass a single object or an array.
 * Render inside a Server Component (page/layout) — no client JS needed.
 */
export function JsonLd({ data }: { data: unknown | unknown[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // schema objects are built on the server from trusted data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
