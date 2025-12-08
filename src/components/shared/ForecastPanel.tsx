'use client';

import { Card, CardContent, Chip, Stack, Typography, LinearProgress } from "@mui/material";
import type { ForecastItem } from "@/types/dashboard";

type ForecastPanelProps = {
  items: ForecastItem[];
};

const riskColor: Record<ForecastItem["riskLevel"], string> = {
  low: "#22c55e",
  medium: "#f97316",
  high: "#ef4444",
};

const ForecastPanel = ({ items }: ForecastPanelProps) => (
  <Card sx={{ height: "100%" }}>
    <CardContent
      sx={{
        p: { xs: 1, sm: 2 },
        pl: { xs: 1.25, sm: 2.25 }, // небольшой внутренний отступ слева на мобиле
      }}
    >
      <Stack spacing={{ xs: 1, sm: 1.5, md: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >
          <Typography variant="h6" sx={{ fontSize: { xs: "0.875rem", sm: "1.25rem" } }}>AI-прогноз по регионам</Typography>
          <Chip size="small" label="Обновлено 15 мин назад" color="primary" variant="outlined" sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }} />
        </Stack>
        {items.map((item) => (
          <Stack
            key={item.id}
            spacing={0.75}
            sx={{
              border: "1px solid rgba(148,163,184,0.2)",
              borderRadius: { xs: 1, sm: 1.5, md: 2 },
              p: { xs: 1, sm: 1.5 },
              pl: { xs: 1.25, sm: 1.75 }, // чуть меньше ради выравнивания с заголовком
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={1}
            >
              <Typography variant="subtitle1">{item.region}</Typography>
              <Chip
                label={`${item.riskLabel} • ${item.riskProbability}%`}
                size="small"
                sx={{
                  backgroundColor: "rgba(15,23,42,0.8)",
                  color: riskColor[item.riskLevel],
                  border: `1px solid ${riskColor[item.riskLevel]}`,
                }}
              />
            </Stack>
            <LinearProgress
              variant="determinate"
              value={item.riskProbability}
              sx={{
                height: 6,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.08)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: riskColor[item.riskLevel],
                },
              }}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} justifyContent="space-between">
              <Typography color="text.secondary">ΔNDVI {item.ndviDelta}%</Typography>
              <Typography color="text.secondary">{item.yieldForecast}</Typography>
            </Stack>
            <Typography variant="body2">{item.comment}</Typography>
          </Stack>
        ))}
      </Stack>
    </CardContent>
  </Card>
);

export default ForecastPanel;

