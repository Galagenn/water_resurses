'use client';

import { useCallback, useMemo, useState } from "react";
import { Box, Button, Container, Stack, Typography, Snackbar, Alert } from "@mui/material";
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
import { useActionPlan } from "@/contexts/ActionPlanContext";

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [selectedRegions, setSelectedRegions] = useState<RegionKey[]>(REGION_KEYS);
  const { addTask } = useActionPlan();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleRegionSelection = useCallback((ids: string[]) => {
    setSelectedRegions(ids.filter((id): id is RegionKey => REGION_KEYS.includes(id as RegionKey)));
  }, []);

  const handleAddTaskFromRecommendation = useCallback(
    (row: typeof regionPerformanceBase[0]) => {
      // Маппинг русских названий регионов на RegionKey
      const regionMap: Record<string, RegionKey | undefined> = {
        "Алматинская область": "almaty",
        "Жамбылская область": "zhambyl",
        "Туркестанская область": "turkestan",
        "Актюбинская область": "aktobe",
      };

      addTask({
        title: `Рекомендация для региона ${row.region}`,
        description: `Регион: ${row.region}\nИндекс роста: ${row.growthIndex}\nУрожайность: ${row.yield}\nРиск: ${row.riskLabel}\n\nРекомендация: ${row.recommendation}`,
        priority: row.riskLevel,
        source: "Аналитика",
        region: regionMap[row.region],
      });

      setSnackbarMessage(`Задача для региона ${row.region} добавлена в план действий`);
      setSnackbarOpen(true);
    },
    [addTask]
  );

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
          <RegionPerformanceTable
            rows={regionPerformance}
            onAddTask={handleAddTaskFromRecommendation}
          />
        </Box>
      </Stack>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AnalyticsPage;
