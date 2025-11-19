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
import type { SeasonalTrendPoint } from "@/types/dashboard";

type Props = {
  data: SeasonalTrendPoint[];
};

const SeasonalTrendsChart = ({ data }: Props) => (
  <Card sx={{ height: "100%" }}>
    <CardContent sx={{ height: { xs: 280, sm: 320, md: 380 } }}>
      <Typography variant="h6" mb={2}>
        Сезонная динамика NDVI
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="northGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="southGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f472b6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="eastGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
          <XAxis dataKey="month" />
          <YAxis domain={[0.4, 0.9]} />
          <Tooltip contentStyle={{ backgroundColor: "#0f172a" }} />
          <Legend />
          <Area
            type="monotone"
            dataKey="regionNorth"
            name="Север"
            stroke="#38bdf8"
            fill="url(#northGradient)"
          />
          <Area
            type="monotone"
            dataKey="regionSouth"
            name="Юг"
            stroke="#f472b6"
            fill="url(#southGradient)"
          />
          <Area
            type="monotone"
            dataKey="regionEast"
            name="Восток"
            stroke="#22c55e"
            fill="url(#eastGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default SeasonalTrendsChart;

