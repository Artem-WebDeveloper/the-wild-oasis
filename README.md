# The Wild Oasis 🌄

## Live Demo 
Deploy - **[adorable-wild-oasis.vercel.app](https://adorable-wild-oasis.vercel.app/)** 


<img width="1402" height="734" alt="wild-oasis" src="https://github.com/user-attachments/assets/5dc07cc0-d8cf-4704-b815-23a37984cd04" />

## About

The Wild Oasis — это полноценная система управления отелем для внутреннего использования персоналом. Сотрудники могут управлять номерами, отслеживать бронирования, регистрировать заезд и выезд гостей, следить за загруженностью и настраивать параметры отеля — все в рамках одного удобного дашборда.

Проект на TypeScript, со строгой типизацией на всех уровнях: 
компоненты, хуки, сервисный слой, Zod-схемы форм. Архитектура построена 
по фича-слайсам, бизнес-логика вынесена в кастомные хуки.

## Tech Stack
 
- React
- TypeScript 
- React Router 
- TanStack Query 
- Backend & Auth — Supabase
- Styled Components
- React Hook Form + Zod
- Charts — Recharts

## Features
 
- 🔐 **Аутентификация** — вход/выход с защищёнными маршрутами; доступ только для сотрудников отеля
- 🛖 **Управление номерами** — создание, редактирование и удаление номеров с загрузкой фотографий
- 📅 **Бронирования** — полный цикл: фильтрация по статусу, регистрация заезда и выезда, подключение завтрака
- 📊 **Дашборд** — ключевые метрики в реальном времени (выручка, загруженность, заезды сегодня) и интерактивные графики
- 🌙 **Тёмная тема** — переключатель с сохранением выбора в настройках пользователя
- ⚙️ **Настройки** — цена завтрака, минимальное и максимальное количество ночей, лимит гостей
- 📋 **Валидация форм** — все формы валидируются через React Hook Form
- 🔄 **Оптимистичный UI** — мутации мгновенно обновляют интерфейс, пока данные синхронизируются с Supabase

## Project Structure
 
```
src/
├── features/                   # Фичи - каждая самодостаточный модуль
│   ├── authentication/         #   компоненты + хуки авторизации
│   ├── bookings/               #   таблица, детали, типы бронирований
│   ├── cabins/                 #   CRUD номеров
│   ├── check-in-out/           #   заезд, выезд, активность за день
│   ├── dashboard/              #   графики (Recharts), статистика, фильтры
│   └── settings/               #   форма и хуки настроек отеля
│
├── schemas/                    # Zod-схемы 
│   ├── booking.schema.ts
│   ├── cabin.schema.ts
│   ├── guest.schema.ts
│   └── settings.schema.ts
│
├── services/                   # Типизированный API-слой (Supabase)
│   ├── api.auth.ts
│   ├── api.bookings.ts
│   ├── api.cabins.ts
│   ├── api.settings.ts
│   └── supabase.ts
│
├── types/                      # Глобальные интерфейсы и типы БД
├── hooks/                      # Общие хуки 
├── contexts/                   # DarkMode контекст
├── pages/                      # Страницы-роуты (только композиция)
├── ui/                         # Переиспользуемые UI-компоненты
└── utils/                      # Константы и хелперы
```

## Getting Started Local

### Установка
 
```bash
git clone https://github.com/Artem-WebDeveloper/the-wild-oasis.git
cd the-wild-oasis
npm install
```
 
### Переменные окружения
 
Создайте файл `.env` в корне проекта, потребуется `supabase url` и `api-ключ`:
 
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
 
### Запуск
 
```bash
npm run dev
```
 
 
