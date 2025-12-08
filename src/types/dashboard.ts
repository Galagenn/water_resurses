import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";

export type DashboardSummaryCard = {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  emphasis: "positive" | "negative" | "neutral";
  icon?: string;
  footer?: string;
  breakdown?: {
    region: RegionKey;
    label: string;
    value: string;
    color: string;
  }[];
};

export type RegionKey = "almaty" | "zhambyl" | "turkestan" | "aktobe";

export type RegionSeriesPoint = {
  period: string;
} & Record<RegionKey, number>;

export type RegionVegetationPoint = {
  period: string;
} & {
  [K in RegionKey as `${K}Ndvi`]: number;
} & {
  [K in RegionKey as `${K}Evi`]: number;
};

export type RegionYieldPoint = {
  region: RegionKey;
  value: number;
};

export type ForecastItem = {
  id: string;
  region: string;
  riskLevel: "low" | "medium" | "high";
  riskLabel: string;
  riskProbability: number;
  ndviDelta: number;
  yieldForecast: string;
  comment: string;
};

export type AlertItem = {
  id: string;
  severity: "warning" | "critical";
  severityLabel: string;
  timestamp: string;
  fieldName: string;
  crop: string;
  message: string;
  fieldId: string;
};

export type AnomalyZone = {
  id: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  issue: string;
  forecast: string;
  severity: "warning" | "critical";
  region: RegionKey;
  lat: number;
  lng: number;
};

export type RegionOption = {
  id: string;
  name: string;
};

export type IrrigationEfficiencyPoint = {
  period: string;
} & Record<RegionKey, number>;

export type SeasonalTrendPoint = {
  month: string;
} & Record<RegionKey, number>;

export type RegionPerformanceRow = {
  region: string;
  growthIndex: string;
  yield: string;
  riskLevel: "low" | "medium" | "high";
  riskLabel: string;
  recommendation: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  actionLabel?: string;
};

export type TrainingModule = {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  duration: string;
  level: "basic" | "intermediate" | "advanced";
  levelLabel: string;
};

export type FieldSnapshot = {
  id: string;
  name: string;
  region: string;
  crop: string;
  ndvi: number;
  soilMoisture: number;
  irrigationStatus: "stable" | "increase" | "decrease";
  lastUpdate: string;
  forecast: string;
};

export type ActionPlanTask = {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "completed";
  createdAt: string;
  source?: string; // Источник задачи (например, "Аналитика")
  region?: RegionKey;
  relatedFieldId?: string;
  // Дополнительные данные при смене статуса
  statusNote?: string; // последний комментарий при переводе в работу/завершение
  attachmentName?: string; // имя прикреплённого файла (для фронтенд-мока без реального загрузчика)
};

export type MapFeatureProperties = {
  id: string;
  name: string;
  region?: RegionKey;
  crop?: string;
  irrigationType?: string;
  issue?: string;
  forecast?: string;
  severity?: "warning" | "critical";
  note?: string;
  fill?: string;
};

export type MapFeatureCollection = FeatureCollection<
  Polygon | MultiPolygon,
  MapFeatureProperties
>;

