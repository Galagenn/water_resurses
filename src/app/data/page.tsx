'use client';

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
  Chip,
  LinearProgress,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import StorageIcon from "@mui/icons-material/Storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SecurityIcon from "@mui/icons-material/Security";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/Download";

const DataPage = () => {
  const [anonymizationEnabled, setAnonymizationEnabled] = useState(true);
  const [cleaningEnabled, setCleaningEnabled] = useState(true);
  const [preparationEnabled, setPreparationEnabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleProcess = () => {
    setProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const dataStats = [
    { label: "Всего записей", value: "1,234,567", color: "primary" },
    { label: "Обработано", value: "987,654", color: "success" },
    { label: "Анонимизировано", value: "456,789", color: "info" },
    { label: "Готово к обучению", value: "789,123", color: "warning" },
  ];

  const processingSteps = [
    {
      title: "Анонимизация данных",
      description: "Удаление персональных идентификаторов и чувствительной информации",
      icon: <SecurityIcon />,
      enabled: anonymizationEnabled,
      onToggle: setAnonymizationEnabled,
      status: "completed",
    },
    {
      title: "Очистка данных",
      description: "Удаление дубликатов, обработка пропусков и выбросов",
      icon: <DeleteOutlineIcon />,
      enabled: cleaningEnabled,
      onToggle: setCleaningEnabled,
      status: "completed",
    },
    {
      title: "Подготовка данных",
      description: "Нормализация, масштабирование и форматирование для модели",
      icon: <AutoFixHighIcon />,
      enabled: preparationEnabled,
      onToggle: setPreparationEnabled,
      status: "in_progress",
    },
  ];

  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: 1440, px: { xs: 0.75, sm: 2, md: 0 } }}
    >
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
              Управление данными
            </Typography>
            <Typography 
              variant="h4"
              sx={{ fontSize: { xs: "1.125rem", sm: "1.5rem", md: "2.125rem" } }}
            >
              Анонимизация, очистка и подготовка данных
            </Typography>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ minHeight: 44 }}
            >
              Загрузить данные
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{ minHeight: 44 }}
            >
              Экспорт
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={{ xs: 1, sm: 1.5, md: 3 }}>
          {dataStats.map((stat) => (
            <Grid item xs={6} sm={3} key={stat.label}>
              <Card
                sx={{
                  height: "100%",
                  background: "rgba(148,163,184,0.05)",
                  border: "1px solid rgba(148,163,184,0.1)",
                }}
              >
                <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontSize: { xs: "0.65rem", sm: "0.875rem" } }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h5" color={`${stat.color}.main`} sx={{ fontSize: { xs: "1rem", sm: "1.5rem", md: "1.75rem" } }}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Stack spacing={{ xs: 1, sm: 1.5, md: 2.5 }}>
          <Typography variant="h6" sx={{ fontSize: { xs: "0.875rem", sm: "1.25rem" } }}>Этапы обработки данных</Typography>
          {processingSteps.map((step, index) => (
            <Card
              key={step.title}
              sx={{
                border: "1px solid rgba(148,163,184,0.2)",
                background: step.enabled
                  ? "rgba(74, 222, 128, 0.05)"
                  : "rgba(148,163,184,0.05)",
              }}
            >
              <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                <Stack spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={2}
                  >
                    <Stack direction="row" spacing={2} alignItems="center" flex={1}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: step.enabled ? "primary.main" : "action.disabledBackground",
                          color: step.enabled ? "primary.contrastText" : "action.disabled",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {step.icon}
                      </Box>
                      <Stack spacing={0.5}>
                        <Typography variant="h6">{step.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step.description}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Chip
                        label={
                          step.status === "completed"
                            ? "Завершено"
                            : step.status === "in_progress"
                            ? "В процессе"
                            : "Ожидание"
                        }
                        color={
                          step.status === "completed"
                            ? "success"
                            : step.status === "in_progress"
                            ? "warning"
                            : "default"
                        }
                        size="small"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={step.enabled}
                            onChange={(e) => step.onToggle(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="Включено"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Card
          sx={{
            border: "1px solid rgba(148,163,184,0.2)",
            background: "rgba(148,163,184,0.05)",
          }}
        >
          <CardContent>
            <Stack spacing={2.5}>
              <Typography variant="h6">Запуск обработки</Typography>
              <Alert severity="info" sx={{ mb: 1 }}>
                Убедитесь, что все необходимые этапы включены перед запуском обработки данных.
              </Alert>
              {processing && (
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      Обработка данных...
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {progress}%
                    </Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
              )}
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrowIcon />}
                onClick={handleProcess}
                disabled={processing}
                fullWidth
                sx={{ minHeight: 48 }}
              >
                {processing ? "Обработка..." : "Запустить обработку данных"}
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Card
          sx={{
            border: "1px solid rgba(148,163,184,0.2)",
            background: "rgba(148,163,184,0.05)",
          }}
        >
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Информация о подготовке данных</Typography>
              <Divider />
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Анонимизация данных
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Процесс удаления или маскировки персональных идентификаторов и чувствительной
                    информации из набора данных. Это включает удаление имен, адресов, координат
                    полей и других данных, которые могут идентифицировать конкретные хозяйства или
                    владельцев.
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Очистка данных
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Удаление дубликатов, обработка пропущенных значений, выявление и обработка
                    выбросов, а также исправление ошибок в данных. Это критически важно для
                    обеспечения качества данных перед обучением модели.
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Подготовка данных для обучения модели
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Нормализация числовых значений, масштабирование признаков, кодирование
                    категориальных переменных и разделение данных на обучающую, валидационную и
                    тестовую выборки. Данные форматируются в соответствии с требованиями модели
                    машинного обучения.
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default DataPage;

