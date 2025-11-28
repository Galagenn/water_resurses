import type {
  IrrigationEfficiencyPoint,
  SeasonalTrendPoint,
  RegionPerformanceRow,
} from "@/types/dashboard";

export const irrigationEfficiency: IrrigationEfficiencyPoint[] = [
  {
    period: "Нед 01",
    almaty: 62,
    zhambyl: 58,
    turkestan: 65,
    aktobe: 55,
  },
  {
    period: "Нед 02",
    almaty: 64,
    zhambyl: 60,
    turkestan: 67,
    aktobe: 57,
  },
  {
    period: "Нед 03",
    almaty: 67,
    zhambyl: 62,
    turkestan: 70,
    aktobe: 59,
  },
  {
    period: "Нед 04",
    almaty: 70,
    zhambyl: 64,
    turkestan: 73,
    aktobe: 61,
  },
  {
    period: "Нед 05",
    almaty: 73,
    zhambyl: 66,
    turkestan: 76,
    aktobe: 63,
  },
  {
    period: "Нед 06",
    almaty: 75,
    zhambyl: 68,
    turkestan: 78,
    aktobe: 65,
  },
];

export const seasonalTrends: SeasonalTrendPoint[] = [
  {
    month: "Март",
    almaty: 0.58,
    zhambyl: 0.53,
    turkestan: 0.6,
    aktobe: 0.48,
  },
  {
    month: "Апрель",
    almaty: 0.62,
    zhambyl: 0.56,
    turkestan: 0.65,
    aktobe: 0.52,
  },
  {
    month: "Май",
    almaty: 0.66,
    zhambyl: 0.59,
    turkestan: 0.7,
    aktobe: 0.55,
  },
  {
    month: "Июнь",
    almaty: 0.7,
    zhambyl: 0.62,
    turkestan: 0.74,
    aktobe: 0.58,
  },
  {
    month: "Июль",
    almaty: 0.72,
    zhambyl: 0.64,
    turkestan: 0.77,
    aktobe: 0.6,
  },
  {
    month: "Август",
    almaty: 0.7,
    zhambyl: 0.63,
    turkestan: 0.75,
    aktobe: 0.59,
  },
];

export const regionPerformance: RegionPerformanceRow[] = [
  {
    region: "Алматинская область",
    growthIndex: "+6.8%",
    yield: "44 ц/га",
    riskLevel: "medium",
    riskLabel: "Средний",
    recommendation: "Усилить контроль за влажностью на южном кластере",
  },
  {
    region: "Жамбылская область",
    growthIndex: "+3.2%",
    yield: "39 ц/га",
    riskLevel: "high",
    riskLabel: "Высокий",
    recommendation: "Провести внеплановый анализ почвы на засоление",
  },
  {
    region: "Туркестанская область",
    growthIndex: "+8.1%",
    yield: "47 ц/га",
    riskLevel: "low",
    riskLabel: "Низкий",
    recommendation: "Сохранить текущий план и мониторинг каждые 72 часа",
  },
  {
    region: "Актюбинская область",
    growthIndex: "+2.5%",
    yield: "35 ц/га",
    riskLevel: "medium",
    riskLabel: "Средний",
    recommendation: "Запустить пилотный проект по капельному орошению",
  },
];

