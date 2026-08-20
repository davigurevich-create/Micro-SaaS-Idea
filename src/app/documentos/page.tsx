import { Card } from "@/components/Card";
import { documents } from "@/data/documents";
import { DocumentType } from "@/lib/types";

const typeLabels: Record<DocumentType, string> = {
  passaporte: "Passaporte",
  seguro: "Seguro Viagem",
  voucher: "Voucher",
  reserva: "Reserva",
  outro: "Outro",
};

export default function DocumentosPage() {
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
            <Card key={doc.id} title={doc.title}>
              <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/50 mb-2">
                {typeLabels[doc.type]} · {doc.owner}
              </p>
              {doc.notes && <p className="text-sm">{doc.notes}</p>}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
