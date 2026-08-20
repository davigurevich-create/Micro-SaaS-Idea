import { Card } from "@/components/Card";
import { activities } from "@/data/activities";
import { ActivityCategory } from "@/lib/types";

const categoryLabels: Record<ActivityCategory, string> = {
  passeio: "Passeio",
  restaurante: "Restaurante",
  trilha: "Trilha",
  outro: "Outro",
};

export default function PasseiosPage() {
  const byLocation = activities.reduce<Record<string, typeof activities>>(
    (acc, a) => {
      (acc[a.location] ??= []).push(a);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Passeios & Restaurantes</h1>

      {activities.length === 0 ? (
        <Card>
          <p className="text-black/60 dark:text-white/60">
            Nenhum passeio ou restaurante cadastrado ainda. Conforme
            pesquisarmos, vamos adicionando aqui por cidade.
          </p>
        </Card>
      ) : (
        Object.entries(byLocation).map(([location, items]) => (
          <div key={location}>
            <h2 className="font-semibold mb-3">{location}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {items.map((a) => (
                <Card key={a.id} title={a.name}>
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
    </div>
  );
}
