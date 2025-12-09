import { Box, Card, CardContent, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartDimensions } from "./useChartDimensions";

type RegionKey = "almaty" | "zhambyl" | "turkestan" | "kyzylorda";

export type MultiRegionPoint = {
  date: string;
} & Partial<Record<RegionKey, number>>;

type MultiRegionChartProps = {
  data?: MultiRegionPoint[];
  title?: string;
  unit?: string;
};

const REGION_CONFIG: Record<RegionKey, { label: string; color: string }> = {
  almaty: { label: "Алматы", color: "#d32f2f" },
  zhambyl: { label: "Жамбыл", color: "#1976d2" },
  turkestan: { label: "Туркестан", color: "#388e3c" },
  kyzylorda: { label: "Кызылорда", color: "#ffa000" },
};

export const sampleMultiRegionData: MultiRegionPoint[] = [
  { date: "2025-03-01", almaty: 120, zhambyl: 95, turkestan: 110 },
  { date: "2025-03-02", almaty: 130, zhambyl: 100, turkestan: 118, kyzylorda: 90 },
  { date: "2025-03-03", almaty: 140, zhambyl: 102, turkestan: 125, kyzylorda: 96 },
  { date: "2025-03-04", almaty: 150, zhambyl: 108, turkestan: 127, kyzylorda: 98 },
  { date: "2025-03-05", almaty: 148, zhambyl: 112, turkestan: 133, kyzylorda: 101 },
  { date: "2025-03-06", almaty: 152, zhambyl: 118, turkestan: 136, kyzylorda: 103 },
];

const MultiRegionChart = ({
  data = sampleMultiRegionData,
  title = "Показатели регионов",
  unit = "ед.",
}: MultiRegionChartProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [chartRef] = useChartDimensions<HTMLDivElement>();
  const activeRegions = Object.entries(REGION_CONFIG).filter(([key]) =>
    data.some((point) => typeof point[key as RegionKey] === "number"),
  );

  return (
    <Card
      sx={{
        height: "100%",
        overflow: { xs: "visible", sm: "hidden" },
      }}
    >
      <CardContent sx={{ height: { xs: 220, sm: 300, md: 360 }, p: { xs: 1, sm: 2 } }}>
        <Typography variant="h6" mb={0.5} sx={{ fontSize: { xs: "0.8rem", sm: "1.25rem" } }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2} sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>
          Значения, {unit}
        </Typography>

        <Box ref={chartRef} sx={{ position: "relative", flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => `Дата: ${value}`}
                contentStyle={{
                  padding: isMobile ? "10px 12px" : "12px 14px",
                  borderRadius: isMobile ? 10 : 12,
                }}
                labelStyle={{ fontSize: isMobile ? 12 : undefined }}
                wrapperStyle={
                  isMobile ? { pointerEvents: "none", zIndex: 12000, maxWidth: "calc(100vw - 24px)" } : undefined
                }
                allowEscapeViewBox={isMobile ? { x: false, y: true } : undefined}
                formatter={(value, key) => [
                  `${value} ${unit}`,
                  REGION_CONFIG[key as RegionKey]?.label ?? key,
                ]}
              />
              <Legend />

              {activeRegions.map(([key, config]) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={config.label}
                  stroke={config.color}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5, fill: config.color, stroke: "none" }}
                  isAnimationActive={false}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MultiRegionChart;



