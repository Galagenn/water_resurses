import type {
  AlertItem,
  AnomalyZone,
  RegionYieldPoint,
  DashboardSummaryCard,
  ForecastItem,
  RegionOption,
  RegionSeriesPoint,
  RegionVegetationPoint,
  FieldSnapshot,
  NotificationItem,
  RegionKey,
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

type RegionSummaryStat = {
  water: number;
  waterChange: number;
  coverage: number;
  coverageChange: number;
  yield: number;
  yieldChange: number;
  alerts: number;
  alertsChange: number;
  criticalAlerts: number;
};

export const regionSummaryStats: Record<RegionKey, RegionSummaryStat> = {
  almaty: {
    water: 5.3,
    waterChange: -3.4,
    coverage: 95,
    coverageChange: 3.6,
    yield: 44.5,
    yieldChange: 2.1,
    alerts: 4,
    alertsChange: 6.4,
    criticalAlerts: 2,
  },
  zhambyl: {
    water: 4.7,
    waterChange: -2.8,
    coverage: 90,
    coverageChange: 2.4,
    yield: 39.2,
    yieldChange: 1.0,
    alerts: 3,
    alertsChange: 5.2,
    criticalAlerts: 1,
  },
  turkestan: {
    water: 5.9,
    waterChange: -4.1,
    coverage: 88,
    coverageChange: 1.7,
    yield: 47.3,
    yieldChange: 2.7,
    alerts: 2,
    alertsChange: 4.1,
    criticalAlerts: 1,
  },
  aktobe: {
    water: 3.8,
    waterChange: -1.9,
    coverage: 93,
    coverageChange: 3.1,
    yield: 36.5,
    yieldChange: 0.8,
    alerts: 3,
    alertsChange: 3.6,
    criticalAlerts: 1,
  },
};

export const waterUsageSeries: RegionSeriesPoint[] = [
  { period: "Нед 01", almaty: 3.4, zhambyl: 2.9, turkestan: 3.1, aktobe: 2.6 },
  { period: "Нед 02", almaty: 3.6, zhambyl: 3.1, turkestan: 3.2, aktobe: 2.7 },
  { period: "Нед 03", almaty: 3.2, zhambyl: 2.8, turkestan: 3.0, aktobe: 2.5 },
  { period: "Нед 04", almaty: 3.0, zhambyl: 2.7, turkestan: 2.9, aktobe: 2.4 },
  { period: "Нед 05", almaty: 2.9, zhambyl: 2.6, turkestan: 2.8, aktobe: 2.3 },
  { period: "Нед 06", almaty: 2.8, zhambyl: 2.5, turkestan: 2.7, aktobe: 2.2 },
];

export const vegetationSeries: RegionVegetationPoint[] = [
  {
    period: "Нед 01",
    almatyNdvi: 0.64,
    almatyEvi: 0.49,
    zhambylNdvi: 0.6,
    zhambylEvi: 0.46,
    turkestanNdvi: 0.67,
    turkestanEvi: 0.52,
    aktobeNdvi: 0.58,
    aktobeEvi: 0.44,
  },
  {
    period: "Нед 02",
    almatyNdvi: 0.66,
    almatyEvi: 0.51,
    zhambylNdvi: 0.62,
    zhambylEvi: 0.48,
    turkestanNdvi: 0.69,
    turkestanEvi: 0.54,
    aktobeNdvi: 0.6,
    aktobeEvi: 0.46,
  },
  {
    period: "Нед 03",
    almatyNdvi: 0.68,
    almatyEvi: 0.52,
    zhambylNdvi: 0.64,
    zhambylEvi: 0.5,
    turkestanNdvi: 0.72,
    turkestanEvi: 0.56,
    aktobeNdvi: 0.62,
    aktobeEvi: 0.47,
  },
  {
    period: "Нед 04",
    almatyNdvi: 0.67,
    almatyEvi: 0.51,
    zhambylNdvi: 0.63,
    zhambylEvi: 0.49,
    turkestanNdvi: 0.7,
    turkestanEvi: 0.55,
    aktobeNdvi: 0.61,
    aktobeEvi: 0.46,
  },
  {
    period: "Нед 05",
    almatyNdvi: 0.63,
    almatyEvi: 0.48,
    zhambylNdvi: 0.6,
    zhambylEvi: 0.46,
    turkestanNdvi: 0.66,
    turkestanEvi: 0.52,
    aktobeNdvi: 0.58,
    aktobeEvi: 0.44,
  },
  {
    period: "Нед 06",
    almatyNdvi: 0.6,
    almatyEvi: 0.46,
    zhambylNdvi: 0.57,
    zhambylEvi: 0.44,
    turkestanNdvi: 0.63,
    turkestanEvi: 0.5,
    aktobeNdvi: 0.55,
    aktobeEvi: 0.42,
  },
];

export const cropYieldSeries: RegionYieldPoint[] = [
  { region: "almaty", value: 44 },
  { region: "zhambyl", value: 39 },
  { region: "turkestan", value: 47 },
  { region: "aktobe", value: 36 },
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
    region: "almaty",
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
    region: "zhambyl",
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
    region: "turkestan",
    lat: 42.32,
    lng: 69.59,
  },
  {
    id: "anomaly-4",
    fieldId: "field-11k",
    fieldName: "Поле 11K",
    crop: "Соя",
    issue: "Снижение влажности почвы",
    forecast: "Добавить ночной полив +10%",
    severity: "warning",
    region: "aktobe",
    lat: 49.95,
    lng: 57.15,
  },
];

export const regions: RegionOption[] = [
  { id: "almaty", name: "Алматинская область" },
  { id: "zhambyl", name: "Жамбылская область" },
  { id: "turkestan", name: "Туркестанская область" },
  { id: "aktobe", name: "Актюбинская область" },
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

