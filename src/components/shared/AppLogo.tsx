'use client';

import { Stack, Typography } from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Agriculture";

const AppLogo = () => (
  <Stack direction="row" spacing={1.2} alignItems="center">
    <AgricultureIcon color="primary" />
    <Stack spacing={0}>
      <Typography variant="subtitle2" color="text.secondary">
        AgroSense
      </Typography>
      <Typography variant="h6" lineHeight={1}>
        AI Агент
      </Typography>
    </Stack>
  </Stack>
);

export default AppLogo;

