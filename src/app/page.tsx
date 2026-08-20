"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Countdown } from "@/components/Countdown";
import { trip as seedTrip } from "@/data/trip";
import { itinerary as seedItinerary } from "@/data/itinerary";
import { activities as seedActivities } from "@/data/activities";
import { packingList as seedPackingList } from "@/data/packing";
import { budgetCategories as seedCategories } from "@/data/budget";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import {
  Activity,
  BudgetCategory,
  ItineraryDay,
  PackingItem,
  TripInfo,
} from "@/lib/types";

const sections = [
  { href: "/itinerario", label: "Itinerário", desc: "Roteiro dia a dia" },
  {
    href: "/passeios",
    label: "Passeios & Restaurantes",
    desc: "O que fazer e onde comer",
  },
  { href: "/transporte", label: "Transporte", desc: "Voos, ônibus, carro" },
  { href: "/orcamento", label: "Orçamento", desc: "Metas e despesas da viagem" },
  { href: "/clima", label: "Clima", desc: "Referência sazonal" },
  { href: "/mala", label: "Checklist de Mala", desc: "O que levar" },
  { href: "/documentos", label: "Documentos", desc: "Passaporte, seguro, vouchers" },
];

export default function Home() {
  const [trip, setTrip] = useLocalStorageState<TripInfo>(
    STORAGE_KEYS.trip,
    seedTrip
  );
  const [itinerary] = useLocalStorageState<ItineraryDay[]>(
    STORAGE_KEYS.itinerary,
    seedItinerary
  );
  const [activities] = useLocalStorageState<Activity[]>(
    STORAGE_KEYS.activities,
    seedActivities
  );
  const [packingList] = useLocalStorageState<PackingItem[]>(
    STORAGE_KEYS.packing,
    seedPackingList
  );
  const [budgetCategories] = useLocalStorageState<BudgetCategory[]>(
    `${STORAGE_KEYS.budget}.categories`,
    seedCategories
  );

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    startDate: trip.startDate ?? "",
    endDate: trip.endDate ?? "",
    durationDays: trip.durationDays?.toString() ?? "",
    entryCity: trip.entryCity ?? "",
    exitCity: trip.exitCity ?? "",
    notes: trip.notes ?? "",
  });

  function startEdit() {
    setForm({
      startDate: trip.startDate ?? "",
      endDate: trip.endDate ?? "",
      durationDays: trip.durationDays?.toString() ?? "",
      entryCity: trip.entryCity ?? "",
      exitCity: trip.exitCity ?? "",
      notes: trip.notes ?? "",
    });
    setEditing(true);
  }

  function saveTrip(e: FormEvent) {
    e.preventDefault();
    setTrip((prev) => ({
      ...prev,
      startDate: form.startDate || null,
      endDate: form.endDate || null,
      durationDays: form.durationDays ? parseInt(form.durationDays, 10) : null,
      entryCity: form.entryCity.trim() || null,
      exitCity: form.exitCity.trim() || null,
      notes: form.notes.trim() || undefined,
    }));
    setEditing(false);
  }

  const packed = packingList.filter((p) => p.packed).length;
  const totalPlanned = budgetCategories.reduce((sum, c) => sum + c.plannedBRL, 0);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <p className="text-sm text-black/60 dark:text-white/60 mb-1">
          {trip.travelers.join(" & ")}
        </p>
        <h1 className="text-3xl font-bold mb-2">{trip.title}</h1>
        <Countdown startDate={trip.startDate} />

        {!editing ? (
          <div className="mt-3 text-sm text-black/70 dark:text-white/70 flex flex-col gap-1">
            {trip.durationDays && <p>🗓️ {trip.durationDays} dias de viagem</p>}
            {(trip.entryCity || trip.exitCity) && (
              <p>
                {trip.entryCity && `Entrada: ${trip.entryCity}`}
                {trip.entryCity && trip.exitCity && " · "}
                {trip.exitCity && `Saída: ${trip.exitCity}`}
              </p>
            )}
            {trip.notes && <p className="text-black/60 dark:text-white/60">{trip.notes}</p>}
            <button onClick={startEdit} className="underline text-left mt-1 w-fit">
              Editar dados da viagem
            </button>
          </div>
        ) : (
          <Card className="mt-3">
            <form onSubmit={saveTrip} className="grid grid-cols-2 gap-3">
              <label className="text-xs text-black/60 dark:text-white/60 flex flex-col gap-1">
                Data de início
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                  className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
                />
              </label>
              <label className="text-xs text-black/60 dark:text-white/60 flex flex-col gap-1">
                Data de fim
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                  className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
                />
              </label>
              <label className="text-xs text-black/60 dark:text-white/60 flex flex-col gap-1">
                Duração (dias)
                <input
                  type="number"
                  value={form.durationDays}
                  onChange={(e) => setForm((f) => ({ ...f, durationDays: e.target.value }))}
                  className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
                />
              </label>
              <label className="text-xs text-black/60 dark:text-white/60 flex flex-col gap-1">
                Cidade de entrada
                <input
                  type="text"
                  value={form.entryCity}
                  onChange={(e) => setForm((f) => ({ ...f, entryCity: e.target.value }))}
                  className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
                />
              </label>
              <label className="text-xs text-black/60 dark:text-white/60 flex flex-col gap-1">
                Cidade de saída
                <input
                  type="text"
                  value={form.exitCity}
                  onChange={(e) => setForm((f) => ({ ...f, exitCity: e.target.value }))}
                  className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
                />
              </label>
              <label className="col-span-2 text-xs text-black/60 dark:text-white/60 flex flex-col gap-1">
                Notas
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
                />
              </label>
              <div className="col-span-2 flex gap-2">
                <button
                  type="submit"
                  className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="rounded-full border border-black/10 dark:border-white/10 px-4 py-2 text-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </Card>
        )}
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="text-center">
          <p className="text-2xl font-semibold">{itinerary.length}</p>
          <p className="text-xs text-black/60 dark:text-white/60">dias planejados</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-semibold">{activities.length}</p>
          <p className="text-xs text-black/60 dark:text-white/60">passeios cadastrados</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-semibold">
            {packed}/{packingList.length}
          </p>
          <p className="text-xs text-black/60 dark:text-white/60">mala pronta</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-semibold">
            {totalPlanned.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
          <p className="text-xs text-black/60 dark:text-white/60">orçamento planejado</p>
        </Card>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Seções</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {sections.map((s) => (
            <Link key={s.href} href={s.href}>
              <Card className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors h-full">
                <p className="font-medium">{s.label}</p>
                <p className="text-sm text-black/60 dark:text-white/60">
                  {s.desc}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
