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
import type { RegionKey, RegionSeriesPoint } from "@/types/dashboard";
import { REGION_KEYS, REGION_META } from "@/constants/regions";
import { useChartDimensions } from "./useChartDimensions";

type Props = {
  data: RegionSeriesPoint[];
  visibleRegions?: RegionKey[];
};

const WaterUsageChart = ({ data, visibleRegions }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [chartRef] = useChartDimensions<HTMLDivElement>();
  const activeRegions = visibleRegions ?? REGION_KEYS;

  return (
    <Card
      sx={{
        height: "100%",
        bgcolor: "background.paper",
        border: "1px solid rgba(148,163,184,0.25)",
        overflow: { xs: "visible", sm: "hidden" },
      }}
    >
      <CardContent
        sx={{
          height: { xs: 220, sm: 300, md: 360 },
          display: "flex",
          flexDirection: "column",
          gap: { xs: 0.75, sm: 2 },
          p: { xs: 1, sm: 2 },
          pl: { xs: 1.25, sm: 2.25 },
        }}
      >
        <Typography variant="h6" sx={{ fontSize: { xs: "0.8rem", sm: "1.25rem" } }}>
          Потребление воды (млн м³)
        </Typography>
        <Box ref={chartRef} sx={{ position: "relative", flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 20 }}>
              <CartesianGrid stroke="rgba(148,163,184,0.2)" strokeDasharray="4 4" />
              <XAxis
                dataKey="period"
                tick={{ fill: "#cbd5f5" }}
                label={{ value: "Период", position: "insideBottom", offset: -6, fill: "#cbd5f5" }}
              />
              <YAxis
                tick={{ fill: "#cbd5f5" }}
                label={{ value: "млн м³", angle: -90, position: "insideLeft", fill: "#cbd5f5" }}
              />
              <Tooltip
                labelFormatter={(value) => `Период: ${value}`}
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "rgba(148,163,184,0.4)",
                  color: "#f8fafc",
                  padding: isMobile ? "10px 12px" : "12px 14px",
                  borderRadius: isMobile ? 10 : 12,
                }}
                labelStyle={{ color: "#e2e8f0", fontSize: isMobile ? 12 : undefined }}
                wrapperStyle={
                  isMobile ? { pointerEvents: "none", zIndex: 12000, maxWidth: "calc(100vw - 24px)" } : undefined
                }
                allowEscapeViewBox={isMobile ? { x: false, y: true } : undefined}
                formatter={(value: number | string, key) => {
                  const numericValue = typeof value === "number" ? value : Number(value);
                  const label =
                    typeof key === "string"
                      ? REGION_META[key as keyof typeof REGION_META]?.label ?? key
                      : String(key);
                  return [`${numericValue.toFixed(2)} млн м³`, label];
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 8 }} />

              {activeRegions.map((key) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={REGION_META[key].color}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5, fill: REGION_META[key].color, stroke: "none" }}
                  name={REGION_META[key].label}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WaterUsageChart;



