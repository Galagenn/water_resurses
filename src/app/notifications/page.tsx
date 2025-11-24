'use client';

import { Container, Stack, Typography } from "@mui/material";
import NotificationsPanel from "@/components/shared/NotificationsPanel";
import { notificationFeed } from "@/data/dashboard";

const NotificationsPage = () => (
  <Container maxWidth={false} sx={{ maxWidth: 1440, px: { xs: 1.5, sm: 2.5, md: 0 } }}>
    <Stack spacing={{ xs: 3, md: 4 }}>
      <Stack spacing={0.75}>
        <Typography variant="subtitle2" color="text.secondary">
          Центр событий
        </Typography>
        <Typography variant="h4">Уведомления</Typography>
        <Typography variant="body2" color="text.secondary">
          Просматривайте, фильтруйте и переадресовывайте системные уведомления
          без дублирования на других страницах.
        </Typography>
      </Stack>
      <NotificationsPanel feed={notificationFeed} />
    </Stack>
  </Container>
);

export default NotificationsPage;


