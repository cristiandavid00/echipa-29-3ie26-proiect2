import { Link } from "@tanstack/react-router";
import type { Article } from "@/services/strapi";
import { mediaUrl } from "@/services/strapi";

export function ArticleCard({ article }: { article: Article }) {
  const img = mediaUrl(article.cover, "medium");
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: article.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1"
    >
      {img && (
        <div className="aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={img}
            alt={article.cover?.alternativeText ?? article.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        {article.category && (
          <span className="text-xs font-medium uppercase tracking-wider text-primary">
            {article.category.name}
          </span>
        )}
        <h3 className="text-lg font-semibold leading-snug text-card-foreground group-hover:text-primary">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{article.description}</p>
        {article.author && (
          <p className="mt-auto pt-2 text-xs text-muted-foreground">By {article.author.name}</p>
        )}
      </div>
    </Link>
  );
}
