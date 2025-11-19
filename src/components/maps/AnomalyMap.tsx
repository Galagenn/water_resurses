'use client';

import dynamic from "next/dynamic";
import { Card, CardContent, Stack, Typography, Chip } from "@mui/material";
import type { AnomalyZone } from "@/types/dashboard";

const MapCanvas = dynamic(() => import("./AnomalyMapInner"), { ssr: false, loading: () => <div style={{height: 360}} /> });

type Props = {
  zones: AnomalyZone[];
};

const AnomalyMap = ({ zones }: Props) => (
  <Card sx={{ height: "100%" }}>
    <CardContent sx={{ height: 420 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Карта аномалий</Typography>
        <Chip label={`${zones.length} зон`} size="small" />
      </Stack>
      <MapCanvas zones={zones} />
    </CardContent>
  </Card>
);

export default AnomalyMap;

