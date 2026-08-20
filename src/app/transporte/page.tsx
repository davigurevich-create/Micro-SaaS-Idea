"use client";

import { FormEvent, useState } from "react";
import { Card } from "@/components/Card";
import { transportLegs as seedTransportLegs } from "@/data/transport";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { TransportLeg, TransportType } from "@/lib/types";

const typeIcons: Record<TransportType, string> = {
  voo: "✈️",
  onibus: "🚌",
  carro: "🚗",
  balsa: "⛴️",
  outro: "🧭",
};
const types: TransportType[] = ["voo", "onibus", "carro", "balsa", "outro"];

const emptyForm = {
  type: "voo" as TransportType,
  from: "",
  to: "",
  date: "",
  departureTime: "",
  arrivalTime: "",
  company: "",
  confirmationCode: "",
  notes: "",
};

export default function TransportePage() {
  const [legs, setLegs] = useLocalStorageState<TransportLeg[]>(
    STORAGE_KEYS.transport,
    seedTransportLegs
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  function startEdit(leg: TransportLeg) {
    setEditingId(leg.id);
    setForm({
      type: leg.type,
      from: leg.from,
      to: leg.to,
      date: leg.date ?? "",
      departureTime: leg.departureTime ?? "",
      arrivalTime: leg.arrivalTime ?? "",
      company: leg.company ?? "",
      confirmationCode: leg.confirmationCode ?? "",
      notes: leg.notes ?? "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.from.trim() || !form.to.trim()) return;
    const payload = {
      type: form.type,
      from: form.from.trim(),
      to: form.to.trim(),
      date: form.date || null,
      departureTime: form.departureTime.trim() || undefined,
      arrivalTime: form.arrivalTime.trim() || undefined,
      company: form.company.trim() || undefined,
      confirmationCode: form.confirmationCode.trim() || undefined,
      notes: form.notes.trim() || undefined,
    };
    if (editingId) {
      setLegs((prev) =>
        prev.map((l) => (l.id === editingId ? { ...l, ...payload } : l))
      );
    } else {
      setLegs((prev) => [...prev, { id: crypto.randomUUID(), ...payload }]);
    }
    cancelEdit();
  }

  function remove(id: string) {
    setLegs((prev) => prev.filter((l) => l.id !== id));
    if (editingId === id) cancelEdit();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Transporte</h1>

      {legs.length === 0 ? (
        <Card>
          <p className="text-black/60 dark:text-white/60">
            Nenhum trecho cadastrado ainda. Adicionem voos, ônibus, aluguel de
            carro e travessias conforme forem reservando.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {legs.map((leg) => (
            <Card key={leg.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {typeIcons[leg.type]} {leg.from} → {leg.to}
                  </p>
                  <div className="text-sm text-black/60 dark:text-white/60 mt-1 flex gap-3 flex-wrap">
                    {leg.date && <span>{leg.date}</span>}
                    {leg.departureTime && <span>Saída {leg.departureTime}</span>}
                    {leg.arrivalTime && <span>Chegada {leg.arrivalTime}</span>}
                    {leg.company && <span>{leg.company}</span>}
                    {leg.confirmationCode && <span>Cód: {leg.confirmationCode}</span>}
                  </div>
                  {leg.notes && <p className="text-sm mt-2">{leg.notes}</p>}
                </div>
                <div className="flex gap-2 text-xs shrink-0">
                  <button onClick={() => startEdit(leg)} className="underline">
                    Editar
                  </button>
                  <button
                    onClick={() => remove(leg.id)}
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
          {editingId ? "Editar trecho" : "Adicionar trecho"}
        </h2>
        <Card>
          <form onSubmit={submit} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <select
              value={form.type}
              onChange={(e) =>
                setForm((f) => ({ ...f, type: e.target.value as TransportType }))
              }
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {typeIcons[t]} {t}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="De"
              value={form.from}
              onChange={(e) => setForm((f) => ({ ...f, from: e.target.value }))}
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
              required
            />
            <input
              type="text"
              placeholder="Para"
              value={form.to}
              onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))}
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
              type="time"
              placeholder="Saída"
              value={form.departureTime}
              onChange={(e) =>
                setForm((f) => ({ ...f, departureTime: e.target.value }))
              }
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            />
            <input
              type="time"
              placeholder="Chegada"
              value={form.arrivalTime}
              onChange={(e) =>
                setForm((f) => ({ ...f, arrivalTime: e.target.value }))
              }
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Companhia"
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Código de confirmação"
              value={form.confirmationCode}
              onChange={(e) =>
                setForm((f) => ({ ...f, confirmationCode: e.target.value }))
              }
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Notas"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              className="col-span-2 sm:col-span-4 rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            />
            <div className="col-span-2 sm:col-span-4 flex gap-2">
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
