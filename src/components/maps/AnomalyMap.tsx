'use client';

import dynamic from "next/dynamic";
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { AnomalyZone, RegionKey } from "@/types/dashboard";
import { REGION_KEYS, REGION_META } from "@/constants/regions";

const MapCanvas = dynamic(() => import("./AnomalyMapInner"), {
  ssr: false,
  loading: () => <div style={{ height: "100%", borderRadius: 16, background: "rgba(148,163,184,0.08)" }} />,
});

type Props = {
  zones: AnomalyZone[];
  visibleRegions?: RegionKey[];
};

const AnomalyMap = ({ zones, visibleRegions }: Props) => {
  const activeRegions = visibleRegions ?? REGION_KEYS;
  const filteredZones = zones.filter((zone) => activeRegions.includes(zone.region));

  return (
    <Card
      sx={{
        height: "100%",
        bgcolor: "background.paper",
        border: "1px solid rgba(148,163,184,0.25)",
      }}
    >
      <CardContent sx={{ height: { xs: 340, sm: 380, lg: 440 }, display: "flex", flexDirection: "column", gap: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Карта аномалий</Typography>
          <Chip label={`${filteredZones.length} зон`} size="small" />
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
          <MapCanvas zones={filteredZones} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnomalyMap;

