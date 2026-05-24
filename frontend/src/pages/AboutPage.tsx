import { useAbout } from "@/hooks/useStrapi";
import { BlockRenderer } from "@/components/BlockRenderer";

export default function AboutPage() {
  const { data, isLoading, error } = useAbout();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      {isLoading && <p className="text-muted-foreground">Loading…</p>}
      {error && <p className="text-destructive">Failed to load.</p>}
      {data && (
        <>
          <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-5xl">{data.title}</h1>
          <BlockRenderer blocks={data.blocks} />
        </>
      )}
    </div>
  );
}
