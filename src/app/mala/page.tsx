"use client";

import { FormEvent, useState } from "react";
import { Card } from "@/components/Card";
import { packingList as seedPackingList } from "@/data/packing";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { Owner, PackingItem } from "@/lib/types";

const owners: Owner[] = ["Rubens", "Vitória", "Ambos"];

export default function MalaPage() {
  const [items, setItems] = useLocalStorageState<PackingItem[]>(
    STORAGE_KEYS.packing,
    seedPackingList
  );
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [owner, setOwner] = useState<Owner>("Ambos");

  function toggle(id: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i))
    );
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function addItem(e: FormEvent) {
    e.preventDefault();
    if (!item.trim() || !category.trim()) return;
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        category: category.trim(),
        item: item.trim(),
        owner,
        packed: false,
      },
    ]);
    setItem("");
  }

  const byCategory = items.reduce<Record<string, PackingItem[]>>((acc, i) => {
    (acc[i.category] ??= []).push(i);
    return acc;
  }, {});

  const packedCount = items.filter((i) => i.packed).length;
  const existingCategories = Array.from(new Set(items.map((i) => i.category)));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Checklist de Mala</h1>
        <p className="text-sm text-black/60 dark:text-white/60">
          {packedCount}/{items.length} itens prontos. Tudo fica salvo neste
          navegador.
        </p>
      </div>

      {Object.entries(byCategory).map(([cat, catItems]) => (
        <Card key={cat} title={cat}>
          <ul className="flex flex-col gap-2">
            {catItems.map((i) => (
              <li key={i.id} className="flex items-center gap-2 text-sm">
                <label className="flex items-center gap-2 flex-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={i.packed}
                    onChange={() => toggle(i.id)}
                    className="h-4 w-4"
                  />
                  <span className={i.packed ? "line-through opacity-50" : ""}>
                    {i.item}
                  </span>
                </label>
                <span className="text-xs text-black/50 dark:text-white/50">
                  {i.owner}
                </span>
                <button
                  onClick={() => remove(i.id)}
                  aria-label="Remover item"
                  className="text-black/40 hover:text-red-600 dark:text-white/40 dark:hover:text-red-400"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </Card>
      ))}

      <section>
        <h2 className="font-semibold mb-3">Adicionar item</h2>
        <Card>
          <form onSubmit={addItem} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <input
              type="text"
              list="mala-categorias"
              placeholder="Categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
              required
            />
            <datalist id="mala-categorias">
              {existingCategories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <input
              type="text"
              placeholder="Item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="col-span-2 rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
              required
            />
            <select
              value={owner}
              onChange={(e) => setOwner(e.target.value as Owner)}
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            >
              {owners.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="col-span-2 sm:col-span-4 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              Adicionar
            </button>
          </form>
        </Card>
      </section>
    </div>
  );
}
