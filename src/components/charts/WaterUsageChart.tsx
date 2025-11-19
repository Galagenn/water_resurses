'use client';

import { Card, CardContent, Typography } from "@mui/material";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimeSeriesPoint } from "@/types/dashboard";

type Props = {
  data: TimeSeriesPoint[];
};

const WaterUsageChart = ({ data }: Props) => (
  <Card sx={{ height: "100%" }}>
    <CardContent sx={{ height: { xs: 260, sm: 300, md: 360 } }}>
      <Typography variant="h6" mb={2}>
        Потребление воды (млн м³)
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(74,222,128,0.6)" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#4ade80"
            strokeWidth={2}
            fill="url(#waterGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default WaterUsageChart;

