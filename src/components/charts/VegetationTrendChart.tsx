import { Fragment } from "react";
import { Box, Card, CardContent, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
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
import type { RegionKey, RegionVegetationPoint } from "@/types/dashboard";
import { REGION_KEYS, REGION_META } from "@/constants/regions";
import { useChartDimensions } from "./useChartDimensions";

type Props = {
  data: RegionVegetationPoint[];
  visibleRegions?: RegionKey[];
};

const VegetationTrendChart = ({ data, visibleRegions }: Props) => {
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
          height: { xs: 260, sm: 340, md: 380 },
          display: "flex",
          flexDirection: "column",
          gap: { xs: 0.75, sm: 1.5 },
          p: { xs: 1, sm: 2 },
        }}
      >
        <Typography variant="h6" sx={{ fontSize: { xs: "0.8rem", sm: "1.25rem" } }}>
          Индексы вегетации (NDVI / EVI)
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
                domain={[0.4, 0.85]}
                tick={{ fill: "#cbd5f5" }}
                label={{ value: "Индекс", angle: -90, position: "insideLeft", fill: "#cbd5f5" }}
              />
              <Tooltip
                wrapperStyle={
                  isMobile
                    ? { pointerEvents: "none", zIndex: 12000, maxWidth: "calc(100vw - 24px)" }
                    : { zIndex: 4000 }
                }
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "rgba(148,163,184,0.4)",
                  color: "#f8fafc",
                  padding: isMobile ? "10px 12px" : "12px 14px",
                  borderRadius: isMobile ? 10 : 12,
                }}
                labelStyle={{ color: "#e2e8f0", fontSize: isMobile ? 12 : undefined }}
                allowEscapeViewBox={isMobile ? { x: false, y: true } : undefined}
                formatter={(value: number | string, key) => {
                  if (typeof key !== "string") {
                    return [value, ""];
                  }
                  const [regionKey] = key.split(/Ndvi|Evi/);
                  const metric = key.endsWith("Ndvi") ? "NDVI" : "EVI";
                  const regionLabel = REGION_META[regionKey as keyof typeof REGION_META]?.label ?? regionKey;
                  const numericValue = typeof value === "number" ? value : Number(value);
                  return [`${numericValue.toFixed(2)} (${metric})`, regionLabel];
                }}
              />
              {!isMobile && <Legend wrapperStyle={{ paddingTop: 8 }} />}

              {activeRegions.map((key) => (
                <Fragment key={key}>
                  <Line
                    type="monotone"
                    dataKey={`${key}Ndvi`}
                    stroke={REGION_META[key].color}
                    strokeWidth={2.5}
                    dot={false}
                    name={`${REGION_META[key].label} NDVI`}
                  />
                  <Line
                    type="monotone"
                    dataKey={`${key}Evi`}
                    stroke={REGION_META[key].color}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name={`${REGION_META[key].label} EVI`}
                  />
                </Fragment>
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Stack spacing={0.75} mt={0.5}>
          <Typography variant="caption" color="text.secondary">
            Сплошная линия — NDVI, пунктир — EVI
          </Typography>
          {isMobile && (
            <Stack direction="row" spacing={1.5} flexWrap="wrap">
              {activeRegions.map((region) => (
                <Stack key={region} direction="row" spacing={0.75} alignItems="center">
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: REGION_META[region].color,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {REGION_META[region].label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VegetationTrendChart;



