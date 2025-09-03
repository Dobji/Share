from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminCreate(BaseModel):
    username: str
    email: str
    password: str

class Admin(AdminCreate):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Company Info Schemas
class CompanyInfoBase(BaseModel):
    name: str
    description: str
    mission: str
    experience_years: int
    advantages: str
    main_photo: Optional[str] = None

class CompanyInfoCreate(CompanyInfoBase):
    pass

class CompanyInfo(CompanyInfoBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Project Schemas
class ProjectBase(BaseModel):
    title: str
    short_description: str
    full_description: str
    main_photo: Optional[str] = None
    gallery_photos: Optional[str] = None
    completion_date: Optional[datetime] = None
    area: Optional[str] = None
    location: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    short_description: Optional[str] = None
    full_description: Optional[str] = None
    main_photo: Optional[str] = None
    gallery_photos: Optional[str] = None
    completion_date: Optional[datetime] = None
    area: Optional[str] = None
    location: Optional[str] = None

# API-specific schemas for file handling (these won't be validated by Pydantic)
class ProjectCreateAPI:
    """Schema for project creation API endpoint (handles files separately)"""
    pass

class ProjectUpdateAPI:
    """Schema for project update API endpoint (handles files separately)"""
    pass

class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ProjectList(BaseModel):
    id: int
    title: str
    short_description: str
    main_photo: str
    area: Optional[str] = None
    location: Optional[str] = None

    class Config:
        from_attributes = True

# Contact Request Schemas
class ContactRequestBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: str

class ContactRequestCreate(ContactRequestBase):
    pass

class ContactRequest(ContactRequestBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True 