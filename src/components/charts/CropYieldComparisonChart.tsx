'use client';

import { Card, CardContent, Typography } from "@mui/material";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CropYieldPoint } from "@/types/dashboard";

type Props = {
  data: CropYieldPoint[];
};

const CropYieldComparisonChart = ({ data }: Props) => (
  <Card sx={{ height: "100%" }}>
    <CardContent sx={{ height: 360 }}>
      <Typography variant="h6" mb={2}>
        Сравнение урожайности (ц/га)
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
          <XAxis dataKey="crop" />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: "#0f172a" }} />
          <Legend />
          <Bar dataKey="current" name="Текущий сезон" fill="#4ade80" radius={[12, 12, 0, 0]} />
          <Bar dataKey="previous" name="Прошлый сезон" fill="#38bdf8" radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default CropYieldComparisonChart;

