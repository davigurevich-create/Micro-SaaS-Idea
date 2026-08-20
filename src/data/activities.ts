import { Activity } from "@/lib/types";

// Sugestões iniciais discutidas (trilhas/passeios moderados, sem nada extremo).
// Editável direto pela página de Passeios & Restaurantes — usem como ponto de partida.
export const activities: Activity[] = [
  {
    id: "a1",
    name: "Mini trekking no Glaciar Perito Moreno",
    location: "El Calafate",
    category: "trilha",
    priority: "essencial",
    notes: "Caminhada guiada sobre o gelo com crampons, nível fácil/moderado. Reservar com antecedência.",
  },
  {
    id: "a2",
    name: "Passarelas do Perito Moreno",
    location: "El Calafate",
    category: "passeio",
    priority: "essencial",
    notes: "Vista clássica da frente do glaciar, sem esforço físico.",
  },
  {
    id: "a3",
    name: "Trekking Laguna de los Tres (mirante Fitz Roy)",
    location: "El Chaltén",
    category: "trilha",
    priority: "essencial",
    notes: "~20km ida e volta, puxado mas sem trecho técnico. Sair cedo pela luz da manhã.",
  },
  {
    id: "a4",
    name: "Trekking Laguna Torre",
    location: "El Chaltén",
    category: "trilha",
    priority: "opcional",
    notes: "Alternativa mais tranquila, vista do Cerro Torre.",
  },
  {
    id: "a5",
    name: "Mirador Base Las Torres",
    location: "Torres del Paine",
    category: "trilha",
    priority: "essencial",
    notes: "Day-hike até a vista clássica das 3 torres, sem precisar do W Trek completo.",
  },
  {
    id: "a6",
    name: "Navegação até o Glaciar Grey",
    location: "Torres del Paine",
    category: "passeio",
    priority: "opcional",
  },
  {
    id: "a7",
    name: "Cueva del Milodón",
    location: "Puerto Natales",
    category: "passeio",
    priority: "opcional",
    notes: "Parada rápida e fácil a caminho/volta do parque.",
  },
];
