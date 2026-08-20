import { TripInfo } from "@/lib/types";

// Ajustável direto pela interface (card "Dados da Viagem" na Visão Geral).
// Este é só o valor inicial antes de qualquer edição.
export const trip: TripInfo = {
  title: "Patagônia 2027",
  travelers: ["Davi", "Nitzi"],
  startDate: null,
  endDate: null,
  durationDays: 12,
  entryCity: null,
  exitCity: null,
  notes:
    "Sonho principal: o clássico outono patagônico, com as montanhas iluminadas de laranja ao amanhecer. Mirando a 1ª quinzena de março/2027 (trilhas e refúgios ainda em operação plena).",
};
