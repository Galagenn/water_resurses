'use client';

import {
  Drawer,
  Box,
  IconButton,
  Stack,
  Typography,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { FieldSnapshot } from "@/types/dashboard";

type Props = {
  field?: FieldSnapshot;
  open: boolean;
  onClose: () => void;
};

const FieldDetailDrawer = ({ field, open, onClose }: Props) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <Box sx={{ width: { xs: 320, sm: 420 }, p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Карточка поля</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      {field ? (
        <Stack spacing={2} mt={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h5">{field.name}</Typography>
            <Chip label={field.crop} />
          </Stack>
          <Typography color="text.secondary">{field.region}</Typography>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography>NDVI</Typography>
            <Typography fontWeight={600}>{field.ndvi}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Влажность почвы</Typography>
            <Typography fontWeight={600}>{field.soilMoisture}%</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Полив</Typography>
            <Typography fontWeight={600}>{field.irrigationStatus}</Typography>
          </Stack>
          <Typography>{field.forecast}</Typography>
          <Button variant="contained">Экспортировать отчёт</Button>
        </Stack>
      ) : (
        <Typography mt={4} color="text.secondary">
          Выберите поле в списке для просмотра деталей
        </Typography>
      )}
    </Box>
  </Drawer>
);

export default FieldDetailDrawer;

