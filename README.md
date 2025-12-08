## AgroSense AI Frontend

Интерактивный интерфейс ИИ-агента для агросектора. Приложение построено на **Next.js (App Router) + TypeScript + MUI** и включает дашборд, аналитику, карты аномалий, карточки полей, обучающие модули и настройки интеграций.

### Технологии
- Next.js 16 (App Router) + React 19
- TypeScript
- MUI 7 + Emotion
- Recharts для графиков
- React-Leaflet + Leaflet для карт
- Axios с готовым клиентом для будущего REST API

### Скрипты
```bash
pnpm install      # установка зависимостей
pnpm dev          # локальная разработка (http://localhost:3000)
pnpm build        # production-сборка
pnpm start        # запуск собранного приложения
pnpm lint         # проверка ESLint
```

### Структура
- `src/app` – маршруты App Router (дашборд, аналитика, поля, обучение, настройки)
- `src/components` – UI-блоки: графики, карты, карточки, провайдеры
- `src/data` – mock-данные, готовые для быстрой смены на реальные API
- `src/data/maps.ts` – GeoJSON-слои для посевов, орошения и аномалий
- `src/lib/api.ts` – конфиг `axios`, подготовленный для интеграции с backend
- `src/theme.ts` – кастомная тема MUI, согласованная со стилями ТЗ

### Подключение к backend
1. Задайте `NEXT_PUBLIC_API_URL` (и при необходимости `NEXT_PUBLIC_API_TOKEN`) в `.env.local`
2. Используйте `apiClient` для вызова REST API
3. Замените mock-данные в `src/data` на реальные запросы

### Дополнительно
- Проект использует pnpm (`packageManager` зафиксирован)
- Карта Leaflet подгружает слой OpenStreetMap и поддерживает отображение зон аномалий
- Все ключевые UI-сценарии из `tz.md` реализованы и готовы к расширению
