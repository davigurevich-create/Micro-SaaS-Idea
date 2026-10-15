// Coordenadas conhecidas de destinos comuns na Patagônia, usadas para
// desenhar o Mapa do Roteiro a partir do itinerário real (cadastrado em
// /itinerario). O nome do local no itinerário é texto livre, então a busca
// abaixo normaliza (minúsculas, sem acento) pra casar com variações comuns.
// Adicionem aqui se usarem um nome de cidade que não esteja na lista.
export const knownLocationCoords: Record<string, [number, number]> = {
  "el calafate": [-50.3379, -72.2648],
  "el chalten": [-49.3311, -72.8859],
  "puerto natales": [-51.7236, -72.4875],
  "torres del paine": [-50.9394, -73.0158],
  "parque nacional torres del paine": [-50.9394, -73.0158],
  "ushuaia": [-54.8019, -68.303],
  "punta arenas": [-53.1638, -70.9171],
  "rio gallegos": [-51.6226, -69.2181],
  "bariloche": [-41.1335, -71.3103],
  "san carlos de bariloche": [-41.1335, -71.3103],
  "santiago": [-33.4489, -70.6693],
  "buenos aires": [-34.6037, -58.3816],
  "sao paulo": [-23.5505, -46.6333],
  "puerto varas": [-41.3195, -72.9854],
  "coyhaique": [-45.5752, -72.0662],
};

function normalize(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function lookupCoords(name: string): [number, number] | null {
  return knownLocationCoords[normalize(name)] ?? null;
}
