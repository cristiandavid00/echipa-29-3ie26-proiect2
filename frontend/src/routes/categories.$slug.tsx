import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleCard } from "@/components/ArticleCard";
import { useCategory } from "@/hooks/useStrapi";

export const Route = createFileRoute("/categories/$slug")({
  component: CategoryDetailPage,
});

function CategoryDetailPage() {
  const { slug } = Route.useParams();
  const { data, isLoading, error } = useCategory(slug);

  if (isLoading) return <div className="mx-auto max-w-6xl px-4 py-16 text-muted-foreground">Loading…</div>;
  if (error || !data)
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-destructive">Category not found.</p>
        <Link to="/categories" className="mt-4 inline-block text-primary hover:underline">
          ← Back to categories
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Link to="/categories" className="text-sm text-muted-foreground hover:text-primary">
        ← All categories
      </Link>
      <header className="mb-10 mt-6">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Category</p>
        <h1 className="mt-2 text-3xl font-bold capitalize tracking-tight sm:text-5xl">{data.name}</h1>
        {data.description && <p className="mt-3 text-muted-foreground">{data.description}</p>}
      </header>

      {data.articles?.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.articles.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>
      ) : (
        <p className="text-muted-foreground">No articles in this category yet.</p>
      )}
    </div>
  );
}
