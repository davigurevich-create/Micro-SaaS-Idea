"use client";

import { FormEvent, useState } from "react";
import { Card } from "@/components/Card";
import { documents as seedDocuments } from "@/data/documents";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { DocumentType, Owner, TripDocument } from "@/lib/types";

const typeLabels: Record<DocumentType, string> = {
  passaporte: "Passaporte",
  seguro: "Seguro Viagem",
  voucher: "Voucher",
  reserva: "Reserva",
  outro: "Outro",
};
const types: DocumentType[] = ["passaporte", "seguro", "voucher", "reserva", "outro"];
const owners: Owner[] = ["Rubens", "Vitória", "Ambos"];

const emptyForm = {
  title: "",
  type: "reserva" as DocumentType,
  owner: "Ambos" as Owner,
  notes: "",
};

export default function DocumentosPage() {
  const [documents, setDocuments] = useLocalStorageState<TripDocument[]>(
    STORAGE_KEYS.documents,
    seedDocuments
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  function startEdit(doc: TripDocument) {
    setEditingId(doc.id);
    setForm({
      title: doc.title,
      type: doc.type,
      owner: doc.owner,
      notes: doc.notes ?? "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    const payload = {
      title: form.title.trim(),
      type: form.type,
      owner: form.owner,
      notes: form.notes.trim() || undefined,
    };
    if (editingId) {
      setDocuments((prev) =>
        prev.map((d) => (d.id === editingId ? { ...d, ...payload } : d))
      );
    } else {
      setDocuments((prev) => [...prev, { id: crypto.randomUUID(), ...payload }]);
    }
    cancelEdit();
  }

  function remove(id: string) {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    if (editingId === id) cancelEdit();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Documentos</h1>

      {documents.length === 0 ? (
        <Card>
          <p className="text-black/60 dark:text-white/60">
            Nenhum documento cadastrado ainda. Passaporte, seguro viagem,
            vouchers e reservas vão aparecer aqui.
          </p>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {documents.map((doc) => (
            <Card key={doc.id}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-medium">{doc.title}</p>
                <div className="flex gap-2 text-xs shrink-0">
                  <button onClick={() => startEdit(doc)} className="underline">
                    Editar
                  </button>
                  <button
                    onClick={() => remove(doc.id)}
                    className="text-red-600 dark:text-red-400 underline"
                  >
                    Remover
                  </button>
                </div>
              </div>
              <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/50 mb-2">
                {typeLabels[doc.type]} · {doc.owner}
              </p>
              {doc.notes && <p className="text-sm">{doc.notes}</p>}
            </Card>
          ))}
        </div>
      )}

      <section>
        <h2 className="font-semibold mb-3">
          {editingId ? "Editar documento" : "Adicionar documento"}
        </h2>
        <Card>
          <form onSubmit={submit} className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Título"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="col-span-2 rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
              required
            />
            <select
              value={form.type}
              onChange={(e) =>
                setForm((f) => ({ ...f, type: e.target.value as DocumentType }))
              }
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {typeLabels[t]}
                </option>
              ))}
            </select>
            <select
              value={form.owner}
              onChange={(e) =>
                setForm((f) => ({ ...f, owner: e.target.value as Owner }))
              }
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            >
              {owners.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
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
