import type {
  IrrigationEfficiencyPoint,
  SeasonalTrendPoint,
  RegionPerformanceRow,
} from "@/types/dashboard";

export const irrigationEfficiency: IrrigationEfficiencyPoint[] = [
  { period: "Нед 01", consumption: 1280, efficiency: 64 },
  { period: "Нед 02", consumption: 1190, efficiency: 66 },
  { period: "Нед 03", consumption: 1110, efficiency: 71 },
  { period: "Нед 04", consumption: 1030, efficiency: 73 },
  { period: "Нед 05", consumption: 980, efficiency: 78 },
  { period: "Нед 06", consumption: 940, efficiency: 81 },
];

export const seasonalTrends: SeasonalTrendPoint[] = [
  { month: "Март", regionNorth: 0.52, regionSouth: 0.61, regionEast: 0.56 },
  { month: "Апрель", regionNorth: 0.58, regionSouth: 0.68, regionEast: 0.63 },
  { month: "Май", regionNorth: 0.63, regionSouth: 0.74, regionEast: 0.69 },
  { month: "Июнь", regionNorth: 0.67, regionSouth: 0.79, regionEast: 0.72 },
  { month: "Июль", regionNorth: 0.71, regionSouth: 0.82, regionEast: 0.76 },
  { month: "Август", regionNorth: 0.69, regionSouth: 0.78, regionEast: 0.73 },
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

