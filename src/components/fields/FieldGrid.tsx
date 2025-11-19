'use client';

import { Card, CardContent, Chip, LinearProgress, Stack, Typography, Button, Grid } from "@mui/material";
import type { FieldSnapshot } from "@/types/dashboard";

type Props = {
  fields: FieldSnapshot[];
  onSelect?: (fieldId: string) => void;
};

const irrigationLabel: Record<FieldSnapshot["irrigationStatus"], string> = {
  stable: "Стабильно",
  increase: "Усилить",
  decrease: "Снизить",
};

const FieldGrid = ({ fields, onSelect }: Props) => (
  <Grid container spacing={2}>
    {fields.map((field) => (
      <Grid key={field.id} item xs={12} md={6} lg={4}>
        <Card>
          <CardContent>
            <Stack spacing={1.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack>
                  <Typography variant="subtitle1">{field.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {field.region} · {field.crop}
                  </Typography>
                </Stack>
                <Chip label={irrigationLabel[field.irrigationStatus]} size="small" color="primary" />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack flex={1}>
                  <Typography variant="caption">NDVI</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={field.ndvi * 100}
                    sx={{ height: 8, borderRadius: 10, my: 0.5 }}
                  />
                  <Typography variant="body2">{Math.round(field.ndvi * 100) / 100}</Typography>
                </Stack>
                <Stack flex={1}>
                  <Typography variant="caption">Влажность почвы</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={field.soilMoisture}
                    color="secondary"
                    sx={{ height: 8, borderRadius: 10, my: 0.5 }}
                  />
                  <Typography variant="body2">{field.soilMoisture}%</Typography>
                </Stack>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {field.forecast}
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  Обновлено {field.lastUpdate}
                </Typography>
                <Button size="small" variant="outlined" onClick={() => onSelect?.(field.id)}>
                  Детали
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default FieldGrid;

