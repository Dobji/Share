# 🚀 Быстрый запуск СтройМакс

## 1. Установка зависимостей

### Backend
```bash
cd backend
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend
npm install
```

## 2. Настройка Email (опционально)

Email уведомления уже настроены для работы с Yandex SMTP.

Если нужно изменить настройки, отредактируйте `backend/config.env`:
```env
MAIL_USERNAME=ваш_email@yandex.ru
MAIL_PASSWORD=ваш_пароль_приложения
MAIL_FROM=ваш_email@yandex.ru
MAIL_PORT=587
MAIL_SERVER=smtp.yandex.ru
MAIL_FROM_NAME=Название компании
```

## 3. Запуск

### Backend
```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm start
```

## 4. Доступ

- **Сайт**: http://localhost:3000
- **Админ-панель**: http://localhost:3000/admin/login
  - Логин: `admin`
  - Пароль: `admin123`
- **API документация**: http://localhost:8000/docs

## ✨ Возможности

- **Telegram интеграция** - ссылки на социальные сети
- **Email уведомления** - автоматические уведомления на указанный email
- **Автоответы клиентам** - подтверждение получения сообщений

## 🔧 Устранение проблем

- **Email не работает**: проверьте настройки в `config.env`
- **Сервер не запускается**: проверьте, что порты 3000 и 8000 свободны
- **Зависимости не установились**: используйте `pip install -r requirements.txt` 