"use client";

import { FormEvent, useState } from "react";
import { Card } from "@/components/Card";
import { itinerary as seedItinerary } from "@/data/itinerary";
import { activities as seedActivities } from "@/data/activities";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { Activity, ItineraryDay } from "@/lib/types";

const emptyForm = {
  location: "",
  date: "",
  accommodation: "",
  summary: "",
  activityIds: [] as string[],
};

export default function ItinerarioPage() {
  const [days, setDays] = useLocalStorageState<ItineraryDay[]>(
    STORAGE_KEYS.itinerary,
    seedItinerary
  );
  const [activityList] = useLocalStorageState<Activity[]>(
    STORAGE_KEYS.activities,
    seedActivities
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  function startEdit(day: ItineraryDay) {
    setEditingId(day.id);
    setForm({
      location: day.location,
      date: day.date ?? "",
      accommodation: day.accommodation ?? "",
      summary: day.summary ?? "",
      activityIds: day.activityIds,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.location.trim()) return;
    const payload = {
      location: form.location.trim(),
      date: form.date || null,
      accommodation: form.accommodation.trim() || undefined,
      summary: form.summary.trim() || undefined,
      activityIds: form.activityIds,
    };
    if (editingId) {
      setDays((prev) =>
        prev.map((d) => (d.id === editingId ? { ...d, ...payload } : d))
      );
    } else {
      setDays((prev) => [...prev, { id: crypto.randomUUID(), ...payload }]);
    }
    cancelEdit();
  }

  function remove(id: string) {
    setDays((prev) => prev.filter((d) => d.id !== id));
    if (editingId === id) cancelEdit();
  }

  function move(index: number, dir: -1 | 1) {
    setDays((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function toggleActivity(id: string) {
    setForm((prev) => ({
      ...prev,
      activityIds: prev.activityIds.includes(id)
        ? prev.activityIds.filter((a) => a !== id)
        : [...prev.activityIds, id],
    }));
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Itinerário</h1>

      {days.length === 0 ? (
        <Card>
          <p className="text-black/60 dark:text-white/60">
            Ainda não há dias no roteiro. Adicionem abaixo conforme forem
            decidindo cidades e datas.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {days.map((day, index) => (
            <Card key={day.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-semibold mb-1">
                    Dia {index + 1} — {day.location}
                  </p>
                  {day.date && (
                    <p className="text-sm text-black/60 dark:text-white/60 mb-1">
                      {day.date}
                    </p>
                  )}
                  {day.accommodation && (
                    <p className="text-sm mb-1">🛏️ {day.accommodation}</p>
                  )}
                  {day.summary && <p className="text-sm mb-2">{day.summary}</p>}
                  {day.activityIds.length > 0 && (
                    <ul className="list-disc list-inside text-sm">
                      {day.activityIds.map((id) => {
                        const act = activityList.find((a) => a.id === id);
                        return <li key={id}>{act?.name ?? id}</li>;
                      })}
                    </ul>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 text-sm shrink-0">
                  <div className="flex gap-1">
                    <button
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      className="disabled:opacity-30"
                      aria-label="Mover para cima"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => move(index, 1)}
                      disabled={index === days.length - 1}
                      className="disabled:opacity-30"
                      aria-label="Mover para baixo"
                    >
                      ↓
                    </button>
                  </div>
                  <button onClick={() => startEdit(day)} className="underline">
                    Editar
                  </button>
                  <button
                    onClick={() => remove(day.id)}
                    className="text-red-600 dark:text-red-400 underline"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <section>
        <h2 className="font-semibold mb-3">
          {editingId ? "Editar dia" : "Adicionar dia"}
        </h2>
        <Card>
          <form onSubmit={submit} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
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
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Hospedagem (Airbnb etc.)"
                value={form.accommodation}
                onChange={(e) =>
                  setForm((f) => ({ ...f, accommodation: e.target.value }))
                }
                className="col-span-2 rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Resumo do dia"
                value={form.summary}
                onChange={(e) =>
                  setForm((f) => ({ ...f, summary: e.target.value }))
                }
                className="col-span-2 rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
              />
            </div>
            {activityList.length > 0 && (
              <div>
                <p className="text-sm mb-1 text-black/60 dark:text-white/60">
                  Passeios do dia
                </p>
                <div className="flex flex-wrap gap-2">
                  {activityList.map((a) => (
                    <label
                      key={a.id}
                      className={`text-xs rounded-full border px-3 py-1 cursor-pointer ${
                        form.activityIds.includes(a.id)
                          ? "bg-foreground text-background border-foreground"
                          : "border-black/10 dark:border-white/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={form.activityIds.includes(a.id)}
                        onChange={() => toggleActivity(a.id)}
                      />
                      {a.name}
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                {editingId ? "Salvar alterações" : "Adicionar dia"}
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
