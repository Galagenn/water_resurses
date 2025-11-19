'use client';

import { Box, Container, Stack, Typography, useMediaQuery } from "@mui/material";
import StatCard from "@/components/shared/StatCard";
import DateRangePicker from "@/components/shared/DateRangePicker";
import RegionSelector from "@/components/shared/RegionSelector";
import WaterUsageChart from "@/components/charts/WaterUsageChart";
import VegetationTrendChart from "@/components/charts/VegetationTrendChart";
import CropYieldComparisonChart from "@/components/charts/CropYieldComparisonChart";
import ForecastPanel from "@/components/shared/ForecastPanel";
import AlertsList from "@/components/shared/AlertsList";
import RegionPerformanceTable from "@/components/shared/RegionPerformanceTable";
import NotificationsPanel from "@/components/shared/NotificationsPanel";
import AnomalyMap from "@/components/maps/AnomalyMap";
import {
  summaryCards,
  waterUsageSeries,
  vegetationSeries,
  cropYieldSeries,
  forecastSummary,
  alerts,
  anomalyZones,
  regions,
  notificationFeed,
} from "@/data/dashboard";
import { regionPerformance } from "@/data/analytics";

export default function DashboardPage() {
  const isCompact = useMediaQuery("(max-width:708px)");
  const containerPadding = isCompact ? 1.25 : 2;
  const sectionGap = { xs: 2.5, md: 3 };

  return (
    <Container
      maxWidth="lg"
      sx={{
        width: "100%",
        px: { xs: containerPadding, sm: 2.5, md: 0 },
      }}
    >
      <Stack spacing={{ xs: 3, md: 4 }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", lg: "center" }}
          spacing={{ xs: 2.5, lg: 4 }}
        >
          <Stack spacing={0.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Интерактивный мониторинг
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "1.875rem", md: "2.25rem" }, lineHeight: 1.2 }}
            >
              Дашборд ИИ-агента
            </Typography>
          </Stack>
          <Box
            sx={{
              width: "100%",
              borderRadius: 3,
              border: "1px solid rgba(148,163,184,0.2)",
              bgcolor: "rgba(15,23,42,0.75)",
              p: { xs: 2, sm: 2.5 },
              boxShadow: { xs: "0 15px 40px rgba(2,6,23,0.45)", sm: "none" },
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 2.5 }}
              alignItems={{ xs: "stretch", sm: "flex-end" }}
            >
              <Box sx={{ flex: 1 }}>
                <DateRangePicker />
              </Box>
              <Box sx={{ flex: 1 }}>
                <RegionSelector regions={regions} />
              </Box>
            </Stack>
          </Box>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gap: sectionGap,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
          }}
        >
          {summaryCards.map((card) => (
            <Box key={card.id} sx={{ minWidth: 0 }}>
              <StatCard card={card} />
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: sectionGap,
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <WaterUsageChart data={waterUsageSeries} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <VegetationTrendChart data={vegetationSeries} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: sectionGap,
            gridTemplateColumns: {
              xs: "1fr",
              lg: "minmax(0, 5fr) minmax(0, 7fr)",
            },
            gridTemplateAreas: {
              xs: `"map" "chart"`,
              lg: `"chart map"`,
            },
          }}
        >
          <Box sx={{ gridArea: "map", minWidth: 0 }}>
            <AnomalyMap zones={anomalyZones} />
          </Box>
          <Box sx={{ gridArea: "chart", minWidth: 0 }}>
            <CropYieldComparisonChart data={cropYieldSeries} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: sectionGap,
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <ForecastPanel items={forecastSummary} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <AlertsList alerts={alerts} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: sectionGap,
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <RegionPerformanceTable rows={regionPerformance} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <NotificationsPanel feed={notificationFeed} />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
