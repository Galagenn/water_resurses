'use client';

import "leaflet/dist/leaflet.css";

import { memo, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import type { AnomalyZone } from "@/types/dashboard";

type Props = {
  zones: AnomalyZone[];
};

const severityColor: Record<AnomalyZone["severity"], string> = {
  warning: "#f97316",
  critical: "#ef4444",
};

const AnomalyMapInner = ({ zones }: Props) => {
  const center = useMemo(() => {
    if (zones.length === 0) {
      return { lat: 43.22, lng: 76.85 };
    }
    const avgLat = zones.reduce((sum, zone) => sum + zone.lat, 0) / zones.length;
    const avgLng = zones.reduce((sum, zone) => sum + zone.lng, 0) / zones.length;
    return { lat: avgLat, lng: avgLng };
  }, [zones]);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={6}
      style={{ height: "100%", borderRadius: 16 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {zones.map((zone) => (
        <CircleMarker
          key={zone.id}
          center={[zone.lat, zone.lng]}
          radius={18}
          pathOptions={{ color: severityColor[zone.severity], weight: 2, fillOpacity: 0.4 }}
        >
          <Popup>
            <strong>{zone.fieldName}</strong>
            <br />
            {zone.crop}
            <br />
            {zone.issue}
            <br />
            {zone.forecast}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default memo(AnomalyMapInner);

