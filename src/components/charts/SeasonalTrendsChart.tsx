'use client';

import { Card, CardContent, Typography } from "@mui/material";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SeasonalTrendPoint, RegionKey } from "@/types/dashboard";
import { REGION_KEYS, REGION_META } from "@/constants/regions";

type Props = {
  data: SeasonalTrendPoint[];
  visibleRegions?: RegionKey[];
};

const SeasonalTrendsChart = ({ data, visibleRegions }: Props) => {
  const activeRegions = visibleRegions ?? REGION_KEYS;

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
          height: { xs: 220, sm: 300, md: 380 },
          display: "flex",
          flexDirection: "column",
          gap: { xs: 0.75, sm: 2 },
          p: { xs: 1, sm: 2 },
        }}
      >
        <Typography variant="h6" sx={{ fontSize: { xs: "0.8rem", sm: "1.25rem" } }}>Сезонная динамика NDVI по регионам</Typography>
      <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 16, right: 16, left: 0, bottom: 20 }}
          >
            <CartesianGrid stroke="rgba(148,163,184,0.2)" strokeDasharray="4 4" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#cbd5f5" }}
              label={{
                value: "Период",
                position: "insideBottom",
                offset: -6,
                fill: "#cbd5f5",
              }}
            />
            <YAxis
              domain={[0.4, 0.9]}
              tick={{ fill: "#cbd5f5" }}
              label={{
                value: "NDVI",
                angle: -90,
                position: "insideLeft",
                fill: "#cbd5f5",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "rgba(148,163,184,0.4)",
                color: "#f8fafc",
              }}
              labelStyle={{ color: "#e2e8f0" }}
              formatter={(value: number | string, key) => {
                const numericValue = typeof value === "number" ? value : Number(value);
                const label =
                  typeof key === "string"
                    ? REGION_META[key as keyof typeof REGION_META]?.label ?? key
                    : String(key);
                return [`${numericValue.toFixed(2)}`, label];
              }}
          />
            <Legend wrapperStyle={{ paddingTop: 8 }} />

            {activeRegions.map((key) => (
          <Area
                key={key}
            type="monotone"
                dataKey={key}
                name={REGION_META[key].label}
                stroke={REGION_META[key].color}
                strokeWidth={2.5}
                fill={REGION_META[key].color}
                fillOpacity={0.12}
                dot={false}
                isAnimationActive={false}
              />
            ))}
        </AreaChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
};

export default SeasonalTrendsChart;

