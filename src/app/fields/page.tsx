'use client';

import { useMemo, useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
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
              Управление полями
            </Typography>
            <Typography variant="h4">Мониторинг сельхозугодий</Typography>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} width="100%" maxWidth={360}>

            <Button variant="contained" fullWidth>
              Добавить поле
            </Button>
          </Stack>
        </Stack>

        <FieldGrid fields={fieldsSnapshot} onSelect={setSelectedId} />

        <Box
          sx={{
            display: "grid",
            gap: { xs: 2.5, md: 3 },
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          }}
        >
          <Stack spacing={1.5}>
            <Typography variant="h6">План действий</Typography>
            {[
              {
                title: "Оросительный кластер №3",
                text: "Увеличить подачу воды на 12% на полях 17А и 22F в течение следующих 36 часов.",
              },
              {
                title: "Полевой аудит",
                text: "Запланировать выезд агрономов в Туркестанскую область до пятницы.",
              },
            ].map((item) => (
              <Stack
                key={item.title}
                sx={{ borderRadius: 2, border: "1px solid rgba(148,163,184,0.2)", p: 2 }}
                spacing={1}
              >
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography color="text.secondary">{item.text}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        <FieldDetailDrawer field={selectedField} open={Boolean(selectedId)} onClose={() => setSelectedId(undefined)} />
      </Stack>
    </Container>
  );
};

export default FieldsPage;

