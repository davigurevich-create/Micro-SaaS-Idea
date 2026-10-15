"use client";

import "leaflet/dist/leaflet.css";
import { DivIcon } from "leaflet";
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

// Agrupa dias consecutivos no mesmo local em uma única parada (com a
// contagem de noites), na ordem em que aparecem no itinerário real.
function stopsFromItinerary(days: ItineraryDay[]): RouteStop[] {
  const stops: RouteStop[] = [];

  for (const day of days) {
    const last = stops[stops.length - 1];
    if (last && last.name === day.location) {
      last.nights += 1;
      continue;
    }
    const coords = lookupCoords(day.location);
    if (!coords) continue;
    stops.push({
      order: stops.length + 1,
      name: day.location,
      nights: 1,
      coords,
    });
  }

  // re-numera ignorando paradas sem coordenadas conhecidas
  return stops.map((s, i) => ({ ...s, order: i + 1 }));
}

export default function RouteMap({ itinerary }: { itinerary: ItineraryDay[] }) {
  const stops = stopsFromItinerary(itinerary);

  if (stops.length === 0) {
    return (
      <div className="h-80 sm:h-[420px] w-full rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center text-sm text-black/50 dark:text-white/50 text-center px-6">
        Nenhum local do itinerário tem coordenadas conhecidas ainda. Confira
        os nomes das cidades em /itinerario ou adicione-os em
        src/data/locationCoords.ts.
      </div>
    );
  }

  const loopPath = stops.map((s) => s.coords);
  const center = stops[Math.floor(stops.length / 2)].coords;

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={false}
      className="h-80 sm:h-[420px] w-full rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {loopPath.length > 1 && (
        <Polyline positions={loopPath} pathOptions={{ color: "#171717", weight: 3 }} />
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
