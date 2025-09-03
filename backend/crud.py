from sqlalchemy.orm import Session
from models import CompanyInfo, Project, ContactRequest
from schemas import CompanyInfoCreate, ProjectCreate, ProjectUpdate, ContactRequestCreate
from typing import List, Optional

# Company Info CRUD
def get_company_info(db: Session) -> Optional[CompanyInfo]:
    return db.query(CompanyInfo).first()

def create_company_info(db: Session, company_info: CompanyInfoCreate) -> CompanyInfo:
    db_company_info = CompanyInfo(**company_info.dict())
    db.add(db_company_info)
    db.commit()
    db.refresh(db_company_info)
    return db_company_info

def update_company_info(db: Session, company_info: CompanyInfoCreate) -> Optional[CompanyInfo]:
    db_company_info = get_company_info(db)
    if db_company_info:
        for key, value in company_info.dict().items():
            setattr(db_company_info, key, value)
        db.commit()
        db.refresh(db_company_info)
    return db_company_info

# Project CRUD
def get_projects(db: Session, skip: int = 0, limit: int = 100) -> List[Project]:
    return db.query(Project).offset(skip).limit(limit).all()

def get_project(db: Session, project_id: int) -> Optional[Project]:
    return db.query(Project).filter(Project.id == project_id).first()

def create_project(db: Session, project: ProjectCreate) -> Project:
    db_project = Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def create_project_raw(db: Session, project_data: dict) -> Project:
    """Create project with raw data (bypasses Pydantic validation)"""
    db_project = Project(**project_data)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def update_project(db: Session, project_id: int, project: ProjectUpdate) -> Optional[Project]:
    db_project = get_project(db, project_id)
    if db_project:
        for key, value in project.dict().items():
            setattr(db_project, key, value)
        db.commit()
        db.refresh(db_project)
    return db_project

def update_project_raw(db: Session, project_id: int, project_data: dict) -> Optional[Project]:
    """Update project with raw data (bypasses Pydantic validation)"""
    db_project = get_project(db, project_id)
    if db_project:
        for key, value in project_data.items():
            if value is not None:  # Only update non-None values
                setattr(db_project, key, value)
        db.commit()
        db.refresh(db_project)
    return db_project

def delete_project(db: Session, project_id: int) -> bool:
    db_project = get_project(db, project_id)
    if db_project:
        db.delete(db_project)
        db.commit()
        return True
    return False

# Contact Request CRUD
def create_contact_request(db: Session, contact_request: ContactRequestCreate) -> ContactRequest:
    db_contact_request = ContactRequest(**contact_request.dict())
    db.add(db_contact_request)
    db.commit()
    db.refresh(db_contact_request)
    return db_contact_request

def get_contact_requests(db: Session, skip: int = 0, limit: int = 100) -> List[ContactRequest]:
    return db.query(ContactRequest).offset(skip).limit(limit).all() 