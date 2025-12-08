'use client';

import { Container, Stack, Typography } from "@mui/material";
import NotificationsPanel from "@/components/shared/NotificationsPanel";
import { notificationFeed } from "@/data/dashboard";

const NotificationsPage = () => (
  <Container maxWidth={false} sx={{ maxWidth: 1440, px: { xs: 0.75, sm: 2, md: 0 } }}>
    <Stack spacing={{ xs: 1, sm: 2, md: 4 }}>
      <Stack spacing={0.25}>
        <Typography 
          variant="subtitle2" 
          color="text.secondary"
          sx={{ fontSize: { xs: "0.65rem", sm: "0.875rem" } }}
        >
          Центр событий
        </Typography>
        <Typography 
          variant="h4"
          sx={{ fontSize: { xs: "1.125rem", sm: "1.5rem", md: "2.125rem" } }}
        >
          Уведомления
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}
        >
          Просматривайте, фильтруйте и переадресовывайте системные уведомления
          без дублирования на других страницах.
        </Typography>
      </Stack>
      <NotificationsPanel feed={notificationFeed} />
    </Stack>
  </Container>
);

export default NotificationsPage;


