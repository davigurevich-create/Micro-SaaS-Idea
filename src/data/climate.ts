import { ClimateInfo } from "@/lib/types";

// Médias históricas aproximadas (referência geral, não previsão).
// Servem para ajudar a decidir época da viagem e o que levar na mala.
// Quando estivermos perto da data real, trocamos por previsão via API.
export const climateHistory: ClimateInfo[] = [
  {
    region: "El Calafate (AR)",
    month: "Dezembro",
    avgHigh: "19°C",
    avgLow: "6°C",
    notes: "Dias longos, vento forte à tarde. Alta temporada.",
  },
  {
    region: "El Calafate (AR)",
    month: "Janeiro",
    avgHigh: "21°C",
    avgLow: "8°C",
    notes: "Mês mais quente. Vento constante o dia todo.",
  },
  {
    region: "El Chaltén (AR)",
    month: "Dezembro",
    avgHigh: "17°C",
    avgLow: "5°C",
    notes: "Clima instável, trilhas podem fechar por vento forte.",
  },
  {
    region: "El Chaltén (AR)",
    month: "Fevereiro",
    avgHigh: "18°C",
    avgLow: "5°C",
    notes: "Boa visibilidade do Fitz Roy, mas sempre variável.",
  },
  {
    region: "Ushuaia (AR)",
    month: "Dezembro",
    avgHigh: "13°C",
    avgLow: "5°C",
    notes: "Clima frio mesmo no verão, chuva/vento frequentes.",
  },
  {
    region: "Ushuaia (AR)",
    month: "Janeiro",
    avgHigh: "14°C",
    avgLow: "6°C",
    notes: "Mês mais quente, ainda assim leve casaco corta-vento.",
  },
  {
    region: "Puerto Natales / Torres del Paine (CL)",
    month: "Janeiro",
    avgHigh: "17°C",
    avgLow: "7°C",
    notes: "Pico de alta temporada no parque, reservar refúgios com antecedência.",
  },
  {
    region: "Bariloche (AR)",
    month: "Fevereiro",
    avgHigh: "22°C",
    avgLow: "8°C",
    notes: "Bom para trekking, lagos e cervejarias artesanais.",
  },
];
