import { TripInfo } from "@/lib/types";

// Ajustável direto pela interface (card "Dados da Viagem" na Visão Geral).
// Este é só o valor inicial antes de qualquer edição.
export const trip: TripInfo = {
  title: "Patagônia 2027",
  travelers: ["Davi", "Nitzi"],
  startDate: "2027-03-25",
  endDate: "2027-04-04",
  durationDays: 11,
  entryCity: "El Calafate (Argentina)",
  exitCity: "El Calafate (Argentina)",
  notes:
    "Embarque de SP na noite de 24/03 (quarta), chegada em El Calafate às 9h de 25/03 (quinta) pra já pegar o carro alugado. Loop de carro único: El Calafate → El Chaltén → Puerto Natales/Torres del Paine → El Calafate, com permissão de fronteira pro trecho no Chile. Volta pra SP saindo de El Calafate no domingo, 04/04. Sonho principal: o clássico outono patagônico, com as montanhas iluminadas de laranja ao amanhecer.",
};
