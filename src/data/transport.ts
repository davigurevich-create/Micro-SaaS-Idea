import { TransportLeg } from "@/lib/types";

// Baseado no roteiro-base de pesquisa (PDF "Patagonia 2027 - roteiro-base").
export const transportLegs: TransportLeg[] = [
  {
    id: "t1",
    type: "voo",
    from: "São Paulo (GRU)",
    to: "El Calafate (FTE)",
    date: "2027-03-24",
    notes: "Voo noturno, quarta-feira. Chegada prevista às 7h30 do dia 25/03.",
  },
  {
    id: "t2",
    type: "carro",
    from: "El Calafate (retirada)",
    to: "El Calafate (devolução)",
    date: "2027-03-25",
    notes:
      "Carro único pro loop inteiro: El Calafate → El Chaltén → Puerto Natales/Torres del Paine → El Calafate. Exigir da locadora (ver checklist completo em Documentos): permissão expressa pra cruzar Argentina→Chile→Argentina, seguro/documentação internacional, km livre, política pra ripio e danos em pneus/vidros, estepe em bom estado, assistência em viagem fora da Argentina. Devolver em 04/04, antes do voo.",
  },
  {
    id: "t3",
    type: "voo",
    from: "El Calafate (FTE)",
    to: "São Paulo (GRU)",
    date: "2027-04-04",
    departureTime: "10:20",
    notes: "Domingo. Dormir em El Calafate na véspera evita qualquer risco de fronteira/estrada no dia do voo.",
  },
];
