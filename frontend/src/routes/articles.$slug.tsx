import { createFileRoute, Link } from "@tanstack/react-router";
import { useArticle } from "@/hooks/useStrapi";
import { mediaUrl } from "@/services/strapi";
import { BlockRenderer } from "@/components/BlockRenderer";

export const Route = createFileRoute("/articles/$slug")({
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { data: article, isLoading, error } = useArticle(slug);

  if (isLoading) return <div className="mx-auto max-w-3xl px-4 py-16 text-muted-foreground">Loading…</div>;
  if (error || !article)
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-destructive">Article not found.</p>
        <Link to="/articles" className="mt-4 inline-block text-primary hover:underline">
          ← Back to articles
        </Link>
      </div>
    );

  const cover = mediaUrl(article.cover, "large");

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link to="/articles" className="text-sm text-muted-foreground hover:text-primary">
        ← All articles
      </Link>

      <header className="mt-6 flex flex-col gap-4">
        {article.category && (
          <Link
            to="/categories/$slug"
            params={{ slug: article.category.slug }}
            className="self-start text-xs font-medium uppercase tracking-wider text-primary hover:underline"
          >
            {article.category.name}
          </Link>
        )}
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          {article.title}
        </h1>
        <p className="text-lg text-muted-foreground">{article.description}</p>
        {article.author && (
          <p className="text-sm text-muted-foreground">
            By <span className="font-medium text-foreground">{article.author.name}</span>
          </p>
        )}
      </header>

      {cover && (
        <img
          src={cover}
          alt={article.cover?.alternativeText ?? article.title}
          className="my-10 w-full rounded-xl shadow-[var(--shadow-card)]"
        />
      )}

      <BlockRenderer blocks={article.blocks} />
    </article>
  );
}
