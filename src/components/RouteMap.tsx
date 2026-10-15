"use client";

import "leaflet/dist/leaflet.css";
import { DivIcon } from "leaflet";
import { LatLngBounds } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { lookupCoords } from "@/data/locationCoords";
import { ItineraryDay } from "@/lib/types";

interface RouteStop {
  order: number;
  name: string;
  nights: number;
  coords: [number, number];
}

function numberedIcon(n: number) {
  return new DivIcon({
    html: `<div style="
      width:28px;height:28px;border-radius:9999px;
      background:#171717;color:#fff;
      display:flex;align-items:center;justify-content:center;
      font:600 13px system-ui, sans-serif;
      border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4);
    ">${n}</div>`,
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

// Um marcador por cidade (mesmo quando ela é visitada mais de uma vez em
// momentos não seguidos, como voo de entrada/saída por Punta Arenas ou uma
// volta a Puerto Natales) — somando as noites de todas as passagens e
// numerando pela ordem da primeira visita. A linha da rota, separada, segue
// o trajeto real dia a dia, incluindo idas e vindas.
function stopsFromItinerary(days: ItineraryDay[]): {
  stops: RouteStop[];
  routePath: [number, number][];
} {
  const stops: RouteStop[] = [];
  const byName = new Map<string, RouteStop>();
  const routePath: [number, number][] = [];

  for (const day of days) {
    const coords = lookupCoords(day.location);
    if (!coords) continue;

    routePath.push(coords);

    const existing = byName.get(day.location);
    if (existing) {
      existing.nights += 1;
      continue;
    }
    const stop: RouteStop = {
      order: stops.length + 1,
      name: day.location,
      nights: 1,
      coords,
    };
    stops.push(stop);
    byName.set(day.location, stop);
  }

  return { stops, routePath };
}

export default function RouteMap({ itinerary }: { itinerary: ItineraryDay[] }) {
  const { stops, routePath } = stopsFromItinerary(itinerary);

  if (stops.length === 0) {
    return (
      <div className="h-80 sm:h-[420px] w-full rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center text-sm text-black/50 dark:text-white/50 text-center px-6">
        Nenhum local do itinerário tem coordenadas conhecidas ainda. Confira
        os nomes das cidades em /itinerario ou adicione-os em
        src/data/locationCoords.ts.
      </div>
    );
  }

  const bounds = new LatLngBounds(stops.map((s) => s.coords));

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [32, 32] }}
      scrollWheelZoom={false}
      className="h-80 sm:h-[420px] w-full rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {routePath.length > 1 && (
        <Polyline positions={routePath} pathOptions={{ color: "#171717", weight: 3 }} />
      )}
      {stops.map((stop) => (
        <Marker key={`${stop.order}-${stop.name}`} position={stop.coords} icon={numberedIcon(stop.order)}>
          <Popup>
            <strong>{stop.name}</strong>
            <br />
            {stop.nights} {stop.nights === 1 ? "noite" : "noites"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
