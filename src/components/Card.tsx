import { ReactNode } from "react";

export function Card({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-black/10 dark:border-white/10 p-5 ${className}`}
    >
      {title && <h3 className="font-semibold mb-3">{title}</h3>}
      {children}
    </div>
  );
}
