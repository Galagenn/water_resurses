'use client';

import { Stack, Typography } from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Agriculture";

const AppLogo = () => (
  <Stack direction="row" spacing={1.2} alignItems="center">
    <AgricultureIcon 
      color="primary" 
      sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
    />
    <Stack spacing={0}>
      <Typography 
        variant="subtitle2" 
        color="text.secondary"
        sx={{ fontSize: { xs: "0.625rem", sm: "0.875rem" } }}
      >
        AgroSense
      </Typography>
      <Typography 
        variant="h6" 
        lineHeight={1}
        sx={{ fontSize: { xs: "0.875rem", sm: "1.25rem" } }}
      >
        AI Агент
      </Typography>
    </Stack>
  </Stack>
);

export default AppLogo;

