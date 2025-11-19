'use client';

import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
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
  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
      >
        <Stack spacing={0.5}>
          <Typography variant="subtitle2" color="text.secondary">
            Интерактивный мониторинг
          </Typography>
          <Typography variant="h4">Дашборд ИИ-агента</Typography>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "flex-end" }}>
          <DateRangePicker />
          <RegionSelector regions={regions} />
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        {summaryCards.map((card) => (
          <Grid key={card.id} item xs={12} sm={6} lg={3}>
            <StatCard card={card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <WaterUsageChart data={waterUsageSeries} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <VegetationTrendChart data={vegetationSeries} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <CropYieldComparisonChart data={cropYieldSeries} />
        </Grid>
        <Grid item xs={12} lg={7}>
          <AnomalyMap zones={anomalyZones} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <ForecastPanel items={forecastSummary} />
        </Grid>
        <Grid item xs={12} lg={7}>
          <AlertsList alerts={alerts} />
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
}
