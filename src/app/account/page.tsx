'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/GridLegacy";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

const roles = ["Администратор", "Агроном", "ИИ-аналитик"];

const regions = [
  "Алматы",
  "Жамбыл",
  "Туркестан",
  "Актобе",
];

const sessions = [
  { id: "1", device: "MacBook Pro · Chrome", location: "Алматы, Казахстан", lastActive: "2 мин назад" },
  { id: "2", device: "iPhone 15 · Safari", location: "Алматы, Казахстан", lastActive: "1 ч назад" },
  { id: "3", device: "Windows Workstation · Edge", location: "Костанай, Казахстан", lastActive: "вчера" },
];

const AccountPage = () => {
  const router = useRouter();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("Алматы");
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/auth/login");
        router.refresh();
      } else {
        console.error("Ошибка при выходе");
        setLogoutLoading(false);
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      setLogoutLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1440, mx: 'auto', px: { xs: 0.75, sm: 2 } }}>
      <Box className="account-page" sx={{ width: "100%", maxWidth: "100%" }}>
        <Stack spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Stack spacing={0.125}>
          <Typography 
            variant="subtitle2" 
            color="text.secondary"
            sx={{ fontSize: { xs: "0.65rem", sm: "0.875rem" } }}
          >
            Управление доступом
          </Typography>
          <Typography 
            variant="h4"
            sx={{ fontSize: { xs: "1.125rem", sm: "1.5rem", md: "2.125rem" } }}
          >
            Учетная запись и безопасность
          </Typography>
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Grid container spacing={{ xs: 2.5, md: 3 }} sx={{ maxWidth: '100%', width: '100%' }}>
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                overflow: "hidden",
                width: "100%",
                maxWidth: "100%",
              }}
            >
              <CardHeader title="Профиль пользователя" />
              <CardContent
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Stack spacing={6}>
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

                  <Box sx={{ width: "100%", boxSizing: "border-box" }}>
                    <Grid container spacing={2.5}>
                      <Grid item xs={12} sm={6} sx={{ minWidth: 0, boxSizing: "border-box" }}>
                        <TextField 
                          label="Имя" 
                          fullWidth 
                          defaultValue="Гала" 
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ minWidth: 0, boxSizing: 'border-box' }}>
                        <TextField 
                          label="Фамилия" 
                          fullWidth 
                          defaultValue="Байжан" 
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ minWidth: 0, boxSizing: 'border-box' }}>
                        <TextField 
                          label="Email" 
                          type="email" 
                          fullWidth 
                          defaultValue="gala@agrosense.ai" 
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ minWidth: 0, boxSizing: 'border-box' }}>
                        <TextField 
                          label="Телефон" 
                          fullWidth 
                          defaultValue="+7 701 000 45 67" 
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ minWidth: 0, boxSizing: "border-box" }}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="region-select-label">Основной регион ответственности</InputLabel>
                          <Select
                            labelId="region-select-label"
                            value={selectedRegion}
                            label="Основной регион ответственности"
                            onChange={(e) => setSelectedRegion(e.target.value)}
                          >
                            {regions.map((region) => (
                              <MenuItem key={region} value={region}>
                                {region}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>

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
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Grid container spacing={{ xs: 2.5, md: 3 }} sx={{ maxWidth: '100%', width: '100%' }}>
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
                  <Divider />
                  <Box>
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      onClick={handleLogout}
                      disabled={logoutLoading}
                    >
                      {logoutLoading ? "Выход..." : "Выйти из аккаунта"}
                    </Button>
                  </Box>
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
        </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default AccountPage;


