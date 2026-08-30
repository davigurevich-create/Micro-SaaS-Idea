"use client";

import "leaflet/dist/leaflet.css";
import { DivIcon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { routeStops, dayTripStop } from "@/data/routeStops";

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

function dayTripIcon() {
  return new DivIcon({
    html: `<div style="
      width:16px;height:16px;border-radius:9999px;
      background:#f97316;
      border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4);
    "></div>`,
    className: "",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

export default function RouteMap() {
  const loopPath = [...routeStops.map((s) => s.coords), routeStops[0].coords] as [
    number,
    number,
  ][];
  const spurPath = [routeStops[2].coords, dayTripStop.coords] as [number, number][];
  const center = routeStops[1].coords as [number, number];

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
      <Polyline positions={loopPath} pathOptions={{ color: "#171717", weight: 3 }} />
      <Polyline
        positions={spurPath}
        pathOptions={{ color: "#f97316", weight: 2, dashArray: "6 6" }}
      />
      {routeStops.map((stop) => (
        <Marker key={stop.name} position={stop.coords} icon={numberedIcon(stop.order)}>
          <Popup>
            <strong>{stop.name}</strong>
            <br />
            {stop.nights}
          </Popup>
        </Marker>
      ))}
      <Marker position={dayTripStop.coords} icon={dayTripIcon()}>
        <Popup>
          <strong>{dayTripStop.name}</strong>
          <br />
          {dayTripStop.nights}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
