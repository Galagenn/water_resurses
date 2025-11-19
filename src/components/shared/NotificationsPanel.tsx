'use client';

import { Card, CardContent, Stack, Typography, Button } from "@mui/material";
import type { NotificationItem } from "@/types/dashboard";

type Props = {
  feed: NotificationItem[];
};

const NotificationsPanel = ({ feed }: Props) => (
  <Card>
    <CardContent>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={1}
        >
          <Typography variant="h6">Служебные уведомления</Typography>
          <Button
            size="small"
            variant="outlined"
            sx={{ alignSelf: { xs: "stretch", sm: "auto" } }}
          >
            Архив
          </Button>
        </Stack>
        {feed.map((item) => (
          <Stack
            key={item.id}
            spacing={0.5}
            sx={{
              border: "1px solid rgba(148,163,184,0.15)",
              borderRadius: 2,
              p: 1.5,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={0.5}
            >
              <Typography variant="subtitle1">{item.title}</Typography>
              <Typography variant="caption" color="text.secondary">
                {item.timestamp}
              </Typography>
            </Stack>
            <Typography color="text.secondary">{item.description}</Typography>
            {item.actionLabel && (
              <Button size="small" variant="text" sx={{ width: "fit-content" }}>
                {item.actionLabel}
              </Button>
            )}
          </Stack>
        ))}
      </Stack>
    </CardContent>
  </Card>
);

export default NotificationsPanel;

