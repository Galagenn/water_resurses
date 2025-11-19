'use client';

import Link from "next/link";
import { Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { FieldSnapshot } from "@/types/dashboard";

type Props = {
  field: FieldSnapshot;
};

const FieldDetailView = ({ field }: Props) => (
  <Stack spacing={3}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack spacing={0.5}>
        <Typography variant="subtitle2" color="text.secondary">
          Детальная карточка
        </Typography>
        <Typography variant="h4">{field.name}</Typography>
      </Stack>
      <Button component={Link} href="/fields" variant="outlined">
        Назад к списку
      </Button>
    </Stack>
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip label={field.crop} />
            <Typography color="text.secondary">{field.region}</Typography>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <Stack>
              <Typography variant="caption">NDVI</Typography>
              <Typography variant="h5">{field.ndvi}</Typography>
            </Stack>
            <Stack>
              <Typography variant="caption">Влажность почвы</Typography>
              <Typography variant="h5">{field.soilMoisture}%</Typography>
            </Stack>
            <Stack>
              <Typography variant="caption">Статус полива</Typography>
              <Typography variant="h5">{field.irrigationStatus}</Typography>
            </Stack>
          </Stack>
          <Typography>{field.forecast}</Typography>
        </Stack>
      </CardContent>
    </Card>
  </Stack>
);

export default FieldDetailView;

