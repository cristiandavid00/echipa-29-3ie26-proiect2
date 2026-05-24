import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryCard } from "@/components/CategoryCard";
import { useCategories, useLatestArticles } from "@/hooks/useStrapi";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Strapi Blog — Stories, ideas, and dispatches" },
      { name: "description", content: "Latest articles and categories from our Strapi-powered blog." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const articles = useLatestArticles(6);
  const categories = useCategories();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-[image:var(--gradient-hero)]">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center text-primary-foreground sm:px-6 sm:py-28">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Stories, ideas, and dispatches from across the web.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-primary-foreground/80 sm:text-lg">
            A modern reading experience powered by Strapi headless CMS.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/articles"
              className="rounded-md bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background/90"
            >
              Browse articles
            </Link>
            <Link
              to="/categories"
              className="rounded-md border border-primary-foreground/40 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              Explore categories
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Latest articles</h2>
          <Link to="/articles" className="text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>
        {articles.isLoading && <p className="text-muted-foreground">Loading…</p>}
        {articles.error && <p className="text-destructive">Failed to load articles.</p>}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.data?.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Categories</h2>
          <Link to="/categories" className="text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.data?.slice(0, 6).map(c => <CategoryCard key={c.id} category={c} />)}
        </div>
      </section>
    </div>
  );
}
