import { PackingItem } from "@/lib/types";

// Checklist inicial genérico para Patagônia (roupas em camadas, vento e frio).
// Vamos ajustar conforme roteiro e época definidos.
export const packingList: PackingItem[] = [
  { id: "p1", category: "Roupas", item: "Jaqueta corta-vento/impermeável", owner: "Ambos", packed: false },
  { id: "p2", category: "Roupas", item: "Segunda pele térmica (base layer)", owner: "Ambos", packed: false },
  { id: "p3", category: "Roupas", item: "Fleece ou casaco intermediário", owner: "Ambos", packed: false },
  { id: "p4", category: "Roupas", item: "Calça de trekking corta-vento", owner: "Ambos", packed: false },
  { id: "p5", category: "Roupas", item: "Gorro e luvas", owner: "Ambos", packed: false },
  { id: "p6", category: "Roupas", item: "Óculos de sol (proteção UV forte)", owner: "Ambos", packed: false },
  { id: "p7", category: "Calçados", item: "Bota de trekking impermeável", owner: "Ambos", packed: false },
  { id: "p8", category: "Calçados", item: "Meias térmicas extras", owner: "Ambos", packed: false },
  { id: "p9", category: "Equipamento", item: "Mochila de trilha (day pack)", owner: "Ambos", packed: false },
  { id: "p10", category: "Equipamento", item: "Garrafa de água reutilizável", owner: "Ambos", packed: false },
  { id: "p11", category: "Equipamento", item: "Protetor solar (índice alto)", owner: "Ambos", packed: false },
  { id: "p12", category: "Equipamento", item: "Power bank / carregador", owner: "Ambos", packed: false },
  { id: "p13", category: "Documentos", item: "Passaporte", owner: "Ambos", packed: false },
  { id: "p14", category: "Documentos", item: "Seguro viagem (apólice impressa)", owner: "Ambos", packed: false },
  { id: "p15", category: "Documentos", item: "Reservas de hospedagem/voucher", owner: "Ambos", packed: false },
];
