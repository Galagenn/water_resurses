'use client';

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import type { AnomalyZone, MapFeatureCollection, RegionKey } from "@/types/dashboard";
import { REGION_KEYS, REGION_META } from "@/constants/regions";
import { anomalyPolygons, cropAreas, irrigatedAreas } from "@/data/maps";

const MapCanvas = dynamic(() => import("./AnomalyMapInner"), {
  ssr: false,
  loading: () => <div style={{ height: "100%", borderRadius: 16, background: "rgba(148,163,184,0.08)" }} />,
});

type Props = {
  zones: AnomalyZone[];
  visibleRegions?: RegionKey[];
};

type LayerKey = "crops" | "irrigation" | "anomalies";

const DEFAULT_LAYERS: LayerKey[] = ["crops", "irrigation", "anomalies"];

const filterByRegions = (collection: MapFeatureCollection, regions: RegionKey[]) => ({
  ...collection,
  features: collection.features.filter((feature) => {
    const region = feature.properties?.region as RegionKey | undefined;
    return !region || regions.includes(region);
  }),
});

const AnomalyMap = ({ zones, visibleRegions }: Props) => {
  const [enabledLayers, setEnabledLayers] = useState<LayerKey[]>(DEFAULT_LAYERS);
  const activeRegions = visibleRegions ?? REGION_KEYS;
  const filteredZones = useMemo(
    () => zones.filter((zone) => activeRegions.includes(zone.region)),
    [zones, activeRegions]
  );

  const filteredLayers = useMemo(
    () => ({
      crops: filterByRegions(cropAreas, activeRegions),
      irrigation: filterByRegions(irrigatedAreas, activeRegions),
      anomalies: filterByRegions(anomalyPolygons, activeRegions),
    }),
    [activeRegions]
  );

  const activeLayerState = useMemo(
    () => ({
      crops: enabledLayers.includes("crops"),
      irrigation: enabledLayers.includes("irrigation"),
      anomalies: enabledLayers.includes("anomalies"),
    }),
    [enabledLayers]
  );

  return (
    <Card
      sx={{
        height: "100%",
        bgcolor: "background.paper",
        border: "1px solid rgba(148,163,184,0.25)",
      }}
    >
      <CardContent
        sx={{
          height: { xs: 340, sm: 420, lg: 460 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6">ГИС-модуль</Typography>
            <Chip label={`${filteredZones.length} зон риска`} size="small" />
          </Stack>
          <Tooltip title="Включите нужные слои: посевы, орошение и аномалии">
            <ToggleButtonGroup
              size="small"
              value={enabledLayers}
              onChange={(_, value: LayerKey[]) => value.length && setEnabledLayers(value)}
              aria-label="Переключение слоёв карты"
            >
              <ToggleButton value="crops">Посевы</ToggleButton>
              <ToggleButton value="irrigation">Орошаемые земли</ToggleButton>
              <ToggleButton value="anomalies">Аномалии</ToggleButton>
            </ToggleButtonGroup>
          </Tooltip>
        </Stack>

        <Stack direction="row" flexWrap="wrap" gap={1.5}>
          {activeRegions.map((key) => (
            <Stack key={key} direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: REGION_META[key].color,
                  boxShadow: "0 0 0 2px rgba(15,23,42,0.08)",
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {REGION_META[key].label}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Box sx={{ flex: 1, minHeight: 0 }}>
          <MapCanvas
            zones={filteredZones}
            layers={filteredLayers}
            activeLayers={activeLayerState}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnomalyMap;

