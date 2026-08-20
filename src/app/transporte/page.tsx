import { Card } from "@/components/Card";
import { transportLegs } from "@/data/transport";
import { TransportType } from "@/lib/types";

const typeIcons: Record<TransportType, string> = {
  voo: "✈️",
  onibus: "🚌",
  carro: "🚗",
  balsa: "⛴️",
  outro: "🧭",
};

export default function TransportePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Transporte</h1>

      {transportLegs.length === 0 ? (
        <Card>
          <p className="text-black/60 dark:text-white/60">
            Nenhum trecho cadastrado ainda. Voos, ônibus, aluguel de carro e
            travessias aparecem aqui assim que reservarmos.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {transportLegs.map((leg) => (
            <Card key={leg.id}>
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {typeIcons[leg.type]} {leg.from} → {leg.to}
                </p>
                {leg.date && (
                  <p className="text-sm text-black/60 dark:text-white/60">
                    {leg.date}
                  </p>
                )}
              </div>
              <div className="text-sm text-black/60 dark:text-white/60 mt-1 flex gap-3 flex-wrap">
                {leg.departureTime && <span>Saída {leg.departureTime}</span>}
                {leg.arrivalTime && <span>Chegada {leg.arrivalTime}</span>}
                {leg.company && <span>{leg.company}</span>}
                {leg.confirmationCode && (
                  <span>Cód: {leg.confirmationCode}</span>
                )}
              </div>
              {leg.notes && <p className="text-sm mt-2">{leg.notes}</p>}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
