"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Visão Geral" },
  { href: "/itinerario", label: "Itinerário" },
  { href: "/passeios", label: "Passeios & Restaurantes" },
  { href: "/transporte", label: "Transporte" },
  { href: "/orcamento", label: "Orçamento" },
  { href: "/clima", label: "Clima" },
  { href: "/mala", label: "Checklist de Mala" },
  { href: "/documentos", label: "Documentos" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-black/10 dark:border-white/10 bg-background/95 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-1 overflow-x-auto">
        <span className="font-semibold text-sm mr-3 whitespace-nowrap">
          🏔️ Patagônia 2027
        </span>
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors ${
                active
                  ? "bg-foreground text-background"
                  : "hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
