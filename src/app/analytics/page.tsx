'use client';

import { Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import DateRangePicker from "@/components/shared/DateRangePicker";
import RegionSelector from "@/components/shared/RegionSelector";
import IrrigationEfficiencyChart from "@/components/charts/IrrigationEfficiencyChart";
import SeasonalTrendsChart from "@/components/charts/SeasonalTrendsChart";
import RegionPerformanceTable from "@/components/shared/RegionPerformanceTable";
import NotificationsPanel from "@/components/shared/NotificationsPanel";
import { irrigationEfficiency, seasonalTrends, regionPerformance } from "@/data/analytics";
import { notificationFeed, regions } from "@/data/dashboard";

const AnalyticsPage = () => (
  <Stack spacing={3}>
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", md: "center" }}
      spacing={2}
    >
      <Stack spacing={0.5}>
        <Typography variant="subtitle2" color="text.secondary">
          Детальная аналитика
        </Typography>
        <Typography variant="h4">Сценарии орошения и вегетации</Typography>
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "flex-end" }}>
        <DateRangePicker />
        <RegionSelector regions={regions} />
        <Button variant="contained">Экспорт CSV</Button>
      </Stack>
    </Stack>

    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <IrrigationEfficiencyChart data={irrigationEfficiency} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <SeasonalTrendsChart data={seasonalTrends} />
      </Grid>
    </Grid>

    <Grid container spacing={2}>
      <Grid item xs={12} lg={7}>
        <RegionPerformanceTable rows={regionPerformance} />
      </Grid>
      <Grid item xs={12} lg={5}>
        <NotificationsPanel feed={notificationFeed} />
      </Grid>
    </Grid>
  </Stack>
);

export default AnalyticsPage;

