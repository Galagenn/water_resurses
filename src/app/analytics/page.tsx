'use client';

import { useCallback, useMemo, useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import DateRangePicker from "@/components/shared/DateRangePicker";
import RegionSelector from "@/components/shared/RegionSelector";
import IrrigationEfficiencyChart from "@/components/charts/IrrigationEfficiencyChart";
import SeasonalTrendsChart from "@/components/charts/SeasonalTrendsChart";
import RegionPerformanceTable from "@/components/shared/RegionPerformanceTable";
import NotificationsPanel from "@/components/shared/NotificationsPanel";
import { regionPerformance as regionPerformanceBase } from "@/data/analytics";
import { notificationFeed, regions } from "@/data/dashboard";
import {
  generateIrrigationEfficiencyData,
  generateSeasonalTrendsData,
  generateRegionPerformanceData,
} from "@/utils/dataGenerator";
import { REGION_KEYS } from "@/constants/regions";
import type { RegionKey } from "@/types/dashboard";

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [selectedRegions, setSelectedRegions] = useState<RegionKey[]>(REGION_KEYS);

  const handleRegionSelection = useCallback((ids: string[]) => {
    setSelectedRegions(ids.filter((id): id is RegionKey => REGION_KEYS.includes(id as RegionKey)));
  }, []);

  const irrigationEfficiency = useMemo(
    () => generateIrrigationEfficiencyData(selectedPeriod),
    [selectedPeriod]
  );
  const seasonalTrends = useMemo(
    () => generateSeasonalTrendsData(selectedPeriod),
    [selectedPeriod]
  );
  const regionPerformance = useMemo(
    () => generateRegionPerformanceData(regionPerformanceBase, selectedPeriod),
    [selectedPeriod]
  );

  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: 1440, px: { xs: 1.25, sm: 2.5, md: 0 } }}
    >
      <Stack spacing={{ xs: 3, md: 4 }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", lg: "center" }}
          spacing={{ xs: 2, lg: 3 }}
        >
          <Stack spacing={0.5}>
            <Typography variant="subtitle2" color="text.secondary">
              Детальная аналитика
            </Typography>
            <Typography variant="h4">Сценарии орошения и вегетации</Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "flex-end" }}
            width="100%"
            maxWidth={{ xs: "100%", lg: 540 }}
          >
            <DateRangePicker
              defaultPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
            />
            <RegionSelector
              regions={regions}
              selected={selectedRegions}
              onSelectionChange={handleRegionSelection}
            />
            <Button variant="contained" sx={{ minHeight: 44 }}>
              Экспорт CSV
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={{ xs: 2.5, md: 3 }}>
          <IrrigationEfficiencyChart
            data={irrigationEfficiency}
            visibleRegions={selectedRegions}
          />
          <SeasonalTrendsChart
            data={seasonalTrends}
            visibleRegions={selectedRegions}
          />
        </Stack>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 2.5, md: 3 },
            gridTemplateColumns: "1fr",
          }}
        >
          <RegionPerformanceTable rows={regionPerformance} />
        </Box>
      </Stack>
    </Container>
  );
};

export default AnalyticsPage;
