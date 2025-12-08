import type { MapFeatureCollection } from "@/types/dashboard";

export const cropAreas: MapFeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "crop-almaty-1",
        name: "Поле кукурузы",
        region: "almaty",
        crop: "Кукуруза",
        note: "Плотность посевов 92%",
        fill: "#8BC34A",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [76.75, 43.06],
            [76.95, 43.06],
            [76.95, 43.22],
            [76.75, 43.22],
            [76.75, 43.06],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "crop-zhambyl-1",
        name: "Пшеница",
        region: "zhambyl",
        crop: "Пшеница",
        note: "Стадия кущения",
        fill: "#AED581",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [75.1, 43.72],
            [75.35, 43.72],
            [75.35, 43.94],
            [75.1, 43.94],
            [75.1, 43.72],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "crop-turkestan-1",
        name: "Хлопок",
        region: "turkestan",
        crop: "Хлопок",
        note: "Прогноз +4% к плану",
        fill: "#9CCC65",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [68.92, 42.18],
            [69.18, 42.18],
            [69.18, 42.38],
            [68.92, 42.38],
            [68.92, 42.18],
          ],
        ],
      },
    },
  ],
};

export const irrigatedAreas: MapFeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "irrigation-almaty-1",
        name: "Канал Восточный",
        region: "almaty",
        irrigationType: "капельное",
        note: "Дебит 2.4 м³/с",
        fill: "#0288D1",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [77.12, 43.28],
            [77.32, 43.28],
            [77.32, 43.46],
            [77.12, 43.46],
            [77.12, 43.28],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "irrigation-zhambyl-1",
        name: "Система Жуалы",
        region: "zhambyl",
        irrigationType: "дождевание",
        note: "Режим полива −10% ночью",
        fill: "#039BE5",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [72.98, 43.16],
            [73.22, 43.16],
            [73.22, 43.34],
            [72.98, 43.34],
            [72.98, 43.16],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "irrigation-aktobe-1",
        name: "Поливная система Север",
        region: "aktobe",
        irrigationType: "капельное",
        note: "Снижение подачи на 8%",
        fill: "#03A9F4",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [57.02, 49.85],
            [57.26, 49.85],
            [57.26, 50.05],
            [57.02, 50.05],
            [57.02, 49.85],
          ],
        ],
      },
    },
  ],
};

export const anomalyPolygons: MapFeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "anomaly-1",
        name: "Поле 17А",
        region: "almaty",
        severity: "critical",
        issue: "Засоление почвы",
        forecast: "Недобор урожая без корректировки",
        fill: "#E53935",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [77.08, 43.36],
            [77.22, 43.36],
            [77.22, 43.48],
            [77.08, 43.48],
            [77.08, 43.36],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "anomaly-2",
        name: "Поле 05C",
        region: "zhambyl",
        severity: "warning",
        issue: "Недостаток влаги",
        forecast: "Увеличить норму полива",
        fill: "#FB8C00",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [75.02, 43.56],
            [75.18, 43.56],
            [75.18, 43.74],
            [75.02, 43.74],
            [75.02, 43.56],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "anomaly-3",
        name: "Поле 22F",
        region: "turkestan",
        severity: "warning",
        issue: "Перегрев",
        forecast: "Требуется затенение",
        fill: "#F57C00",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [69.34, 42.26],
            [69.5, 42.26],
            [69.5, 42.44],
            [69.34, 42.44],
            [69.34, 42.26],
          ],
        ],
      },
    },
  ],
};

