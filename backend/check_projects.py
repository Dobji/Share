#!/usr/bin/env python3
"""
Скрипт для проверки данных проектов в базе данных
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine, get_db
from models import Project
from sqlalchemy.orm import Session

def check_projects_data():
    """Проверяет данные проектов в базе данных."""
    db = next(get_db())
    
    try:
        projects = db.query(Project).all()
        print(f"🔍 Найдено проектов: {len(projects)}")
        
        for i, project in enumerate(projects):
            print(f"\n📋 Проект {i+1}:")
            print(f"   ID: {project.id}")
            print(f"   Название: {project.title}")
            print(f"   Главное фото: {project.main_photo}")
            print(f"   Галерея: {project.gallery_photos}")
            print(f"   Тип gallery_photos: {type(project.gallery_photos)}")
            
            if project.gallery_photos:
                print(f"   Длина gallery_photos: {len(project.gallery_photos)}")
                print(f"   Содержимое: '{project.gallery_photos}'")
        
    except Exception as e:
        print(f"❌ Ошибка при проверке проектов: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Проверка данных проектов...")
    check_projects_data()
    print("✅ Готово!") 