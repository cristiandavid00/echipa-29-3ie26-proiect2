export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground sm:px-6">
        <p>© {new Date().getFullYear()} Strapi Blog. © 2026 Hub Digital - Echipa 29. Dezvoltat cu React & Tailwind CSS..</p>
      </div>
    </footer>
  );
}
