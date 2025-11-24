'use client';

import { Button, Container, Stack, Typography } from "@mui/material";
import TrainingModulesList from "@/components/training/TrainingModulesList";
import { trainingModules } from "@/data/training";

const TrainingPage = () => (
  <Container maxWidth={false} sx={{ maxWidth: 1440, px: { xs: 1.25, sm: 2.5, md: 0 } }}>
    <Stack spacing={{ xs: 3, md: 4 }}>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", lg: "center" }}
        spacing={{ xs: 2, lg: 3 }}
      >
        <Stack spacing={0.5}>
          <Typography variant="subtitle2" color="text.secondary">
            Обучающие сессии
          </Typography>
          <Typography variant="h4">Программы для агрономов и операторов</Typography>
        </Stack>
        <Button variant="contained" sx={{ alignSelf: { xs: "stretch", lg: "auto" }, minHeight: 44 }}>
          Записать команду
        </Button>
      </Stack>

      <TrainingModulesList modules={trainingModules} />
    </Stack>
  </Container>
);

export default TrainingPage;

