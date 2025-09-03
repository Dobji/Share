#!/usr/bin/env python3
"""
Скрипт для инициализации базы данных с данными о компании
"""

import sys
import os

# Add current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine, get_db
from models import CompanyInfo
from schemas import CompanyInfoCreate
import crud

def init_company_info():
    """Initialize company information in database"""
    print("🏗️ Initializing company information...")
    
    # Create tables
    from models import Base
    Base.metadata.create_all(bind=engine)
    
    # Get database session
    db = next(get_db())
    
    try:
        # Check if company info already exists
        existing_info = crud.get_company_info(db)
        if existing_info:
            print("✅ Company info already exists in database")
            return existing_info
        
        # Create company info
        company_data = CompanyInfoCreate(
            name="СтройМакс",
            description="Ведущая строительная компания с многолетним опытом в области жилого и коммерческого строительства.",
            mission="Создавать комфортное и качественное жилье для наших клиентов, используя передовые технологии и материалы.",
            experience_years=15,
            advantages="• 15 лет успешной работы\n• Более 200 реализованных проектов\n• Собственная команда профессионалов\n• Гарантия качества на все работы\n• Современные технологии строительства",
            main_photo="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop"
        )
        
        company_info = crud.create_company_info(db=db, company_info=company_data)
        print("✅ Company info created successfully!")
        print(f"   Name: {company_info.name}")
        print(f"   Description: {company_info.description[:50]}...")
        return company_info
        
    except Exception as e:
        print(f"❌ Error creating company info: {e}")
        return None
    finally:
        db.close()

if __name__ == "__main__":
    init_company_info()
    print("🎉 Company initialization completed!") 