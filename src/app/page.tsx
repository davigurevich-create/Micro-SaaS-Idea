import Link from "next/link";
import { Card } from "@/components/Card";
import { Countdown } from "@/components/Countdown";
import { trip } from "@/data/trip";
import { itinerary } from "@/data/itinerary";
import { activities } from "@/data/activities";
import { packingList } from "@/data/packing";
import { budgetCategories } from "@/data/budget";

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
  const packed = packingList.filter((p) => p.packed).length;

  return (
    <div className="flex flex-col gap-8">
      <section>
        <p className="text-sm text-black/60 dark:text-white/60 mb-1">
          {trip.travelers.join(" & ")}
        </p>
        <h1 className="text-3xl font-bold mb-2">{trip.title}</h1>
        <Countdown startDate={trip.startDate} />
        {trip.notes && (
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            {trip.notes}
          </p>
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
            {budgetCategories
              .reduce((sum, c) => sum + c.plannedBRL, 0)
              .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
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
