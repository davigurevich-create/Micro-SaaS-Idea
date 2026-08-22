import { TransportLeg } from "@/lib/types";

// Carro cross-border (retirar no Chile, devolver na Argentina) não é uma
// reserva que as locadoras oferecem de verdade — o carro tem que voltar pro
// país de origem. Solução: dois aluguéis, um por país, com um trecho de
// ônibus cruzando a fronteira entre eles.
export const transportLegs: TransportLeg[] = [
  {
    id: "t1",
    type: "carro",
    from: "Punta Arenas (retirada)",
    to: "Puerto Natales (devolução)",
    date: "2027-03-26",
    notes:
      "Carro só no Chile — cobre Punta Arenas → Puerto Natales → Torres del Paine. Devolver por volta de 29/03, antes do trecho de ônibus.",
  },
  {
    id: "t2",
    type: "onibus",
    from: "Puerto Natales",
    to: "El Calafate",
    date: "2027-03-30",
    notes:
      "Rota clássica cruzando a fronteira Chile/Argentina (~4-5h, empresas como Zaahj/Bus-Sur). Substitui o carro nesse trecho pra evitar a devolução cross-border.",
  },
  {
    id: "t3",
    type: "carro",
    from: "El Calafate (retirada)",
    to: "El Calafate (devolução)",
    date: "2027-03-30",
    notes:
      "Já na Argentina — cobre El Calafate → El Chaltén → Tres Lagos → El Calafate. Devolver antes do voo de volta em 05/04.",
  },
];
