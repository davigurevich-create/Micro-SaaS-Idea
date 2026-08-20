import { Card } from "@/components/Card";
import { itinerary } from "@/data/itinerary";
import { activities } from "@/data/activities";

export default function ItinerarioPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Itinerário</h1>

      {itinerary.length === 0 ? (
        <Card>
          <p className="text-black/60 dark:text-white/60">
            Ainda não montamos o roteiro dia a dia. Assim que definirmos as
            cidades e datas, cada dia da viagem aparece aqui.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {itinerary.map((day) => (
            <Card key={day.dayNumber} title={`Dia ${day.dayNumber} — ${day.location}`}>
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
                    const activity = activities.find((a) => a.id === id);
                    return <li key={id}>{activity?.name ?? id}</li>;
                  })}
                </ul>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
