'use client';

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import DateRangePicker from "@/components/shared/DateRangePicker";
import RegionSelector from "@/components/shared/RegionSelector";
import IrrigationEfficiencyChart from "@/components/charts/IrrigationEfficiencyChart";
import SeasonalTrendsChart from "@/components/charts/SeasonalTrendsChart";
import RegionPerformanceTable from "@/components/shared/RegionPerformanceTable";
import NotificationsPanel from "@/components/shared/NotificationsPanel";
import { irrigationEfficiency, seasonalTrends, regionPerformance } from "@/data/analytics";
import { notificationFeed, regions } from "@/data/dashboard";

const AnalyticsPage = () => (
  <Container maxWidth="lg" sx={{ px: { xs: 1.25, sm: 2.5, md: 0 } }}>
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
          <DateRangePicker />
          <RegionSelector regions={regions} />
          <Button variant="contained" sx={{ minHeight: 44 }}>
            Экспорт CSV
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gap: { xs: 2.5, md: 3 },
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        <IrrigationEfficiencyChart data={irrigationEfficiency} />
        <SeasonalTrendsChart data={seasonalTrends} />
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: { xs: 2.5, md: 3 },
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 3fr) minmax(0, 2fr)" },
        }}
      >
        <RegionPerformanceTable rows={regionPerformance} />
        <NotificationsPanel feed={notificationFeed} />
      </Box>
    </Stack>
  </Container>
);

export default AnalyticsPage;

