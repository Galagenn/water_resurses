import { Box, Card, CardContent, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { RegionKey, RegionYieldPoint } from "@/types/dashboard";
import { REGION_KEYS, REGION_META } from "@/constants/regions";
import { useChartDimensions } from "./useChartDimensions";

type Props = {
  data: RegionYieldPoint[];
  visibleRegions?: RegionKey[];
};

type TooltipPayload = {
  active?: boolean;
  payload?: Array<{
    value?: number | string;
    payload?: { region: RegionKey };
  }>;
};

type YieldTooltipProps = TooltipPayload & { isMobile?: boolean };

const REGION_FULL_NAMES: Record<RegionKey, string> = {
  almaty: "Алматинская область",
  zhambyl: "Жамбылская область",
  turkestan: "Туркестанская область",
  aktobe: "Актюбинская область",
};

const YieldTooltip = ({ active, payload, isMobile }: YieldTooltipProps) => {
  if (!active || !payload?.length) {
    return null;
  }

  const regionKey = payload[0]?.payload?.region as RegionKey | undefined;
  const numericValue = payload[0]?.value ?? 0;
  const label =
    (regionKey && (REGION_FULL_NAMES[regionKey] ?? REGION_META[regionKey].label)) ?? "Регион";
  const value = typeof numericValue === "number" ? numericValue : Number(numericValue);

  return (
    <Box
      sx={{
        backgroundColor: "#0f172a",
        border: "1px solid rgba(148,163,184,0.4)",
        borderRadius: 1.5,
        px: isMobile ? 1.5 : 2,
        py: isMobile ? 1.25 : 1.5,
      }}
    >
      <Typography variant="body2" sx={{ color: "#f8fafc", fontSize: isMobile ? 12 : undefined }}>
        {`${label}: ${value} ц/га`}
      </Typography>
    </Box>
  );
};

const CropYieldComparisonChart = ({ data, visibleRegions }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [chartRef] = useChartDimensions<HTMLDivElement>();
  const activeRegions = visibleRegions ?? REGION_KEYS;
  const filteredData = data.filter((entry) => activeRegions.includes(entry.region));

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
          height: { xs: 240, sm: 320, md: 380 },
          display: "flex",
          flexDirection: "column",
          gap: { xs: 0.75, sm: 2 },
          p: { xs: 1, sm: 2 },
        }}
      >
        <Typography variant="h6" sx={{ fontSize: { xs: "0.8rem", sm: "1.25rem" } }}>
          Сравнение урожайности (ц/га)
        </Typography>

        <Box ref={chartRef} sx={{ position: "relative", flex: 1, minHeight: 0 }}>
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
                label={{
                  value: "ц/га",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#ffffff", fontSize: 12 },
                }}
              />
              <Tooltip
                content={<YieldTooltip isMobile={isMobile} />}
                allowEscapeViewBox={isMobile ? { x: false, y: true } : undefined}
                wrapperStyle={
                  isMobile ? { pointerEvents: "none", zIndex: 12000, maxWidth: "calc(100vw - 24px)" } : undefined
                }
              />
              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {filteredData.map((entry) => (
                  <Cell key={entry.region} fill={REGION_META[entry.region].color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
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



