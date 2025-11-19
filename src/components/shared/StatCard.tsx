'use client';

import { Card, CardContent, Stack, Typography, Chip } from "@mui/material";
import type { DashboardSummaryCard } from "@/types/dashboard";

type StatCardProps = {
  card: DashboardSummaryCard;
};

const emphasisColor: Record<DashboardSummaryCard["emphasis"], string> = {
  positive: "#22c55e",
  negative: "#f97316",
  neutral: "#94a3b8",
};

const StatCard = ({ card }: StatCardProps) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack spacing={0.5}>
            <Typography color="text.secondary" variant="subtitle2">
              {card.label}
            </Typography>
            <Typography variant="h4">{card.value}</Typography>
          </Stack>
          <Typography fontSize={32} aria-hidden>
            {card.icon}
          </Typography>
        </Stack>
        {card.change !== undefined && (
          <Chip
            label={`${card.change > 0 ? "+" : ""}${card.change}%`}
            sx={{
              width: "fit-content",
              backgroundColor: "rgba(148,163,184,0.1)",
              color: emphasisColor[card.emphasis],
            }}
          />
        )}
        {card.footer && (
          <Typography variant="body2" color="text.secondary">
            {card.footer}
          </Typography>
        )}
      </Stack>
    </CardContent>
  </Card>
);

export default StatCard;

