'use client';

import { Card, CardContent, Typography } from "@mui/material";
import {
  ComposedChart,
  Bar,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import type { IrrigationEfficiencyPoint } from "@/types/dashboard";

type Props = {
  data: IrrigationEfficiencyPoint[];
};

const IrrigationEfficiencyChart = ({ data }: Props) => (
  <Card sx={{ height: "100%" }}>
    <CardContent sx={{ height: 380 }}>
      <Typography variant="h6" mb={2}>
        Эффективность орошения
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
          <XAxis dataKey="period" />
          <YAxis yAxisId="left" label={{ value: "м³", angle: -90, position: "insideLeft" }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[50, 100]}
            label={{ value: "%", angle: 90, position: "insideRight" }}
          />
          <Tooltip contentStyle={{ backgroundColor: "#0f172a" }} />
          <Legend />
          <Bar
            dataKey="consumption"
            fill="#fbbf24"
            name="Расход воды"
            radius={[10, 10, 0, 0]}
            yAxisId="left"
          />
          <Line
            type="monotone"
            dataKey="efficiency"
            stroke="#4ade80"
            strokeWidth={2}
            dot
            name="Эффективность"
            yAxisId="right"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default IrrigationEfficiencyChart;

