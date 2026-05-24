import { Link } from "react-router-dom";
import type { Category } from "@/services/strapi";

export function CategoryCard({ category }: { category: Category }) {
  const count = category.articles?.length;
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:border-primary hover:shadow-lg"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Category
      </span>
      <h3 className="text-xl font-semibold capitalize text-card-foreground group-hover:text-primary">
        {category.name}
      </h3>
      {category.description && (
        <p className="text-sm text-muted-foreground">{category.description}</p>
      )}
      {typeof count === "number" && (
        <span className="mt-2 text-xs text-muted-foreground">
          {count} {count === 1 ? "article" : "articles"}
        </span>
      )}
    </Link>
  );
}
