"use client";

import { FormEvent, useState } from "react";
import { Card } from "@/components/Card";
import { activities as seedActivities } from "@/data/activities";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { Activity, ActivityCategory, Priority } from "@/lib/types";

const categoryLabels: Record<ActivityCategory, string> = {
  passeio: "Passeio",
  restaurante: "Restaurante",
  trilha: "Trilha",
  outro: "Outro",
};
const categories: ActivityCategory[] = ["passeio", "restaurante", "trilha", "outro"];
const priorities: Priority[] = ["essencial", "opcional"];

const emptyForm = {
  name: "",
  location: "",
  category: "passeio" as ActivityCategory,
  priority: "opcional" as Priority,
  estimatedCost: "",
  notes: "",
  link: "",
};

export default function PasseiosPage() {
  const [activities, setActivities] = useLocalStorageState<Activity[]>(
    STORAGE_KEYS.activities,
    seedActivities
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  function startEdit(a: Activity) {
    setEditingId(a.id);
    setForm({
      name: a.name,
      location: a.location,
      category: a.category,
      priority: a.priority,
      estimatedCost: a.estimatedCost ?? "",
      notes: a.notes ?? "",
      link: a.link ?? "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim()) return;
    const payload = {
      name: form.name.trim(),
      location: form.location.trim(),
      category: form.category,
      priority: form.priority,
      estimatedCost: form.estimatedCost.trim() || undefined,
      notes: form.notes.trim() || undefined,
      link: form.link.trim() || undefined,
    };
    if (editingId) {
      setActivities((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...payload } : a))
      );
    } else {
      setActivities((prev) => [...prev, { id: crypto.randomUUID(), ...payload }]);
    }
    cancelEdit();
  }

  function remove(id: string) {
    setActivities((prev) => prev.filter((a) => a.id !== id));
    if (editingId === id) cancelEdit();
  }

  const byLocation = activities.reduce<Record<string, Activity[]>>((acc, a) => {
    (acc[a.location] ??= []).push(a);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Passeios & Restaurantes</h1>

      {activities.length === 0 ? (
        <Card>
          <p className="text-black/60 dark:text-white/60">
            Nenhum passeio ou restaurante cadastrado ainda. Adicionem abaixo
            conforme forem pesquisando.
          </p>
        </Card>
      ) : (
        Object.entries(byLocation).map(([location, items]) => (
          <div key={location}>
            <h2 className="font-semibold mb-3">{location}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {items.map((a) => (
                <Card key={a.id}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium">{a.name}</p>
                    <div className="flex gap-2 text-xs shrink-0">
                      <button onClick={() => startEdit(a)} className="underline">
                        Editar
                      </button>
                      <button
                        onClick={() => remove(a.id)}
                        className="text-red-600 dark:text-red-400 underline"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                  <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/50 mb-2">
                    {categoryLabels[a.category]} ·{" "}
                    {a.priority === "essencial" ? "Essencial" : "Opcional"}
                  </p>
                  {a.estimatedCost && (
                    <p className="text-sm mb-1">💰 {a.estimatedCost}</p>
                  )}
                  {a.notes && <p className="text-sm">{a.notes}</p>}
                  {a.link && (
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline mt-2 inline-block"
                    >
                      Mais informações
                    </a>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))
      )}

      <section>
        <h2 className="font-semibold mb-3">
          {editingId ? "Editar item" : "Adicionar passeio/restaurante"}
        </h2>
        <Card>
          <form onSubmit={submit} className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Nome"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="col-span-2 rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
              required
            />
            <input
              type="text"
              placeholder="Cidade/local"
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
              required
            />
            <select
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  category: e.target.value as ActivityCategory,
                }))
              }
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {categoryLabels[c]}
                </option>
              ))}
            </select>
            <select
              value={form.priority}
              onChange={(e) =>
                setForm((f) => ({ ...f, priority: e.target.value as Priority }))
              }
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p === "essencial" ? "Essencial" : "Opcional"}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Custo estimado"
              value={form.estimatedCost}
              onChange={(e) =>
                setForm((f) => ({ ...f, estimatedCost: e.target.value }))
              }
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            />
            <input
              type="url"
              placeholder="Link (opcional)"
              value={form.link}
              onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
              className="col-span-2 rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Notas"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              className="col-span-2 rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            />
            <div className="col-span-2 flex gap-2">
              <button
                type="submit"
                className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                {editingId ? "Salvar alterações" : "Adicionar"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-full border border-black/10 dark:border-white/10 px-4 py-2 text-sm"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </Card>
      </section>
    </div>
  );
}
