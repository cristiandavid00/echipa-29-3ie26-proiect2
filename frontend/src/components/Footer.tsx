import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white dark:bg-background mt-16 transition-colors">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Logo Footer */}
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-block size-6 rounded-md bg-[image:var(--gradient-hero)]" />
            <span className="text-lg dark:text-gray-200">Echipa 29</span>
          </div>
          
          {/* Copyright Text */}
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
            &copy; {currentYear} Proiect Web Development. Toate drepturile rezervate.
          </p>
          
          {/* Meniu Secundar Footer */}
          <div className="flex gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            <Link to="/about" className="hover:text-primary transition-colors">Despre Noi</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
