'use client';

import {
  Avatar,
  Card,
  CardContent,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import type { AlertItem } from "@/types/dashboard";

type AlertsListProps = {
  alerts: AlertItem[];
};

const severityColor: Record<AlertItem["severity"], string> = {
  warning: "#f97316",
  critical: "#ef4444",
};

const AlertsList = ({ alerts }: AlertsListProps) => (
  <Card sx={{ height: "100%" }}>
    <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={{ xs: 1, sm: 1.5, md: 2 }}>
        <Typography variant="h6" sx={{ fontSize: { xs: "0.875rem", sm: "1.25rem" } }}>Активные аномалии</Typography>
        <Chip label="Журнал" size="small" variant="outlined" sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }} />
      </Stack>
      <List disablePadding>
        {alerts.map((alert) => (
          <ListItem
            key={alert.id}
            alignItems="flex-start"
            sx={{
              mb: 1,
              borderRadius: 2,
              border: "1px solid rgba(148,163,184,0.2)",
              gap: 1,
            }}
            secondaryAction={
              <IconButton edge="end" aria-label="Открыть поле">
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "rgba(148,163,184,0.12)", color: severityColor[alert.severity] }}>
                {alert.crop.slice(0, 1)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                >
                  <Typography variant="subtitle1">{alert.fieldName}</Typography>
                  <Chip
                    label={alert.severityLabel}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(148,163,184,0.05)",
                      color: severityColor[alert.severity],
                      border: `1px solid ${severityColor[alert.severity]}`,
                    }}
                  />
                </Stack>
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "block" }}
                  >
                    {alert.message}
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block" }}
                  >
                    {alert.timestamp}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default AlertsList;

