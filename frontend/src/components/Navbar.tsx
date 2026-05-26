import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Sun, Moon, Search } from "lucide-react";

const links: { to: string; label: string; end?: boolean }[] = [
  { to: "/", label: "Home", end: true },
  { to: "/articles", label: "Articles" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  // Logica pentru Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block size-7 rounded-md bg-[image:var(--gradient-hero)]" />
          <span className="text-lg">Hub Digital</span>
        </Link>

        <nav className="hidden gap-1 md:flex">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }: { isActive: boolean }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <nav className="hidden gap-1 md:flex">
      {/* ... (aici e codul tău existent cu links.map) ... */}
      {/* Bara de cautare */}
      <div className="relative hidden md:block ml-4 mr-2">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Caută articole..."
          className="h-9 w-60 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-sidebar pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-200 transition-colors"
        />
      </div>
      
      {/* Butonul pentru Dark Mode adăugat aici: */}
      <button
        onClick={toggleDarkMode}
        className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-sidebar text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
        title="Schimbă Tema"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </nav>
        </nav>

        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }: { isActive: boolean }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? "text-foreground bg-secondary" : "text-muted-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
