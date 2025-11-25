'use client';

import "leaflet/dist/leaflet.css";

import { memo, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import type { AnomalyZone } from "@/types/dashboard";
import { REGION_META } from "@/constants/regions";

type Props = {
  zones: AnomalyZone[];
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
      {zones.map((zone) => {
        const regionColor = REGION_META[zone.region].color;

        return (
          <CircleMarker
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={18}
            pathOptions={{
              color: regionColor,
              weight: 3,
              fillColor: regionColor,
              fillOpacity: 0.35,
            }}
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
        );
      })}
    </MapContainer>
  );
};

export default memo(AnomalyMapInner);

