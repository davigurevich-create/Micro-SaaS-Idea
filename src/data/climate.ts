import { ClimateInfo } from "@/lib/types";

// Médias históricas aproximadas pro período exato da viagem (25/03 a
// 04/04/2027) — referência pra decidir o que levar na mala, não previsão
// real (2027 ainda está longe demais pra isso). Só os locais do roteiro.
// Quando estivermos perto da data real, trocamos por previsão via API.
export const climateHistory: ClimateInfo[] = [
  {
    region: "El Calafate (AR)",
    month: "Final de março (25–31)",
    avgHigh: "13°C",
    avgLow: "6°C",
    notes: "Ainda clima de verão tardio, mas esfriando. Vento forte à tarde.",
  },
  {
    region: "El Calafate (AR)",
    month: "Início de abril (1–4)",
    avgHigh: "9°C",
    avgLow: "3°C",
    notes: "Outono já estabelecido, dias mais curtos e mais frios que março.",
  },
  {
    region: "El Chaltén (AR)",
    month: "Final de março (25–31)",
    avgHigh: "6°C",
    avgLow: "2°C",
    notes: "Frio e instável mesmo de dia, chance real de chuva. Trilhas podem fechar por vento.",
  },
  {
    region: "El Chaltén (AR)",
    month: "Início de abril (1–4)",
    avgHigh: "5°C",
    avgLow: "1°C",
    notes: "Chance de neve nas partes mais altas das trilhas. Levar roupa bem quente.",
  },
  {
    region: "Puerto Natales (CL)",
    month: "Final de março (25–31)",
    avgHigh: "14°C",
    avgLow: "6°C",
    notes: "Chuva frequente, cerca de 6h de sol por dia.",
  },
  {
    region: "Puerto Natales (CL)",
    month: "Início de abril (1–4)",
    avgHigh: "11°C",
    avgLow: "5°C",
    notes: "Mais frio que março, vento constante — vale pra Torres del Paine também.",
  },
  {
    region: "Punta Arenas (CL)",
    month: "Final de março (25–31)",
    avgHigh: "12°C",
    avgLow: "7°C",
    notes: "Nublado na maior parte dos dias, bastante vento.",
  },
  {
    region: "Punta Arenas (CL)",
    month: "Início de abril (1–4)",
    avgHigh: "9°C",
    avgLow: "5°C",
    notes: "Mais chuva e umidade que março, temperatura caindo rápido.",
  },
];
