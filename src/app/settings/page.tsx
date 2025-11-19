'use client';

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

const SettingsPage = () => {
  const [autoSync, setAutoSync] = useState(true);
  const [enableAlerts, setEnableAlerts] = useState(true);

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="subtitle2" color="text.secondary">
          Конфигурация платформы
        </Typography>
        <Typography variant="h4">Настройки интеграции и уведомлений</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Typography variant="h6">API и подключение</Typography>
            <TextField label="Базовый URL API" placeholder="https://api.agrosense.kz/v1" fullWidth />
            <TextField label="API Token" placeholder="************" fullWidth />
            <FormControlLabel
              control={<Switch checked={autoSync} onChange={() => setAutoSync((prev) => !prev)} />}
              label="Авто-синхронизация каждые 15 минут"
            />
            <Button variant="contained">Сохранить подключение</Button>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Typography variant="h6">Уведомления</Typography>
            <FormControlLabel
              control={<Switch checked={enableAlerts} onChange={() => setEnableAlerts((prev) => !prev)} />}
              label="Push-уведомления об аномалиях"
            />
            <TextField label="Email для отчётов" placeholder="agro-team@example.com" fullWidth />
            <Button variant="outlined">Отправить тестовое уведомление</Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default SettingsPage;

