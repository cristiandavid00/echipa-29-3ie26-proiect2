import { createFileRoute } from "@tanstack/react-router";
import { CategoryCard } from "@/components/CategoryCard";
import { useCategories } from "@/hooks/useStrapi";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Strapi Blog" },
      { name: "description", content: "Browse all article categories." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { data, isLoading, error } = useCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Categories</h1>
        <p className="mt-2 text-muted-foreground">Find articles by topic.</p>
      </header>

      {isLoading && <p className="text-muted-foreground">Loading…</p>}
      {error && <p className="text-destructive">Failed to load categories.</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map(c => <CategoryCard key={c.id} category={c} />)}
      </div>
    </div>
  );
}
