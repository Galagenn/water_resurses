'use client';

import { Card, CardContent, Typography } from "@mui/material";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import type { VegetationSeriesPoint } from "@/types/dashboard";

type Props = {
  data: VegetationSeriesPoint[];
};

const VegetationTrendChart = ({ data }: Props) => (
  <Card sx={{ height: "100%" }}>
    <CardContent sx={{ height: { xs: 260, sm: 300, md: 360 } }}>
      <Typography variant="h6" mb={2}>
        Индексы вегетации (NDVI / EVI)
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
          <XAxis dataKey="period" />
          <YAxis domain={[0.4, 0.85]} />
          <Tooltip contentStyle={{ backgroundColor: "#0f172a" }} />
          <Legend />
          <Line type="monotone" dataKey="ndvi" stroke="#5eead4" strokeWidth={2} name="NDVI" dot />
          <Line type="monotone" dataKey="evi" stroke="#f472b6" strokeWidth={2} name="EVI" dot />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default VegetationTrendChart;

