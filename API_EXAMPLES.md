# Примеры API запросов

## Тестирование API с помощью curl

### 1. Получение информации о компании
```bash
curl -X GET "http://localhost:8000/api/company"
```

### 2. Создание информации о компании
```bash
curl -X POST "http://localhost:8000/api/company" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "СтройМакс",
    "description": "Ведущая строительная компания с многолетним опытом",
    "mission": "Создавать комфортное и качественное жилье",
    "experience_years": 15,
    "advantages": "• 15 лет успешной работы\n• Более 200 реализованных проектов",
    "main_photo": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop"
  }'
```

### 3. Получение списка проектов
```bash
curl -X GET "http://localhost:8000/api/projects"
```

### 4. Получение деталей проекта
```bash
curl -X GET "http://localhost:8000/api/projects/1"
```

### 5. Создание нового проекта
```bash
curl -X POST "http://localhost:8000/api/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Новый жилой комплекс",
    "short_description": "Современный жилой комплекс",
    "full_description": "Подробное описание нового жилого комплекса",
    "main_photo": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    "gallery_photos": "[\"https://example.com/photo1.jpg\", \"https://example.com/photo2.jpg\"]",
    "area": "30,000 м²",
    "location": "Новый район"
  }'
```

### 6. Обновление проекта
```bash
curl -X PUT "http://localhost:8000/api/projects/1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Обновленный жилой комплекс",
    "short_description": "Обновленное краткое описание",
    "full_description": "Обновленное подробное описание",
    "main_photo": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    "area": "35,000 м²",
    "location": "Обновленный район"
  }'
```

### 7. Удаление проекта
```bash
curl -X DELETE "http://localhost:8000/api/projects/1"
```

### 8. Отправка контактной формы
```bash
curl -X POST "http://localhost:8000/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Иван Иванов",
    "email": "ivan@example.com",
    "phone": "+7 (999) 123-45-67",
    "message": "Здравствуйте! Хотел бы обсудить строительный проект."
  }'
```

### 9. Получение списка контактных запросов
```bash
curl -X GET "http://localhost:8000/api/contact"
```

## Тестирование с помощью Postman

### Импорт коллекции
1. Скачайте файл `postman_collection.json` (если доступен)
2. Импортируйте в Postman
3. Установите переменную окружения `base_url` = `http://localhost:8000`

### Тестовые данные

#### Компания
```json
{
  "name": "СтройМакс",
  "description": "Ведущая строительная компания с многолетним опытом в области жилого и коммерческого строительства. Мы специализируемся на создании качественных, современных и экологичных проектов.",
  "mission": "Создавать комфортное и качественное жилье для наших клиентов, используя передовые технологии и материалы.",
  "experience_years": 15,
  "advantages": "• 15 лет успешной работы\n• Более 200 реализованных проектов\n• Собственная команда профессионалов\n• Гарантия качества на все работы\n• Современные технологии строительства",
  "main_photo": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop"
}
```

#### Проект
```json
{
  "title": "Жилой комплекс 'Солнечный'",
  "short_description": "Современный жилой комплекс с развитой инфраструктурой и красивым ландшафтным дизайном.",
  "full_description": "Жилой комплекс 'Солнечный' - это современный проект, включающий 5 жилых корпусов высотой от 12 до 25 этажей. Комплекс расположен в экологически чистом районе города с прекрасной транспортной доступностью.",
  "main_photo": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
  "gallery_photos": "[\"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop\", \"https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop\"]",
  "area": "45,000 м²",
  "location": "Центральный район"
}
```

#### Контактная форма
```json
{
  "name": "Петр Петров",
  "email": "petr@example.com",
  "phone": "+7 (999) 987-65-43",
  "message": "Добрый день! Интересует строительство частного дома. Хотел бы получить консультацию и расчет стоимости."
}
```

## Тестирование с помощью Python

### Скрипт для тестирования API
```python
import requests
import json

BASE_URL = "http://localhost:8000"

def test_api():
    # Тест получения информации о компании
    response = requests.get(f"{BASE_URL}/api/company")
    print(f"Company Info: {response.status_code}")
    if response.status_code == 200:
        print(json.dumps(response.json(), indent=2, ensure_ascii=False))
    
    # Тест получения проектов
    response = requests.get(f"{BASE_URL}/api/projects")
    print(f"\nProjects: {response.status_code}")
    if response.status_code == 200:
        print(json.dumps(response.json(), indent=2, ensure_ascii=False))
    
    # Тест отправки контактной формы
    contact_data = {
        "name": "Тест Тестов",
        "email": "test@example.com",
        "phone": "+7 (999) 111-11-11",
        "message": "Тестовое сообщение"
    }
    response = requests.post(f"{BASE_URL}/api/contact", json=contact_data)
    print(f"\nContact Form: {response.status_code}")
    if response.status_code == 200:
        print(json.dumps(response.json(), indent=2, ensure_ascii=False))

if __name__ == "__main__":
    test_api()
```

## Проверка работоспособности

### 1. Проверка Backend
```bash
# Проверка доступности API
curl -X GET "http://localhost:8000/"

# Проверка документации API
# Откройте в браузере: http://localhost:8000/docs
```

### 2. Проверка Frontend
```bash
# Откройте в браузере: http://localhost:3000
# Проверьте все страницы и функциональность
```

### 3. Проверка базы данных
```bash
# Подключитесь к PostgreSQL
psql -U username -d construction_company

# Проверьте таблицы
\dt

# Проверьте данные
SELECT * FROM company_info;
SELECT * FROM projects;
SELECT * FROM contact_requests;
```

## Обработка ошибок

### Частые ошибки и решения

#### 1. Connection refused
- Убедитесь, что backend запущен на порту 8000
- Проверьте, что нет конфликтов портов

#### 2. Database connection error
- Проверьте настройки DATABASE_URL
- Убедитесь, что PostgreSQL запущен
- Проверьте права доступа к базе данных

#### 3. CORS error
- Backend настроен для работы с localhost:3000
- Проверьте настройки CORS в main.py

#### 4. Validation error
- Проверьте формат данных в запросе
- Убедитесь, что все обязательные поля заполнены
- Проверьте типы данных (например, experience_years должен быть числом) 