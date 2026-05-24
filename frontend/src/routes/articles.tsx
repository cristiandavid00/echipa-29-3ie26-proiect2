import { createFileRoute } from "@tanstack/react-router";
import { ArticleCard } from "@/components/ArticleCard";
import { useArticles } from "@/hooks/useStrapi";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles — Strapi Blog" },
      { name: "description", content: "Browse every article published on the blog." },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const { data, isLoading, error } = useArticles();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Articles</h1>
        <p className="mt-2 text-muted-foreground">Every story we've published.</p>
      </header>

      {isLoading && <p className="text-muted-foreground">Loading…</p>}
      {error && <p className="text-destructive">Failed to load articles.</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map(a => <ArticleCard key={a.id} article={a} />)}
      </div>
    </div>
  );
}
