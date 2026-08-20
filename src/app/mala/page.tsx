"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { packingList as initialPackingList } from "@/data/packing";
import { PackingItem } from "@/lib/types";

const STORAGE_KEY = "patagonia-2027-mala";

export default function MalaPage() {
  const [items, setItems] = useState<PackingItem[]>(initialPackingList);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const savedPacked: Record<string, boolean> = JSON.parse(saved);
        // Sincroniza com o localStorage (fonte externa) só no cliente, na montagem.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems((prev) =>
          prev.map((i) =>
            i.id in savedPacked ? { ...i, packed: savedPacked[i.id] } : i
          )
        );
      }
    } catch {
      // ignora falha de leitura do localStorage
    }
  }, []);

  function toggle(id: string) {
    setItems((prev) => {
      const next = prev.map((i) =>
        i.id === id ? { ...i, packed: !i.packed } : i
      );
      try {
        const packedMap = Object.fromEntries(
          next.map((i) => [i.id, i.packed])
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(packedMap));
      } catch {
        // ignora falha ao salvar
      }
      return next;
    });
  }

  const byCategory = items.reduce<Record<string, PackingItem[]>>((acc, i) => {
    (acc[i.category] ??= []).push(i);
    return acc;
  }, {});

  const packedCount = items.filter((i) => i.packed).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Checklist de Mala</h1>
        <p className="text-sm text-black/60 dark:text-white/60">
          {packedCount}/{items.length} itens prontos. Marcações ficam salvas
          neste navegador.
        </p>
      </div>

      {Object.entries(byCategory).map(([category, catItems]) => (
        <Card key={category} title={category}>
          <ul className="flex flex-col gap-2">
            {catItems.map((item) => (
              <li key={item.id}>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.packed}
                    onChange={() => toggle(item.id)}
                    className="h-4 w-4"
                  />
                  <span className={item.packed ? "line-through opacity-50" : ""}>
                    {item.item}
                  </span>
                  <span className="text-xs text-black/50 dark:text-white/50 ml-auto">
                    {item.owner}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
