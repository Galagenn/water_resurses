'use client';

import { useState, useMemo, useCallback } from "react";
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
  alerts,
  anomalyZones,
  regions,
  notificationFeed,
} from "@/data/dashboard";
import { regionPerformance } from "@/data/analytics";
import { REGION_KEYS } from "@/constants/regions";
import type { RegionKey } from "@/types/dashboard";
import {
  generateSummaryCards,
  generateWaterUsageData,
  generateVegetationData,
  generateCropYieldData,
  generateForecastData,
  filterAlertsByPeriod,
  filterAnomaliesByPeriod,
} from "@/utils/dataGenerator";

export default function DashboardPage() {
  const isCompact = useMediaQuery("(max-width:708px)");
  const containerPadding = isCompact ? 1.25 : 2;
  const sectionGap = { xs: 2.5, md: 3 };
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [selectedRegions, setSelectedRegions] = useState<RegionKey[]>(REGION_KEYS);

  const handleRegionSelection = useCallback((ids: string[]) => {
    setSelectedRegions(ids.filter((id): id is RegionKey => REGION_KEYS.includes(id as RegionKey)));
  }, []);

  const summaryCards = useMemo(
    () => generateSummaryCards(selectedPeriod, selectedRegions),
    [selectedPeriod, selectedRegions]
  );
  const waterUsageSeries = useMemo(() => generateWaterUsageData(selectedPeriod), [selectedPeriod]);
  const vegetationSeries = useMemo(() => generateVegetationData(selectedPeriod), [selectedPeriod]);
  const cropYieldSeries = useMemo(() => generateCropYieldData(selectedPeriod), [selectedPeriod]);
  const forecastSummary = useMemo(() => generateForecastData(selectedPeriod), [selectedPeriod]);
  const filteredAlerts = useMemo(() => filterAlertsByPeriod(alerts, selectedPeriod), [selectedPeriod]);
  const filteredAnomalies = useMemo(() => filterAnomaliesByPeriod(anomalyZones, selectedPeriod), [selectedPeriod]);

  return (
    <Container
      maxWidth={false}
      sx={{
        width: "100%",
        maxWidth: 1440,
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
              borderRadius: 2,
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
                <DateRangePicker 
                  defaultPeriod={selectedPeriod}
                  onPeriodChange={setSelectedPeriod}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <RegionSelector
                  regions={regions}
                  selected={selectedRegions}
                  onSelectionChange={handleRegionSelection}
                />
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

        <Box sx={{ minWidth: 0 }}>
          <WaterUsageChart data={waterUsageSeries} visibleRegions={selectedRegions} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <VegetationTrendChart data={vegetationSeries} visibleRegions={selectedRegions} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <AnomalyMap zones={filteredAnomalies} visibleRegions={selectedRegions} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <CropYieldComparisonChart data={cropYieldSeries} visibleRegions={selectedRegions} />
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
            <AlertsList alerts={filteredAlerts} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: sectionGap,
            gridTemplateColumns: "1fr",
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <RegionPerformanceTable rows={regionPerformance} />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}