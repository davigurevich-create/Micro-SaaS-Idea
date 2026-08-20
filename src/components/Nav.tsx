"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Visão Geral", icon: "🧭" },
  { href: "/itinerario", label: "Itinerário", icon: "📅" },
  { href: "/passeios", label: "Passeios & Restaurantes", icon: "🍽️" },
  { href: "/transporte", label: "Transporte", icon: "✈️" },
  { href: "/orcamento", label: "Orçamento", icon: "💰" },
  { href: "/clima", label: "Clima", icon: "⛅" },
  { href: "/mala", label: "Checklist de Mala", icon: "🎒" },
  { href: "/documentos", label: "Documentos", icon: "📄" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = links.find((l) => l.href === pathname);

  return (
    <nav className="sticky top-0 z-20 border-b border-black/10 dark:border-white/10 bg-background/85 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 min-w-0"
          onClick={() => setOpen(false)}
        >
          <span
            className="h-9 w-9 rounded-lg bg-black/5 dark:bg-white/10 bg-cover bg-center shrink-0"
            style={{ backgroundImage: "url(/logo.png)" }}
            aria-hidden
          />
          <span className="text-sm font-medium text-black/70 dark:text-white/70 truncate">
            {current?.label ?? "Patagônia 2027"}
          </span>
        </Link>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Abrir menu"
          className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-4 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0"
        >
          Menu
          <span
            aria-hidden
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            ⌄
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-black/10 dark:border-white/10 bg-background">
          <div className="mx-auto max-w-5xl px-4 py-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl px-3 py-4 text-center text-sm transition-colors ${
                    active
                      ? "bg-foreground text-background"
                      : "text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  <span className="text-xl" aria-hidden>
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
