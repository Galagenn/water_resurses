import type {
  AlertItem,
  AnomalyZone,
  CropYieldPoint,
  DashboardSummaryCard,
  ForecastItem,
  RegionOption,
  TimeSeriesPoint,
  VegetationSeriesPoint,
  FieldSnapshot,
  NotificationItem,
} from "@/types/dashboard";

export const summaryCards: DashboardSummaryCard[] = [
  {
    id: "water",
    label: "Использование воды",
    value: "18.4 млн м³",
    change: -4.2,
    emphasis: "positive",
    icon: "💧",
    footer: "−820 тыс. м³ к прошлому периоду",
  },
  {
    id: "coverage",
    label: "Покрытие спутником",
    value: "92%",
    change: 3.1,
    emphasis: "positive",
    icon: "🛰️",
    footer: "+3% новых снимков высокого разрешения",
  },
  {
    id: "yield",
    label: "Прогноз урожайности",
    value: "41.6 ц/га",
    change: 1.8,
    emphasis: "neutral",
    icon: "🌾",
    footer: "Стабильный прогноз по ключевым культурам",
  },
  {
    id: "alerts",
    label: "Активные оповещения",
    value: 12,
    change: 9.1,
    emphasis: "negative",
    icon: "⚠️",
    footer: "5 критических аномалий требуют внимания",
  },
];

export const waterUsageSeries: TimeSeriesPoint[] = [
  { period: "Нед 01", value: 3.2 },
  { period: "Нед 02", value: 3.6 },
  { period: "Нед 03", value: 3.1 },
  { period: "Нед 04", value: 2.9 },
  { period: "Нед 05", value: 2.8 },
  { period: "Нед 06", value: 2.6 },
];

export const vegetationSeries: VegetationSeriesPoint[] = [
  { period: "Нед 01", ndvi: 0.62, evi: 0.48 },
  { period: "Нед 02", ndvi: 0.66, evi: 0.51 },
  { period: "Нед 03", ndvi: 0.71, evi: 0.55 },
  { period: "Нед 04", ndvi: 0.68, evi: 0.53 },
  { period: "Нед 05", ndvi: 0.63, evi: 0.49 },
  { period: "Нед 06", ndvi: 0.59, evi: 0.47 },
];

export const cropYieldSeries: CropYieldPoint[] = [
  { crop: "Пшеница", current: 42, previous: 39 },
  { crop: "Кукуруза", current: 61, previous: 58 },
  { crop: "Хлопок", current: 35, previous: 37 },
  { crop: "Соя", current: 29, previous: 24 },
];

export const forecastSummary: ForecastItem[] = [
  {
    id: "region-1",
    region: "Алматинская область",
    riskLevel: "high",
    riskLabel: "Высокий риск",
    riskProbability: 76,
    ndviDelta: -12.4,
    yieldForecast: "−8% к плану",
    comment: "Увеличить орошение в восточных полях, снизить нагрузку на 3 блок насосов",
  },
  {
    id: "region-2",
    region: "Жамбылская область",
    riskLevel: "medium",
    riskLabel: "Средний риск",
    riskProbability: 48,
    ndviDelta: -4.6,
    yieldForecast: "−3% к плану",
    comment: "Провести повторную проверку датчиков влажности, возможен сбой",
  },
  {
    id: "region-3",
    region: "Туркестанская область",
    riskLevel: "low",
    riskLabel: "Низкий риск",
    riskProbability: 21,
    ndviDelta: 2.3,
    yieldForecast: "+4% к плану",
    comment: "Сохранить текущий режим орошения, оптимальный статус",
  },
];

export const alerts: AlertItem[] = [
  {
    id: "alert-1",
    severity: "critical",
    severityLabel: "Критический",
    timestamp: "12.11.2025 09:15",
    fieldName: "Поле 17А",
    crop: "Кукуруза",
    message: "Резкое падение NDVI, возможное засоление почвы",
    fieldId: "field-17a",
  },
  {
    id: "alert-2",
    severity: "warning",
    severityLabel: "Предупреждение",
    timestamp: "12.11.2025 08:40",
    fieldName: "Поле 05C",
    crop: "Пшеница",
    message: "Пониженная влажность грунта, снизить норму орошения",
    fieldId: "field-05c",
  },
  {
    id: "alert-3",
    severity: "warning",
    severityLabel: "Предупреждение",
    timestamp: "11.11.2025 16:05",
    fieldName: "Поле 22F",
    crop: "Хлопок",
    message: "Аномальная температура, проверить датчики микроклимата",
    fieldId: "field-22f",
  },
  {
    id: "alert-4",
    severity: "critical",
    severityLabel: "Критический",
    timestamp: "11.11.2025 11:30",
    fieldName: "Поле 11K",
    crop: "Соя",
    message: "Снижение влажности на 18%, требуется корректировка плана",
    fieldId: "field-11k",
  },
];

export const anomalyZones: AnomalyZone[] = [
  {
    id: "anomaly-1",
    fieldId: "field-17a",
    fieldName: "Поле 17А",
    crop: "Кукуруза",
    issue: "Засоление почвы",
    forecast: "Вероятен недобор урожая",
    severity: "critical",
    lat: 43.45,
    lng: 77.13,
  },
  {
    id: "anomaly-2",
    fieldId: "field-05c",
    fieldName: "Поле 05C",
    crop: "Пшеница",
    issue: "Недостаток влаги",
    forecast: "Требуется корректировка полива",
    severity: "warning",
    lat: 43.87,
    lng: 75.18,
  },
  {
    id: "anomaly-3",
    fieldId: "field-22f",
    fieldName: "Поле 22F",
    crop: "Хлопок",
    issue: "Перегрев растений",
    forecast: "Мониторинг 48 часов",
    severity: "warning",
    lat: 42.32,
    lng: 69.59,
  },
];

export const regions: RegionOption[] = [
  { id: "all", name: "Все регионы" },
  { id: "alm", name: "Алматинская область" },
  { id: "zhm", name: "Жамбылская область" },
  { id: "trk", name: "Туркестанская область" },
  { id: "atk", name: "Актюбинская область" },
];

export const notificationFeed: NotificationItem[] = [
  {
    id: "notification-1",
    title: "Обновлен прогноз по Туркестану",
    description: "AI повысил прогноз урожайности хлопка на +2.1%",
    timestamp: "12.11.2025 10:25",
    actionLabel: "Открыть прогноз",
  },
  {
    id: "notification-2",
    title: "Новые снимки Sentinel-2",
    description: "Доступно 6 новых сцен высокого разрешения за 10.11.2025",
    timestamp: "12.11.2025 08:05",
  },
  {
    id: "notification-3",
    title: "Порог влажности",
    description: "3 поля превысили лимит нормы полива > 20%",
    timestamp: "11.11.2025 19:54",
    actionLabel: "Просмотреть поля",
  },
];

export const fieldsSnapshot: FieldSnapshot[] = [
  {
    id: "field-17a",
    name: "Поле 17А",
    region: "Алматинская область",
    crop: "Кукуруза",
    ndvi: 0.52,
    soilMoisture: 41,
    irrigationStatus: "increase",
    lastUpdate: "2 часа назад",
    forecast: "Рост риска до 78% без коррекции",
  },
  {
    id: "field-05c",
    name: "Поле 05C",
    region: "Жамбылская область",
    crop: "Пшеница",
    ndvi: 0.63,
    soilMoisture: 55,
    irrigationStatus: "stable",
    lastUpdate: "45 минут назад",
    forecast: "Стабильная динамика при текущем поливе",
  },
  {
    id: "field-22f",
    name: "Поле 22F",
    region: "Туркестанская область",
    crop: "Хлопок",
    ndvi: 0.48,
    soilMoisture: 37,
    irrigationStatus: "increase",
    lastUpdate: "4 часа назад",
    forecast: "Требуется затенение и капельное орошение",
  },
  {
    id: "field-11k",
    name: "Поле 11K",
    region: "Актюбинская область",
    crop: "Соя",
    ndvi: 0.57,
    soilMoisture: 62,
    irrigationStatus: "decrease",
    lastUpdate: "3 часа назад",
    forecast: "Можно снизить подачу воды на 8%",
  },
];

