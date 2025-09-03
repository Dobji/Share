# Инструкция по настройке и запуску

## Предварительные требования

### 1. Установка Python
- Python 3.8 или выше
- pip (менеджер пакетов Python)

### 2. Установка Node.js
- Node.js 16 или выше
- npm (менеджер пакетов Node.js)

### 3. Установка PostgreSQL
- PostgreSQL 12 или выше
- Создать базу данных `construction_company`

## Быстрая настройка (Windows)

### 1. Инициализация базы данных
```bash
# Запустите файл init_database.bat
# Или выполните команды вручную:
cd backend
pip install -r requirements.txt
python init_db.py
```

### 2. Запуск приложения
```bash
# Запустите файл start.bat
# Или выполните команды вручную:
```

## Ручная настройка

### 1. Настройка базы данных

#### Создание базы данных PostgreSQL
```sql
CREATE DATABASE construction_company;
```

#### Настройка переменных окружения
Создайте файл `.env` в папке `backend` на основе `env_example.txt`:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/construction_company
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 2. Установка зависимостей Backend
```bash
cd backend
pip install -r requirements.txt
```

### 3. Инициализация базы данных
```bash
cd backend
python init_db.py
```

### 4. Установка зависимостей Frontend
```bash
cd frontend
npm install
```

### 5. Запуск Backend
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 6. Запуск Frontend (в новом терминале)
```bash
cd frontend
npm start
```

## Доступ к приложению

- **Backend API**: http://localhost:8000
- **Frontend**: http://localhost:3000
- **API Documentation**: http://localhost:8000/docs

## Структура проекта

```
Share/
├── backend/                 # FastAPI приложение
│   ├── main.py            # Основной файл приложения
│   ├── models.py          # Модели базы данных
│   ├── schemas.py         # Pydantic схемы
│   ├── crud.py            # CRUD операции
│   ├── database.py        # Настройка БД
│   ├── init_db.py         # Инициализация БД
│   └── requirements.txt   # Python зависимости
├── frontend/               # React приложение
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   ├── pages/         # Страницы приложения
│   │   ├── App.js         # Основной компонент
│   │   └── index.js       # Точка входа
│   ├── package.json       # Node.js зависимости
│   └── tailwind.config.js # Конфигурация TailwindCSS
├── start.bat              # Скрипт запуска (Windows)
├── init_database.bat      # Скрипт инициализации БД
└── README.md              # Документация проекта
```

## API Endpoints

### Company Info
- `GET /api/company` - Получить информацию о компании
- `POST /api/company` - Создать информацию о компании
- `PUT /api/company` - Обновить информацию о компании

### Projects
- `GET /api/projects` - Получить список проектов
- `GET /api/projects/{id}` - Получить детали проекта
- `POST /api/projects` - Создать новый проект
- `PUT /api/projects/{id}` - Обновить проект
- `DELETE /api/projects/{id}` - Удалить проект

### Contact
- `POST /api/contact` - Отправить контактную форму
- `GET /api/contact` - Получить список контактных запросов

## Возможные проблемы и решения

### 1. Ошибка подключения к базе данных
- Проверьте, что PostgreSQL запущен
- Проверьте правильность DATABASE_URL в .env файле
- Убедитесь, что база данных `construction_company` существует

### 2. Ошибка CORS
- Backend настроен для работы с frontend на порту 3000
- Если используете другой порт, измените настройки в `backend/main.py`

### 3. Ошибка при установке зависимостей
- Обновите pip: `python -m pip install --upgrade pip`
- Для Windows может потребоваться Visual C++ Build Tools

### 4. Проблемы с Node.js
- Убедитесь, что используете совместимую версию Node.js
- Очистите кэш npm: `npm cache clean --force`

## Разработка

### Добавление новых страниц
1. Создайте компонент в `frontend/src/pages/`
2. Добавьте роут в `frontend/src/App.js`
3. Добавьте ссылку в навигацию

### Добавление новых API endpoints
1. Создайте модель в `backend/models.py`
2. Создайте схему в `backend/schemas.py`
3. Добавьте CRUD операции в `backend/crud.py`
4. Добавьте endpoint в `backend/main.py`

### Изменение дизайна
- Основные стили в `frontend/src/index.css`
- Компонентные стили используют TailwindCSS классы
- Цветовая схема настраивается в `frontend/tailwind.config.js`

## Развертывание

### Production сборка Frontend
```bash
cd frontend
npm run build
```

### Production запуск Backend
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Поддержка

При возникновении проблем:
1. Проверьте логи в терминалах backend и frontend
2. Убедитесь, что все зависимости установлены
3. Проверьте настройки базы данных
4. Очистите кэш и переустановите зависимости 