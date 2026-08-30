import { TripDocument } from "@/lib/types";

// Baseado no roteiro-base de pesquisa (PDF "Patagonia 2027 - roteiro-base").
// Editável direto pela página de Documentos.
export const documents: TripDocument[] = [
  {
    id: "doc1",
    title: "Checklist pra locadora do carro (El Calafate)",
    type: "outro",
    owner: "Ambos",
    notes:
      "Confirmar antes de pagar, em ordem de prioridade: 1) permissão expressa Argentina→Chile→Argentina; 2) seguro/documentação internacional fornecidos pela locadora; 3) quilometragem livre ou limite alto; 4) política pra estrada de ripio e danos em pneus/vidros; 5) estepe em bom estado + kit obrigatório; 6) assistência em viagem fora da Argentina; 7) horário de retirada/devolução no aeroporto. A permissão de fronteira vale mais que economizar na diária.",
  },
  {
    id: "doc2",
    title: "Passagens São Paulo ↔ El Calafate",
    type: "reserva",
    owner: "Ambos",
    notes: "Primeira coisa a reservar. Ida 24/03 (voo noturno), volta 04/04 (10:20).",
  },
  {
    id: "doc3",
    title: "Minitrekking 1 / Hielo y Aventura — 26/03",
    type: "reserva",
    owner: "Ambos",
    notes: "Passeio concorrido, reservar com antecedência. Ir com carro próprio, sem transfer.",
  },
  {
    id: "doc4",
    title: "Dicas de estrada",
    type: "outro",
    owner: "Ambos",
    notes:
      "Abastecer sempre que possível (não contar com posto específico nos trechos longos). Baixar mapas offline antes de sair das cidades. Evitar dirigir à noite (fauna, vento, pouca luz). Vento patagônico pode ser muito forte — segurar a porta ao abrir e reduzir velocidade em rajadas laterais. Levar passaporte e documentos do carro à mão na fronteira. Sempre incluir margem de tempo extra além da estimativa do mapa.",
  },
];
