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
  <Card
    sx={{
      height: "100%",
      borderRadius: 3,
      border: "1px solid rgba(148,163,184,0.15)",
      background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.7))",
    }}
  >
    <CardContent>
      <Stack spacing={1.25}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          flexWrap="wrap"
          rowGap={1}
        >
          <Stack spacing={0.5}>
            <Typography color="text.secondary" variant="subtitle2">
              {card.label}
            </Typography>
            <Typography variant="h4" sx={{ fontSize: { xs: "1.75rem", md: "2rem" } }}>
              {card.value}
            </Typography>
          </Stack>
          <Typography fontSize={32} aria-hidden sx={{ lineHeight: 1 }}>
            {card.icon}
          </Typography>
        </Stack>
        {card.change !== undefined && (
          <Chip
            size="small"
            label={`${card.change > 0 ? "+" : ""}${card.change}%`}
            sx={{
              width: "fit-content",
              backgroundColor: "rgba(148,163,184,0.08)",
              color: emphasisColor[card.emphasis],
              px: 1,
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

