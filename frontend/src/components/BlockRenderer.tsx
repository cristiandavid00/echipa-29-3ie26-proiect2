import ReactMarkdown from "react-markdown";
import type { ArticleBlock } from "@/services/strapi";
import { mediaUrl } from "@/services/strapi";

export function BlockRenderer({ blocks }: { blocks?: ArticleBlock[] }) {
  if (!blocks?.length) return null;
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((b, i) => {
        if (b.__component === "shared.rich-text" && b.body) {
          return (
            <div
              key={i}
              className="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-primary"
            >
              <ReactMarkdown>{b.body}</ReactMarkdown>
            </div>
          );
        }
        if (b.__component === "shared.quote") {
          return (
            <blockquote
              key={i}
              className="border-l-4 border-primary bg-secondary/50 px-6 py-4 italic text-foreground"
            >
              <p className="text-lg">{b.body}</p>
              {b.title && <footer className="mt-2 text-sm text-muted-foreground">— {b.title}</footer>}
            </blockquote>
          );
        }
        if (b.__component === "shared.media" && b.file) {
          return (
            <img
              key={i}
              src={mediaUrl(b.file, "large")}
              alt={b.file.alternativeText ?? ""}
              className="w-full rounded-xl"
            />
          );
        }
        return null;
      })}
    </div>
  );
}
