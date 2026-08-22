import { TripInfo } from "@/lib/types";

// Ajustável direto pela interface (card "Dados da Viagem" na Visão Geral).
// Este é só o valor inicial antes de qualquer edição.
export const trip: TripInfo = {
  title: "Patagônia 2027",
  travelers: ["Davi", "Nitzi"],
  startDate: "2027-03-26",
  endDate: "2027-04-05",
  durationDays: 11,
  entryCity: "Punta Arenas (Chile)",
  exitCity: "El Calafate (Argentina)",
  notes:
    "Embarque na noite de 25/03, chegada em Punta Arenas na manhã de 26/03 pra já pegar o carro alugado. Volta pro Brasil saindo de El Calafate na segunda-feira, 05/04. Sonho principal: o clássico outono patagônico, com as montanhas iluminadas de laranja ao amanhecer.",
};
