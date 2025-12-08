'use client';

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FieldDetailDrawer from "@/components/fields/FieldDetailDrawer";
import { fieldsSnapshot } from "@/data/dashboard";
import type { FieldSnapshot } from "@/types/dashboard";

const irrigationLabel: Record<FieldSnapshot["irrigationStatus"], string> = {
  stable: "Стабильно",
  increase: "Усилить",
  decrease: "Снизить",
};

const irrigationColor: Record<FieldSnapshot["irrigationStatus"], "success" | "warning" | "info"> = {
  stable: "success",
  increase: "warning",
  decrease: "info",
};

const FieldsPage = () => {
  const [selectedId, setSelectedId] = useState<string>();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const selectedField = useMemo(
    () => fieldsSnapshot.find((field) => field.id === selectedId),
    [selectedId]
  );

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1440, px: { xs: 0.75, sm: 2, md: 0 } }}>
      <Stack spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", lg: "center" }}
          spacing={{ xs: 1, lg: 3 }}
        >
          <Stack spacing={0.125}>
            <Typography 
              variant="subtitle2" 
              color="text.secondary"
              sx={{ fontSize: { xs: "0.65rem", sm: "0.875rem" } }}
            >
              Управление полями
            </Typography>
            <Typography 
              variant="h4"
              sx={{ fontSize: { xs: "1.125rem", sm: "1.5rem", md: "2.125rem" } }}
            >
              Мониторинг сельхозугодий
            </Typography>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} width="100%" maxWidth={360}>

            <Button variant="contained" fullWidth>
              Добавить поле
            </Button>
          </Stack>
        </Stack>

        <Card
          sx={{
            border: "1px solid rgba(148,163,184,0.25)",
            backgroundColor: "background.paper",
            borderRadius: { xs: 1, sm: 1.5, md: 2 },
          }}
        >
          <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
            <Stack spacing={{ xs: 1, sm: 1.5, md: 2 }}>
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between">
                <Typography variant="h6" sx={{ fontSize: { xs: "0.875rem", sm: "1.25rem" } }}>Мониторинг сельхозугодий</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>
                  {fieldsSnapshot.length} активных участков
                </Typography>
              </Stack>
              {isMobileView ? (
                <Stack spacing={1}>
                  {fieldsSnapshot.map((field) => (
                    <Box
                      key={field.id}
                      sx={{
                        borderRadius: { xs: 1, sm: 1.5, md: 2 },
                        border: "1px solid rgba(148,163,184,0.3)",
                        p: { xs: 1, sm: 1.5, md: 2 },
                      }}
                    >
                      <Stack spacing={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                          <Stack spacing={0.5}>
                            <Typography fontWeight={600}>{field.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {field.region} · {field.crop}
                            </Typography>
                          </Stack>
                          <Chip
                            size="small"
                            color={irrigationColor[field.irrigationStatus]}
                            label={irrigationLabel[field.irrigationStatus]}
                          />
                        </Stack>
                        <Stack spacing={1} direction="row" flexWrap="wrap" rowGap={1} columnGap={2}>
                          <Stack>
                            <Typography variant="caption" color="text.secondary">
                              NDVI
                            </Typography>
                            <Typography variant="body2">{field.ndvi.toFixed(2)}</Typography>
                          </Stack>
                          <Stack>
                            <Typography variant="caption" color="text.secondary">
                              Влажность
                            </Typography>
                            <Typography variant="body2">{field.soilMoisture}%</Typography>
                          </Stack>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {field.forecast}
                        </Typography>
                        <Stack spacing={1}>
                          <Typography variant="caption" color="text.secondary">
                            Обновлено {field.lastUpdate}
                          </Typography>
                          <Button variant="outlined" size="small" fullWidth onClick={() => setSelectedId(field.id)}>
                            Детали
                          </Button>
                        </Stack>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              ) : (
                <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
                  <Table size="small" sx={{ minWidth: 720 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Поле</TableCell>
                        <TableCell>Культура</TableCell>
                        <TableCell align="center">NDVI</TableCell>
                        <TableCell align="center">Влажность</TableCell>
                        <TableCell align="center">Орошение</TableCell>
                        <TableCell>Прогноз</TableCell>
                        <TableCell align="right">Обновлено</TableCell>
                        <TableCell align="right">Действия</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fieldsSnapshot.map((field) => (
                        <TableRow hover key={field.id}>
                          <TableCell>
                            <Stack spacing={0.25}>
                              <Typography fontWeight={600}>{field.name}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {field.region}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{field.crop}</TableCell>
                          <TableCell align="center">{field.ndvi.toFixed(2)}</TableCell>
                          <TableCell align="center">{field.soilMoisture}%</TableCell>
                          <TableCell align="center">
                            <Chip
                              size="small"
                              color={irrigationColor[field.irrigationStatus]}
                              label={irrigationLabel[field.irrigationStatus]}
                            />
                          </TableCell>
                          <TableCell sx={{ maxWidth: 260 }}>
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {field.forecast}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="caption" color="text.secondary">
                              {field.lastUpdate}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => setSelectedId(field.id)}
                            >
                              Детали
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Stack>
          </CardContent>
        </Card>

        <FieldDetailDrawer field={selectedField} open={Boolean(selectedId)} onClose={() => setSelectedId(undefined)} />
      </Stack>
    </Container>
  );
};

export default FieldsPage;

