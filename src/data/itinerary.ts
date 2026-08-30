import { ItineraryDay } from "@/lib/types";

// Baseado no roteiro-base de pesquisa (PDF "Patagonia 2027 - roteiro-base").
// Um carro só, retirado e devolvido em El Calafate, com permissão de
// fronteira pro trecho em Torres del Paine (Chile). Editável direto pela
// página de Itinerário — ajustem à vontade.
export const itinerary: ItineraryDay[] = [
  {
    id: "d1",
    date: "2027-03-25",
    location: "El Calafate",
    accommodation: "Airbnb em El Calafate (a definir)",
    summary:
      "Chegada às 7h30 (voo saiu de SP na noite anterior, quarta-feira) e retirada do carro. Dia sem passeio fixo: centro da cidade, Lago Argentino, cafés, compras de última hora e um jantar patagônico à noite.",
    activityIds: [],
  },
  {
    id: "d2",
    date: "2027-03-26",
    location: "El Calafate",
    accommodation: "Airbnb em El Calafate (a definir)",
    summary:
      "Glaciar Perito Moreno: Minitrekking 1 (Hielo y Aventura) combinado com as passarelas no mesmo dia. Ir com o carro próprio, sem transfer.",
    activityIds: ["cal-1", "cal-2"],
  },
  {
    id: "d3",
    date: "2027-03-27",
    location: "El Chaltén",
    accommodation: "Airbnb em El Chaltén (a definir)",
    summary:
      "El Calafate → El Chaltén (~215-220 km, ~3h, estrada asfaltada — sem pressa, aproveitando a paisagem). Chegada, check-in e passeio leve.",
    activityIds: [],
  },
  {
    id: "d4",
    date: "2027-03-28",
    location: "El Chaltén",
    accommodation: "Airbnb em El Chaltén (a definir)",
    summary:
      "Primeiro dia de trilha — Laguna Capri é o encaixe recomendado (vista do Fitz Roy sem virar expedição longa). Ajustar conforme vento, chuva e disposição.",
    activityIds: ["cha-3"],
  },
  {
    id: "d5",
    date: "2027-03-29",
    location: "El Chaltén",
    accommodation: "Airbnb em El Chaltén (a definir)",
    summary:
      "Segundo dia de trilha — repetir/ajustar conforme o clima do dia anterior, ou escolher entre as opções mais leves (Mirador de los Cóndores, Chorrillo del Salto) ou a mais puxada (Laguna de los Tres, opcional).",
    activityIds: [],
  },
  {
    id: "d6",
    date: "2027-03-30",
    location: "Puerto Natales",
    accommodation: "Airbnb em Puerto Natales (a definir)",
    summary:
      "⚠️ Dia mais cansativo do roteiro: ~450-500 km, 7-8h no total (pode aumentar por causa da fronteira). Carro argentino cruzando pro Chile — levar a documentação/seguro da locadora em mãos. Sair cedo, abastecer antes, levar água e lanche, e não programar passeio pra chegada.",
    activityIds: [],
  },
  {
    id: "d7",
    date: "2027-03-31",
    location: "Puerto Natales",
    accommodation: "Airbnb em Puerto Natales (a definir)",
    summary:
      "Torres del Paine — dia 1: circuito panorâmico pra se situar no parque (mirantes, Lago Pehoé, Salto Grande, vistas dos Cuernos).",
    activityIds: ["tdp-1"],
  },
  {
    id: "d8",
    date: "2027-04-01",
    location: "Puerto Natales",
    accommodation: "Airbnb em Puerto Natales (a definir)",
    summary:
      "Torres del Paine — dia 2: caminhada leve/moderada, escolhida conforme previsão e vento no dia. Base Torres não é obrigatório 'pra ter feito' o parque — só encaixar se o clima ajudar.",
    activityIds: ["tdp-2"],
  },
  {
    id: "d9",
    date: "2027-04-02",
    location: "Puerto Natales",
    accommodation: "Airbnb em Puerto Natales (a definir)",
    summary:
      "Torres del Paine — dia 3, flexível: repetir uma área que ficou encoberta, outra caminhada, ou Laguna Azul / Cueva del Milodón — um dia mais contemplativo.",
    activityIds: ["tdp-5", "tdp-6"],
  },
  {
    id: "d10",
    date: "2027-04-03",
    location: "El Calafate",
    accommodation: "Airbnb em El Calafate (a definir)",
    summary:
      "Puerto Natales → El Calafate (~270 km, reservar 4h30-5h30 pela fronteira). Chegar com folga, devolver o carro se for conveniente, organizar malas e último jantar.",
    activityIds: [],
  },
  {
    id: "d11",
    date: "2027-04-04",
    location: "El Calafate",
    summary:
      "Voo El Calafate → São Paulo às 10:20. Dormir em El Calafate na véspera elimina o risco de fronteira/estrada no dia do voo.",
    activityIds: [],
  },
];
