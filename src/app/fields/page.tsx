'use client';

import { useMemo, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import FieldGrid from "@/components/fields/FieldGrid";
import FieldDetailDrawer from "@/components/fields/FieldDetailDrawer";
import AlertsList from "@/components/shared/AlertsList";
import { alerts, fieldsSnapshot } from "@/data/dashboard";

const FieldsPage = () => {
  const [selectedId, setSelectedId] = useState<string>();
  const selectedField = useMemo(
    () => fieldsSnapshot.find((field) => field.id === selectedId),
    [selectedId]
  );

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
      >
        <Stack spacing={0.5}>
          <Typography variant="subtitle2" color="text.secondary">
            Управление полями
          </Typography>
          <Typography variant="h4">Мониторинг сельхозугодий</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button component={Link} href="/analytics" variant="outlined">
            Аналитика
          </Button>
          <Button variant="contained">Добавить поле</Button>
        </Stack>
      </Stack>

      <FieldGrid fields={fieldsSnapshot} onSelect={setSelectedId} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <AlertsList alerts={alerts.slice(0, 3)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" mb={1}>
            План действий
          </Typography>
          <Stack spacing={1.5}>
            <Stack
              sx={{ borderRadius: 2, border: "1px solid rgba(148,163,184,0.2)", p: 2 }}
              spacing={1}
            >
              <Typography variant="subtitle1">Оросительный кластер №3</Typography>
              <Typography color="text.secondary">
                Увеличить подачу воды на 12% на полях 17А и 22F в течение следующих 36 часов.
              </Typography>
            </Stack>
            <Stack
              sx={{ borderRadius: 2, border: "1px solid rgba(148,163,184,0.2)", p: 2 }}
              spacing={1}
            >
              <Typography variant="subtitle1">Полевой аудит</Typography>
              <Typography color="text.secondary">
                Запланировать выезд агрономов в Туркестанскую область до пятницы.
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <FieldDetailDrawer field={selectedField} open={Boolean(selectedId)} onClose={() => setSelectedId(undefined)} />
    </Stack>
  );
};

export default FieldsPage;

