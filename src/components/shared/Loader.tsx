'use client';

import { CircularProgress, Stack, Typography } from "@mui/material";

const Loader = ({ label = "Загрузка данных…" }: { label?: string }) => (
  <Stack alignItems="center" spacing={1} py={6}>
    <CircularProgress color="inherit" />
    <Typography color="text.secondary">{label}</Typography>
  </Stack>
);

export default Loader;

