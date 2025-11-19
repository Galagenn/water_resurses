'use client';

import { Box, Button, Card, CardContent, Chip, LinearProgress, Stack, Typography } from "@mui/material";
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
  <Box
    sx={{
      display: "grid",
      gap: { xs: 2, md: 2.5 },
      gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(3, minmax(0, 1fr))" },
    }}
  >
    {fields.map((field) => (
      <Card key={field.id} sx={{ height: "100%" }}>
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
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
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
    ))}
  </Box>
);

export default FieldGrid;

