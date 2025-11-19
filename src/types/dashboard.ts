export type DashboardSummaryCard = {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  emphasis: "positive" | "negative" | "neutral";
  icon?: string;
  footer?: string;
};

export type TimeSeriesPoint = {
  period: string;
  value: number;
};

export type VegetationSeriesPoint = {
  period: string;
  ndvi: number;
  evi: number;
};

export type CropYieldPoint = {
  crop: string;
  current: number;
  previous: number;
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
  lat: number;
  lng: number;
};

export type RegionOption = {
  id: string;
  name: string;
};

export type IrrigationEfficiencyPoint = {
  period: string;
  consumption: number;
  efficiency: number;
};

export type SeasonalTrendPoint = {
  month: string;
  regionNorth: number;
  regionSouth: number;
  regionEast: number;
};

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

