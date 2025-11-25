'use client';

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { RegionKey, RegionYieldPoint } from "@/types/dashboard";
import { REGION_KEYS, REGION_META } from "@/constants/regions";

type Props = {
  data: RegionYieldPoint[];
  visibleRegions?: RegionKey[];
};

const CropYieldComparisonChart = ({ data, visibleRegions }: Props) => {
  const activeRegions = visibleRegions ?? REGION_KEYS;
  const filteredData = data.filter((entry) => activeRegions.includes(entry.region));

  return (
    <Card
      sx={{
        height: "100%",
        bgcolor: "background.paper",
        border: "1px solid rgba(148,163,184,0.25)",
      }}
    >
      <CardContent sx={{ height: { xs: 300, sm: 340, md: 380 }, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6">Сравнение урожайности (ц/га)</Typography>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData} margin={{ top: 16, right: 16, left: 8, bottom: 12 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="rgba(148,163,184,0.2)" />
            <XAxis
              dataKey="region"
              tickFormatter={(key) => REGION_META[key as keyof typeof REGION_META]?.label ?? key}
              tick={{ fill: "#cbd5f5" }}
              label={{ value: "Регион", position: "insideBottom", offset: -6, fill: "#cbd5f5" }}
            />
            <YAxis
              tick={{ fill: "#cbd5f5" }}
              label={{ value: "ц/га", angle: -90, position: "insideLeft", fill: "#cbd5f5" }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f172a", borderColor: "rgba(148,163,184,0.4)", color: "#f8fafc" }}
              labelStyle={{ color: "#e2e8f0" }}
              formatter={(value: number | string, _key, payload) => {
                const regionKey = payload?.payload?.region as keyof typeof REGION_META | undefined;
                const label = regionKey ? REGION_META[regionKey].label : "Регион";
                const numericValue = typeof value === "number" ? value : Number(value);
                return [`${numericValue} ц/га`, label];
              }}
            />
            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {filteredData.map((entry) => (
                <Cell key={entry.region} fill={REGION_META[entry.region].color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {activeRegions.length > 0 && (
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {activeRegions.map((key) => (
              <Stack key={key} direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: 4,
                    bgcolor: REGION_META[key].color,
                    boxShadow: "0 0 0 1px rgba(15,23,42,0.3)",
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {REGION_META[key].label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default CropYieldComparisonChart;

