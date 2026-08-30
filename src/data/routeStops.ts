export interface RouteStop {
  order: number;
  name: string;
  nights: string;
  coords: [number, number];
}

// Coordenadas aproximadas — só para o mapa do roteiro na Visão Geral.
// Ajustar aqui se o roteiro mudar.
export const routeStops: RouteStop[] = [
  { order: 1, name: "El Calafate", nights: "2 noites (+ 1 no retorno)", coords: [-50.3379, -72.2648] },
  { order: 2, name: "El Chaltén", nights: "3 noites", coords: [-49.3311, -72.8859] },
  { order: 3, name: "Puerto Natales", nights: "4 noites", coords: [-51.7236, -72.4875] },
];

// Passeio de um dia a partir de Puerto Natales, sem pernoite — mostrado como
// um ramal pontilhado no mapa, não como parada da rota principal.
export const dayTripStop: RouteStop = {
  order: 0,
  name: "Torres del Paine",
  nights: "day trips a partir de Puerto Natales",
  coords: [-50.9394, -73.0158],
};
