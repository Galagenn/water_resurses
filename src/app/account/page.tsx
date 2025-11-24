'use client';

import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

const roles = ["Администратор", "Агроном", "ИИ-аналитик"];

const sessions = [
  { id: "1", device: "MacBook Pro · Chrome", location: "Алматы, Казахстан", lastActive: "2 мин назад" },
  { id: "2", device: "iPhone 15 · Safari", location: "Алматы, Казахстан", lastActive: "1 ч назад" },
  { id: "3", device: "Windows Workstation · Edge", location: "Костанай, Казахстан", lastActive: "вчера" },
];

const AccountPage = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1440, px: { xs: 1.25, sm: 2.5 } }}>
      <Stack spacing={{ xs: 3, md: 4 }}>
        <Stack spacing={0.5}>
          <Typography variant="subtitle2" color="text.secondary">
            Управление доступом
          </Typography>
          <Typography variant="h4">Учетная запись и безопасность</Typography>
        </Stack>

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Профиль пользователя" />
              <CardContent>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ width: 64, height: 64, fontSize: 28 }}>G</Avatar>
                    <Stack spacing={0.5}>
                      <Typography variant="h6">Гала</Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {roles.map((role) => (
                          <Chip key={role} label={role} size="small" color="success" variant="outlined" />
                        ))}
                      </Stack>
                    </Stack>
                  </Stack>

                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Имя" fullWidth defaultValue="Гала" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Фамилия" fullWidth defaultValue="Байжан" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Email" type="email" fullWidth defaultValue="gala@agrosense.ai" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Телефон" fullWidth defaultValue="+7 701 000 45 67" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Основной регион ответственности"
                        fullWidth
                        defaultValue="Алматинская область"
                      />
                    </Grid>
                  </Grid>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="flex-end">
                    <Button variant="outlined">Отменить</Button>
                    <Button variant="contained">Сохранить изменения</Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Stack spacing={3}>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Тариф
                    </Typography>
                    <Typography variant="h6">AgroSense Pro</Typography>
                    <Typography variant="body2" color="text.secondary">
                      12 полей · 4 команды · прогнозы NDVI каждые 6 часов
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Лимиты использования
                    </Typography>
                    <Typography variant="body2">Снимки спутников за месяц: 68 / 100</Typography>
                    <Typography variant="body2">Экспорт отчётов: 9 / 20</Typography>
                    <Typography variant="body2">API запросы: 41 200 / 80 000</Typography>
                  </Stack>
                  <Divider />
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Следующее списание
                    </Typography>
                    <Typography variant="h6">15 декабря 2025</Typography>
                    <Button variant="outlined" size="small">
                      Изменить тариф
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Безопасность" />
              <CardContent>
                <Stack spacing={3}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle1">Двухфакторная аутентификация</Typography>
                      <Typography variant="body2" color="text.secondary">
                        SMS-код и push-уведомление
                      </Typography>
                    </Stack>
                    <Switch checked={twoFactorEnabled} onChange={() => setTwoFactorEnabled((prev) => !prev)} />
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle1">Еженедельный отчёт</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Сводка по рискам и прогнозам
                      </Typography>
                    </Stack>
                    <Switch checked={weeklyDigest} onChange={() => setWeeklyDigest((prev) => !prev)} />
                  </Stack>
                  <Divider />
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">Резервные коды</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Используйте при потере доступа к основным факторам
                    </Typography>
                    <Button variant="outlined" size="small">
                      Сгенерировать новые
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Активные сессии" />
              <CardContent>
                <List disablePadding>
                  {sessions.map((session, index) => (
                    <Stack key={session.id}>
                      <ListItem
                        disableGutters
                        secondaryAction={
                          index === 0 ? (
                            <Chip size="small" color="success" label="Текущая" />
                          ) : (
                            <Button size="small" color="inherit">
                              Завершить
                            </Button>
                          )
                        }
                      >
                        <ListItemText
                          primary={session.device}
                          secondary={`${session.location} · ${session.lastActive}`}
                        />
                      </ListItem>
                      {index < sessions.length - 1 && <Divider component="li" sx={{ my: 1 }} />}
                    </Stack>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default AccountPage;


