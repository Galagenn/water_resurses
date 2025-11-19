'use client';

import { Button, Stack, Typography } from "@mui/material";
import TrainingModulesList from "@/components/training/TrainingModulesList";
import { trainingModules } from "@/data/training";

const TrainingPage = () => (
  <Stack spacing={3}>
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", md: "center" }}
      spacing={2}
    >
      <Stack spacing={0.5}>
        <Typography variant="subtitle2" color="text.secondary">
          Обучающие сессии
        </Typography>
        <Typography variant="h4">Программы для агрономов и операторов</Typography>
      </Stack>
      <Button variant="contained">Записать команду</Button>
    </Stack>

    <TrainingModulesList modules={trainingModules} />
  </Stack>
);

export default TrainingPage;

