import { ItineraryDay } from "@/lib/types";

// Rascunho inicial com base no roteiro combinado (Punta Arenas → Torres del
// Paine → El Calafate → El Chaltén → Tres Lagos → El Calafate). Editável
// direto pela página de Itinerário — ajustem à vontade.
export const itinerary: ItineraryDay[] = [
  {
    id: "d1",
    date: "2027-03-26",
    location: "Puerto Natales",
    accommodation: "Airbnb em Puerto Natales (a definir)",
    summary:
      "Chegada em Punta Arenas de madrugada (voo saiu na noite anterior), retirada do carro alugado e trecho até Puerto Natales (~3h). Parada rápida na Cueva del Milodón no caminho. Resto do dia livre pra descansar da viagem.",
    activityIds: ["a7"],
  },
  {
    id: "d2",
    date: "2027-03-27",
    location: "Puerto Natales",
    accommodation: "Airbnb em Puerto Natales (a definir)",
    summary:
      "Day trip a Torres del Paine — aclimatação com Salto Grande e o mirante dos Cuernos, sem trilha longa.",
    activityIds: [],
  },
  {
    id: "d3",
    date: "2027-03-28",
    location: "Puerto Natales",
    accommodation: "Airbnb em Puerto Natales (a definir)",
    summary:
      "Day-hike principal: Mirador Base Las Torres — a foto clássica das 3 torres. Sair bem cedo pela luz da manhã.",
    activityIds: ["a5"],
  },
  {
    id: "d4",
    date: "2027-03-29",
    location: "Puerto Natales",
    accommodation: "Airbnb em Puerto Natales (a definir)",
    summary:
      "Navegação até o Glaciar Grey + trecho parcial do Valle Francés. Dia também serve como reserva: se o clima atrapalhar o mirante das Torres no dia 3, dá pra tentar de novo aqui.",
    activityIds: ["a6"],
  },
  {
    id: "d5",
    date: "2027-03-30",
    location: "El Calafate",
    accommodation: "Airbnb em El Calafate (a definir)",
    summary:
      "Puerto Natales → El Calafate (~4-5h, cruzando a fronteira Chile/Argentina — reservar tempo extra pra imigração). Chegada à tarde, resto do dia livre.",
    activityIds: [],
  },
  {
    id: "d6",
    date: "2027-03-31",
    location: "El Calafate",
    accommodation: "Airbnb em El Calafate (a definir)",
    summary: "Glaciar Perito Moreno — passarelas e/ou mini trekking no gelo.",
    activityIds: ["a1", "a2"],
  },
  {
    id: "d7",
    date: "2027-04-01",
    location: "El Chaltén",
    accommodation: "Airbnb em El Chaltén (a definir)",
    summary:
      "El Calafate → El Chaltén (~3h pela Ruta 40 — a vista do Fitz Roy se abrindo na estrada). Tarde livre pra conhecer a vila.",
    activityIds: [],
  },
  {
    id: "d8",
    date: "2027-04-02",
    location: "El Chaltén",
    accommodation: "Airbnb em El Chaltén (a definir)",
    summary: "Trekking Laguna de los Tres — mirante do Fitz Roy, dia inteiro.",
    activityIds: ["a3"],
  },
  {
    id: "d9",
    date: "2027-04-03",
    location: "El Chaltén",
    accommodation: "Airbnb em El Chaltén (a definir)",
    summary: "Trekking Laguna Torre (mais leve) ou dia de descanso na vila.",
    activityIds: ["a4"],
  },
  {
    id: "d10",
    date: "2027-04-04",
    location: "El Calafate",
    accommodation: "Airbnb em El Calafate (a definir)",
    summary:
      "El Chaltén → Tres Lagos → El Calafate: o trecho mais 'estrada de filme' da viagem — estepe patagônica vazia, guanacos, condores, parada em Tres Lagos pra abastecer e fotos.",
    activityIds: [],
  },
  {
    id: "d11",
    date: "2027-04-05",
    location: "El Calafate",
    summary:
      "Devolução do carro alugado e voo de volta ao Brasil (segunda-feira à noite).",
    activityIds: [],
  },
];
