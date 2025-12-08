'use client';

import "leaflet/dist/leaflet.css";

import { memo, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, GeoJSON } from "react-leaflet";
import type { Feature, Geometry } from "geojson";
import type { PathOptions } from "leaflet";
import type {
  AnomalyZone,
  MapFeatureCollection,
  MapFeatureProperties,
} from "@/types/dashboard";
import { REGION_META } from "@/constants/regions";

type Props = {
  zones: AnomalyZone[];
  layers: {
    crops: MapFeatureCollection;
    irrigation: MapFeatureCollection;
    anomalies: MapFeatureCollection;
  };
  activeLayers: Record<"crops" | "irrigation" | "anomalies", boolean>;
};

const collectCoords = (feature: Feature<Geometry, MapFeatureProperties>) => {
  const coords: [number, number][] = [];
  if (!feature.geometry) return coords;

  const pushCoords = (points: number[][]) => {
    points.forEach(([lng, lat]) => coords.push([lat, lng]));
  };

  if (feature.geometry.type === "Polygon") {
    feature.geometry.coordinates.forEach((ring) => pushCoords(ring));
  }

  if (feature.geometry.type === "MultiPolygon") {
    feature.geometry.coordinates.forEach((poly) => poly.forEach((ring) => pushCoords(ring)));
  }

  return coords;
};

const getFeatureColor = (feature: Feature<Geometry, MapFeatureProperties>, fallback: string) => {
  const { fill, severity } = feature.properties || {};
  if (fill) return fill;
  if (severity === "critical") return "#E53935";
  if (severity === "warning") return "#FB8C00";
  return fallback;
};

const buildPopupContent = (props: MapFeatureProperties) => {
  const lines = [
    props.name,
    props.crop,
    props.irrigationType,
    props.issue,
    props.forecast,
    props.note,
  ].filter(Boolean);

  return lines.join(" • ");
};

const AnomalyMapInner = ({ zones, layers, activeLayers }: Props) => {
  const mapPoints = useMemo(() => {
    const points: [number, number][] = [];
    const enabledCollections: MapFeatureCollection[] = [];
    if (activeLayers.crops) enabledCollections.push(layers.crops);
    if (activeLayers.irrigation) enabledCollections.push(layers.irrigation);
    if (activeLayers.anomalies) enabledCollections.push(layers.anomalies);

    enabledCollections.forEach((collection) =>
      collection.features.forEach((feature) => {
        points.push(...collectCoords(feature));
      })
    );

    if (activeLayers.anomalies) {
      zones.forEach((zone) => points.push([zone.lat, zone.lng]));
    }

    return points;
  }, [activeLayers, layers, zones]);

  const center = useMemo(() => {
    if (!mapPoints.length) {
      return { lat: 43.22, lng: 76.85 };
    }
    const avgLat = mapPoints.reduce((sum, [lat]) => sum + lat, 0) / mapPoints.length;
    const avgLng = mapPoints.reduce((sum, [, lng]) => sum + lng, 0) / mapPoints.length;
    return { lat: avgLat, lng: avgLng };
  }, [mapPoints]);

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

      {activeLayers.crops && (
        <GeoJSON
          data={layers.crops}
          style={(feature) =>
            ({
              color: getFeatureColor(feature as any, "#66BB6A"),
              weight: 1.5,
              fillColor: getFeatureColor(feature as any, "#66BB6A"),
              fillOpacity: 0.25,
            }) satisfies PathOptions
          }
          onEachFeature={(feature, layer) => {
            const content = buildPopupContent(feature.properties || {});
            if (content) layer.bindPopup(content);
          }}
        />
      )}

      {activeLayers.irrigation && (
        <GeoJSON
          data={layers.irrigation}
          style={(feature) =>
            ({
              color: getFeatureColor(feature as any, "#039BE5"),
              weight: 1.5,
              fillColor: getFeatureColor(feature as any, "#039BE5"),
              dashArray: "4 2",
              fillOpacity: 0.2,
            }) satisfies PathOptions
          }
          onEachFeature={(feature, layer) => {
            const content = buildPopupContent(feature.properties || {});
            if (content) layer.bindPopup(content);
          }}
        />
      )}

      {activeLayers.anomalies && (
        <>
          <GeoJSON
            data={layers.anomalies}
            style={(feature) =>
              ({
                color: getFeatureColor(feature as any, "#F57C00"),
                weight: 2,
                fillColor: getFeatureColor(feature as any, "#F57C00"),
                fillOpacity: 0.35,
              }) satisfies PathOptions
            }
            onEachFeature={(feature, layer) => {
              const content = buildPopupContent(feature.properties || {});
              if (content) layer.bindPopup(content);
            }}
          />

          {zones.map((zone) => {
            const regionColor = REGION_META[zone.region].color;

            return (
              <CircleMarker
                key={zone.id}
                center={[zone.lat, zone.lng]}
                radius={14}
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
        </>
      )}
    </MapContainer>
  );
};

export default memo(AnomalyMapInner);

