import { Card } from "@/components/Card";
import { climateHistory } from "@/data/climate";

export default function ClimaPage() {
  const byRegion = climateHistory.reduce<Record<string, typeof climateHistory>>(
    (acc, c) => {
      (acc[c.region] ??= []).push(c);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Clima</h1>
        <p className="text-sm text-black/60 dark:text-white/60">
          Como a viagem é em 2027, ainda não há previsão real — os números
          abaixo são médias históricas de referência para ajudar a escolher
          época e o que levar na mala. Perto da data, trocamos por previsão
          real por local.
        </p>
      </div>

      {Object.entries(byRegion).map(([region, entries]) => (
        <div key={region}>
          <h2 className="font-semibold mb-3">{region}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {entries.map((c) => (
              <Card key={`${c.region}-${c.month}`} title={c.month}>
                <p className="text-sm">
                  🌡️ Máx {c.avgHigh} · Mín {c.avgLow}
                </p>
                <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                  {c.notes}
                </p>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
