'use client';

import { useState } from "react";
import type { MouseEvent } from "react";
import { Box, Card, CardContent, Stack, Typography, Chip, Tooltip, Popover } from "@mui/material";
import type { DashboardSummaryCard } from "@/types/dashboard";

type StatCardProps = {
  card: DashboardSummaryCard;
};

const emphasisColor: Record<DashboardSummaryCard["emphasis"], string> = {
  positive: "#22c55e",
  negative: "#f97316",
  neutral: "#94a3b8",
};

const BreakdownList = ({ items }: { items: NonNullable<DashboardSummaryCard["breakdown"]> }) => (
  <Stack spacing={0.75}>
    {items.map((item) => (
      <Stack key={item.region} direction="row" spacing={1} alignItems="center">
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: item.color,
            flexShrink: 0,
          }}
        />
        <Typography variant="caption" color="text.primary">
          {item.label}: {item.value}
        </Typography>
      </Stack>
    ))}
  </Stack>
);

const StatCard = ({ card }: StatCardProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const hasBreakdown = Boolean(card.breakdown?.length);
  const breakdownContent =
    hasBreakdown && card.breakdown ? (
      <Box sx={{ p: 0.5, maxWidth: 220 }}>
        <BreakdownList items={card.breakdown} />
      </Box>
    ) : null;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (!hasBreakdown) {
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip
        title={breakdownContent}
        arrow
        placement="top"
        disableHoverListener={!hasBreakdown}
        enterDelay={200}
      >
        <Box onClick={handleClick} sx={{ cursor: hasBreakdown ? "pointer" : "default" }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 1.5,
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
        </Box>
      </Tooltip>
      <Popover
        open={hasBreakdown && Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        disableRestoreFocus
        PaperProps={{
          sx: {
            backgroundColor: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(148,163,184,0.3)",
            boxShadow: "0 15px 35px rgba(2,6,23,0.5)",
            p: 1.5,
            maxWidth: 260,
          },
        }}
      >
        {breakdownContent}
      </Popover>
    </>
  );
};

export default StatCard;

