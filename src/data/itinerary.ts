import { ItineraryDay } from "@/lib/types";

// Roteiro combinado: um carro só, retirado e devolvido em El Calafate, com
// permissão de fronteira pro trecho em Torres del Paine (Chile). Editável
// direto pela página de Itinerário — ajustem à vontade.
export const itinerary: ItineraryDay[] = [
  {
    id: "d1",
    date: "2027-03-25",
    location: "El Calafate",
    accommodation: "Airbnb em El Calafate (a definir)",
    summary:
      "Chegada às 9h (voo saiu de SP na noite anterior, quarta-feira) e retirada do carro alugado. Resto do dia livre pra descansar da viagem.",
    activityIds: [],
  },
  {
    id: "d2",
    date: "2027-03-26",
    location: "El Calafate",
    accommodation: "Airbnb em El Calafate (a definir)",
    summary: "Glaciar Perito Moreno — passarelas e/ou mini trekking no gelo.",
    activityIds: ["a1", "a2"],
  },
  {
    id: "d3",
    date: "2027-03-27",
    location: "El Chaltén",
    accommodation: "Airbnb em El Chaltén (a definir)",
    summary:
      "El Calafate → El Chaltén (~3h pela Ruta 40 — a vista do Fitz Roy se abrindo na estrada). Tarde livre pra conhecer a vila.",
    activityIds: [],
  },
  {
    id: "d4",
    date: "2027-03-28",
    location: "El Chaltén",
    accommodation: "Airbnb em El Chaltén (a definir)",
    summary: "Trekking Laguna de los Tres — mirante do Fitz Roy, dia inteiro.",
    activityIds: ["a3"],
  },
  {
    id: "d5",
    date: "2027-03-29",
    location: "El Chaltén",
    accommodation: "Airbnb em El Chaltén (a definir)",
    summary: "Trekking Laguna Torre (mais leve) ou dia de descanso na vila.",
    activityIds: ["a4"],
  },
  {
    id: "d6",
    date: "2027-03-30",
    location: "Puerto Natales",
    accommodation: "Airbnb em Puerto Natales (a definir)",
    summary:
      "El Chaltén → El Calafate → Puerto Natales, cruzando a fronteira Chile/Argentina com o carro (usar a permissão combinada com a locadora). Parada na Cueva del Milodón no caminho. Chegada à tarde/noite.",
    activityIds: ["a7"],
  },
  {
    id: "d7",
    date: "2027-03-31",
    location: "Puerto Natales",
    accommodation: "Airbnb em Puerto Natales (a definir)",
    summary:
      "Day trip a Torres del Paine — aclimatação com Salto Grande e o mirante dos Cuernos, sem trilha longa.",
    activityIds: [],
  },
  {
    id: "d8",
    date: "2027-04-01",
    location: "Puerto Natales",
    accommodation: "Airbnb em Puerto Natales (a definir)",
    summary:
      "Day-hike principal: Mirador Base Las Torres — a foto clássica das 3 torres. Sair bem cedo pela luz da manhã.",
    activityIds: ["a5"],
  },
  {
    id: "d9",
    date: "2027-04-02",
    location: "Puerto Natales",
    accommodation: "Airbnb em Puerto Natales (a definir)",
    summary:
      "Navegação até o Glaciar Grey + trecho parcial do Valle Francés. Dia também serve como reserva se o clima atrapalhar o mirante das Torres no dia 8.",
    activityIds: ["a6"],
  },
  {
    id: "d10",
    date: "2027-04-03",
    location: "El Calafate",
    accommodation: "Airbnb em El Calafate (a definir)",
    summary:
      "Puerto Natales → El Calafate (~4-5h, cruzando a fronteira de volta — reservar tempo extra pra imigração). Última noite da viagem.",
    activityIds: [],
  },
  {
    id: "d11",
    date: "2027-04-04",
    location: "El Calafate",
    summary:
      "Devolução do carro alugado e voo de volta a São Paulo (domingo).",
    activityIds: [],
  },
];
