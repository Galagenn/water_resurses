import type {
  DashboardSummaryCard,
  RegionSeriesPoint,
  RegionVegetationPoint,
  RegionYieldPoint,
  ForecastItem,
  AlertItem,
  AnomalyZone,
  IrrigationEfficiencyPoint,
  SeasonalTrendPoint,
  RegionPerformanceRow,
  RegionKey,
} from "@/types/dashboard";
import { REGION_KEYS, REGION_META } from "@/constants/regions";
import { regionSummaryStats } from "@/data/dashboard";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const createSeededRandom = (seed: number) => {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

const getUTCBaseDate = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
};

const shiftUTCDate = (date: Date, days: number) => {
  const shifted = new Date(date);
  shifted.setUTCDate(shifted.getUTCDate() - days);
  return shifted;
};

const formatUTCDate = (date: Date) => {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${day}.${month}`;
};

// Генерация данных для временных рядов на основе периода
export const generateWaterUsageData = (days: number): RegionSeriesPoint[] => {
  const data: RegionSeriesPoint[] = [];
  const baseDate = getUTCBaseDate();
  const numPoints = days === 30 ? 10 : days === 90 ? 12 : days <= 7 ? 7 : Math.ceil(days / 2);
  const interval = Math.floor(days / numPoints);
  const rand = createSeededRandom(days * 137);

  for (let i = 0; i < numPoints; i++) {
    const daysAgo = days - i * interval;
    const date = shiftUTCDate(baseDate, daysAgo);

    const periodLabel =
      days <= 30 ? formatUTCDate(date) : `Нед ${i + 1}`;

    const point: Record<string, string | number> = { period: periodLabel };

    REGION_KEYS.forEach((regionKey, regionIndex) => {
      const baseValue = 3.2 - regionIndex * 0.18;
      const regionalVariation = Math.sin(i * 0.25 + regionIndex * 0.2) * 0.25;
      const randomOffset = (rand() - 0.5) * 0.25;
      const value = clamp(baseValue + regionalVariation + randomOffset, 2.0, 4.2);
      point[regionKey] = Math.round(value * 100) / 100;
    });

    data.push(point as RegionSeriesPoint);
  }

  return data;
};

export const generateVegetationData = (days: number): RegionVegetationPoint[] => {
  const data: RegionVegetationPoint[] = [];
  const baseDate = getUTCBaseDate();
  const numPoints = days === 30 ? 10 : days === 90 ? 12 : days <= 7 ? 7 : Math.ceil(days / 2);
  const interval = Math.floor(days / numPoints);
  const rand = createSeededRandom(days * 211);

  for (let i = 0; i < numPoints; i++) {
    const daysAgo = days - i * interval;
    const date = shiftUTCDate(baseDate, daysAgo);

    const periodLabel =
      days <= 30 ? formatUTCDate(date) : `Нед ${i + 1}`;

    const point: Record<string, string | number> = { period: periodLabel };

    REGION_KEYS.forEach((regionKey, regionIndex) => {
      const ndviBase = 0.62 + regionIndex * 0.02;
      const eviBase = 0.48 + regionIndex * 0.015;
      const ndviVariation = Math.sin(i * 0.2 + regionIndex * 0.1) * 0.05;
      const eviVariation = Math.cos(i * 0.2 + regionIndex * 0.15) * 0.04;

      point[`${regionKey}Ndvi`] =
        Math.round(clamp(ndviBase + ndviVariation + (rand() - 0.5) * 0.03, 0.45, 0.85) * 100) / 100;
      point[`${regionKey}Evi`] =
        Math.round(clamp(eviBase + eviVariation + (rand() - 0.5) * 0.02, 0.4, 0.7) * 100) / 100;
    });

    data.push(point as RegionVegetationPoint);
  }

  return data;
};

const clampRegions = (regions?: RegionKey[]) => (regions && regions.length ? regions : REGION_KEYS);

const formatNumber = (value: number, fractionDigits = 1) => Number(value.toFixed(fractionDigits));

// Обновление summary cards на основе периода и выбранных регионов
// ВАЖНО: значения должны заметно отличаться между, например, 7 и 14 днями
export const generateSummaryCards = (days: number, regions?: RegionKey[]): DashboardSummaryCard[] => {
  const activeRegions = clampRegions(regions);

  // Нормализованный коэффициент периода:
  // 7 дн ≈ 0.3, 14 дн ≈ 0.6, 30 дн ≈ 1, 90 дн ≈ 2
  const normalized = clamp(days / 30, 0.25, 3);

  // Отдельные факторы для разных метрик, чтобы 7 и 14 дней действительно отличались
  const waterFactor = clamp(0.4 + normalized * 0.9, 0.4, 2.7); // сильнее зависит от периода
  const coverageFactor = clamp(0.9 + (normalized - 1) * 0.12, 0.85, 1.15); // мягкое изменение
  const yieldFactor = clamp(0.95 + (normalized - 1) * 0.1, 0.9, 1.25); // умеренное изменение
  const alertsFactor = clamp(0.5 + normalized * 1.1, 0.5, 3); // больше период — больше алертов

  const stats = activeRegions.map((region) => regionSummaryStats[region]);

  type StatKey = keyof (typeof regionSummaryStats)[RegionKey];

  const sumStat = (key: StatKey) => stats.reduce((sum, stat) => sum + stat[key], 0);
  const avgStat = (key: StatKey) => sumStat(key) / stats.length;

  const buildBreakdown = (key: StatKey, formatter: (value: number) => string, scale = 1) =>
    activeRegions.map((region) => {
      const baseValue = regionSummaryStats[region][key];
      const scaledValue = baseValue * scale;
      return {
        region,
        label: REGION_META[region].label,
        value: formatter(scaledValue),
        color: REGION_META[region].color,
      };
    });

  const waterTotal = sumStat("water") * waterFactor;
  const coverageAvg = avgStat("coverage") * coverageFactor;
  const yieldAvg = avgStat("yield") * yieldFactor;
  const alertsTotal = sumStat("alerts") * alertsFactor;
  const criticalAlerts = Math.round(sumStat("criticalAlerts") * alertsFactor);

  return [
    {
      id: "water",
      label: "Использование воды",
      value: `${waterTotal.toFixed(1)} млн м³`,
      change: formatNumber(avgStat("waterChange") * waterFactor),
      emphasis: "positive",
      icon: "💧",
      footer: `Суммарно по ${activeRegions.length} регионам`,
      breakdown: buildBreakdown(
        "water",
        (value) => `${value.toFixed(1)} млн м³`,
        waterFactor
      ),
    },
    {
      id: "coverage",
      label: "Покрытие спутником",
      value: `${clamp(coverageAvg, 0, 100).toFixed(1)}%`,
      change: formatNumber(avgStat("coverageChange") * coverageFactor),
      emphasis: "positive",
      icon: "🛰️",
      footer: "Среднее покрытие по выбранным регионам",
      breakdown: buildBreakdown(
        "coverage",
        (value) => `${clamp(value, 0, 100).toFixed(1)}%`,
        coverageFactor
      ),
    },
    {
      id: "yield",
      label: "Прогноз урожайности",
      value: `${yieldAvg.toFixed(1)} ц/га`,
      change: formatNumber(avgStat("yieldChange") * yieldFactor),
      emphasis: "neutral",
      icon: "🌾",
      footer: "Средний прогноз по культурам",
      breakdown: buildBreakdown(
        "yield",
        (value) => `${value.toFixed(1)} ц/га`,
        yieldFactor
      ),
    },
    {
      id: "alerts",
      label: "Активные оповещения",
      value: Math.round(alertsTotal),
      change: formatNumber(avgStat("alertsChange") * alertsFactor),
      emphasis: "negative",
      icon: "⚠️",
      footer: `${criticalAlerts} критических аномалий`,
      breakdown: buildBreakdown(
        "alerts",
        (value) => `${Math.round(value)} опов.`,
        alertsFactor
      ),
    },
  ];
};

// Фильтрация оповещений по периоду
export const filterAlertsByPeriod = (alerts: AlertItem[], days: number): AlertItem[] => {
  if (!alerts.length) return [];

  // Используем "виртуальное сейчас" как максимальную дату среди алертов,
  // чтобы данные не пропадали из-за того, что mock-даты в прошлом
  const alertDates = alerts.map((alert) => {
    const [datePart] = alert.timestamp.split(" ");
    const [day, month, year] = datePart.split(".").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  });

  const endDate = new Date(Math.max(...alertDates.map((d) => d.getTime())));
  const startDate = shiftUTCDate(endDate, days);

  return alerts.filter((alert, index) => {
    const alertDate = alertDates[index];
    return alertDate >= startDate && alertDate <= endDate;
  });
};

// Фильтрация аномалий (можно оставить все или фильтровать по дате обнаружения)
export const filterAnomaliesByPeriod = (anomalies: AnomalyZone[], days: number): AnomalyZone[] => {
  // Для карты аномалий можно показывать все активные аномалии
  // или фильтровать по дате обнаружения, если добавить поле даты
  return anomalies;
};

// Генерация данных урожайности (может немного изменяться в зависимости от периода)
export const generateCropYieldData = (days: number): RegionYieldPoint[] => {
  const multiplier = clamp(days / 30, 0.5, 2);
  const rand = createSeededRandom(days * 457);

  return REGION_KEYS.map((regionKey, index) => {
    const baseYield = 38 + index * 3.5;
    const variation = (rand() - 0.5) * 4;
    const value = Math.round((baseYield + variation) * multiplier);

    return {
      region: regionKey,
      value,
    };
  });
};

// Прогнозы обычно не зависят от периода, но можно немного скорректировать
export const generateForecastData = (days: number): ForecastItem[] => {
  // Прогнозы остаются относительно стабильными, но можно немного изменить вероятность
  return [
    {
      id: "region-1",
      region: "Алматинская область",
      riskLevel: "high",
      riskLabel: "Высокий риск",
      riskProbability: Math.min(90, Math.round(76 + (days / 30) * 5)),
      ndviDelta: -12.4,
      yieldForecast: "−8% к плану",
      comment: "Увеличить орошение в восточных полях, снизить нагрузку на 3 блок насосов",
    },
    {
      id: "region-2",
      region: "Жамбылская область",
      riskLevel: "medium",
      riskLabel: "Средний риск",
      riskProbability: Math.min(70, Math.round(48 + (days / 30) * 3)),
      ndviDelta: -4.6,
      yieldForecast: "−3% к плану",
      comment: "Провести повторную проверку датчиков влажности, возможен сбой",
    },
    {
      id: "region-3",
      region: "Туркестанская область",
      riskLevel: "low",
      riskLabel: "Низкий риск",
      riskProbability: Math.max(10, Math.round(21 - (days / 30) * 2)),
      ndviDelta: 2.3,
      yieldForecast: "+4% к плану",
      comment: "Сохранить текущий режим орошения, оптимальный статус",
    },
  ];
};

// Генерация данных эффективности орошения
export const generateIrrigationEfficiencyData = (days: number): IrrigationEfficiencyPoint[] => {
  const data: IrrigationEfficiencyPoint[] = [];
  const baseDate = getUTCBaseDate();
  const numPoints = days === 30 ? 10 : days === 90 ? 12 : days <= 7 ? 7 : Math.ceil(days / 2);
  const interval = Math.floor(days / numPoints);
  const rand = createSeededRandom(days * 331);

  for (let i = 0; i < numPoints; i++) {
    const daysAgo = (numPoints - i - 1) * interval;
    const date = shiftUTCDate(baseDate, daysAgo);
    const periodLabel = days <= 30 ? formatUTCDate(date) : `Нед ${i + 1}`;

    const baseValues: Record<RegionKey, number> = {
      almaty: 66 + i * 1.5,
      zhambyl: 62 + i * 1.2,
      turkestan: 69 + i * 1.7,
      aktobe: 58 + i * 1.1,
    };

    const point: IrrigationEfficiencyPoint = { period: periodLabel } as IrrigationEfficiencyPoint;

    REGION_KEYS.forEach((regionKey) => {
      const noise = (rand() - 0.5) * 3;
      const value = clamp(baseValues[regionKey] + noise, 55, 90);
      (point as any)[regionKey] = Math.round(value * 10) / 10;
    });

    data.push(point);
  }

  return data;
};

export const generateSeasonalTrendsData = (days: number): SeasonalTrendPoint[] => {
  const baseDate = getUTCBaseDate();
  const numPoints = days === 30 ? 10 : days === 90 ? 12 : days <= 7 ? 7 : Math.max(2, Math.ceil(days / 2));
  const interval = Math.floor(days / numPoints);
  const rand = createSeededRandom(days * 503);

  return Array.from({ length: numPoints }, (_, index) => {
    const daysAgo = days - index * interval;
    const date = shiftUTCDate(baseDate, daysAgo);
    const label = days <= 30 ? formatUTCDate(date) : `Нед ${index + 1}`;

    const baseValues: Record<RegionKey, number> = {
      almaty: 0.60 + index * 0.02,
      zhambyl: 0.55 + index * 0.018,
      turkestan: 0.62 + index * 0.022,
      aktobe: 0.5 + index * 0.017,
    };

    const point: SeasonalTrendPoint = { month: label } as SeasonalTrendPoint;

    REGION_KEYS.forEach((regionKey) => {
      const noise = (rand() - 0.5) * 0.04;
      const clamped = clamp(baseValues[regionKey] + noise, 0.45, 0.9);
      (point as any)[regionKey] = Math.round(clamped * 100) / 100;
    });

    return point;
  });
};

export const generateRegionPerformanceData = (
  baseRows: RegionPerformanceRow[],
  days: number
): RegionPerformanceRow[] => {
  const scale = clamp(days / 30, 0.6, 3);
  const rand = createSeededRandom(days * 613);

  return baseRows.map((row, index) => {
    const growthValue = parseFloat(row.growthIndex.replace("%", ""));
    const growthAdjustment = (rand() - 0.5) * 1.2;
    const newGrowth = growthValue * scale + growthAdjustment;

    const yieldValue = parseFloat(row.yield);
    const yieldAdjustment = (rand() - 0.5) * 2;
    const newYield = clamp(yieldValue * scale + yieldAdjustment, 28, 65);

    return {
      ...row,
      growthIndex: `${newGrowth >= 0 ? "+" : ""}${newGrowth.toFixed(1)}%`,
      yield: `${Math.round(newYield)} ц/га`,
    };
  });
};

