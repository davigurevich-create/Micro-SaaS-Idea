import { TransportLeg } from "@/lib/types";

// Roteiro atual: retirada e devolução do carro no mesmo lugar (El Calafate),
// então é só UM aluguel — com permissão de fronteira pro trecho em Torres
// del Paine (Chile), em vez dos dois carros + ônibus do plano anterior.
export const transportLegs: TransportLeg[] = [
  {
    id: "t1",
    type: "carro",
    from: "El Calafate (retirada)",
    to: "El Calafate (devolução)",
    date: "2027-03-25",
    notes:
      "Carro único pro loop inteiro: El Calafate → El Chaltén → Puerto Natales/Torres del Paine → El Calafate. Avisar a locadora com 2-3 semanas de antecedência pra emitir a permissão de cruzar a fronteira pro Chile (~US$100-200 extra + seguro que cobre os dois países). Devolver em 04/04, antes do voo.",
  },
];
