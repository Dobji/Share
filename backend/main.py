from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.orm import Session
from typing import List, Optional, Union
from datetime import timedelta, datetime
import crud, models, schemas, auth, file_utils, email_config
from database import engine, get_db
from auth import get_current_admin, create_initial_admin
import os
from dotenv import load_dotenv

# Создаем таблицы в базе данных
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Construction Company API",
    description="API для сайта строительной компании",
    version="1.0.0"
)

# Global exception handler to ensure all errors return strings
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Convert all exceptions to string format for frontend compatibility."""
    if hasattr(exc, 'detail'):
        # If it's already an HTTPException, use its detail
        detail = exc.detail
    else:
        # For other exceptions, convert to string
        detail = str(exc)
    
    # Ensure detail is a string
    if not isinstance(detail, str):
        detail = str(detail)
    
    return JSONResponse(
        status_code=getattr(exc, 'status_code', 500),
        content={"detail": detail}
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    """Handle Pydantic validation errors and convert them to readable strings."""
    errors = []
    for error in exc.errors():
        field = error.get('loc', ['unknown'])[-1] if error.get('loc') else 'unknown'
        message = error.get('msg', 'Validation error')
        errors.append(f"{field}: {message}")
    
    error_message = "; ".join(errors) if errors else "Validation error"
    
    return JSONResponse(
        status_code=422,
        content={"detail": error_message}
    )

# Load environment variables
try:
    load_dotenv()
except:
    load_dotenv("config.env")

# Настройка CORS - должно быть перед всеми роутами
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware для логирования запросов
@app.middleware("http")
async def log_requests(request, call_next):
    print(f"🌐 {request.method} {request.url}")
    print(f"   Headers: {dict(request.headers)}")
    
    # Log basic request info without reading form data
    if request.method in ["POST", "PUT"]:
        content_type = request.headers.get("content-type", "")
        content_length = request.headers.get("content-length", "unknown")
        print(f"   Content-Type: {content_type}")
        print(f"   Content-Length: {content_length}")
    
    response = await call_next(request)
    print(f"   Response: {response.status_code}")
    return response

# Mount static files for uploads
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

async def extract_project_form_data(request: Request):
    """Extract project form data manually to avoid FastAPI validation issues."""
    try:
        form_data = await request.form()
        
        print(f"🔍 Extracting form data:")
        print(f"   Form data keys: {list(form_data.keys())}")
        
        # Extract text fields
        title = form_data.get("title")
        short_description = form_data.get("short_description")
        full_description = form_data.get("full_description")
        area = form_data.get("area")
        location = form_data.get("location")
        clear_gallery = form_data.get("clear_gallery")
        
        # Extract file fields
        main_photo = form_data.get("main_photo")
        
        # Handle gallery photos - FastAPI sends multiple files with same name
        gallery_photos = []
        
        # Check if there are multiple gallery_photos entries
        if "gallery_photos" in form_data:
            # In FastAPI, when multiple files are sent with the same name,
            # they are stored as separate entries in the form data
            # We need to iterate through all entries to find all gallery_photos
            
            # Method 1: Try to get all values if the method exists
            if hasattr(form_data, "getall"):
                all_values = form_data.getall("gallery_photos")
                print(f"   Using getall method, found {len(all_values)} gallery_photos")
            else:
                # Method 2: Manual iteration through form data
                all_values = []
                for key, value in form_data.items():
                    if key == "gallery_photos":
                        all_values.append(value)
                
                print(f"   Manual iteration found {len(all_values)} gallery_photos")
            
            # Filter out None values and ensure we have File objects
            for i, value in enumerate(all_values):
                if value is not None:
                    if hasattr(value, 'filename'):  # It's a file
                        gallery_photos.append(value)
                        print(f"   Added file {i+1}: {value.filename}, size: {value.size}")
        
        print(f"   Final gallery_photos list: {len(gallery_photos)} files")
        
        return {
            "title": title,
            "short_description": short_description,
            "full_description": full_description,
            "area": area,
            "location": location,
            "main_photo": main_photo,
            "gallery_photos": gallery_photos,
            "clear_gallery": clear_gallery
        }
    except Exception as e:
        print(f"❌ Error extracting form data: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=f"Error processing form data: {str(e)}")

@app.get("/")
def read_root():
    return {"message": "Construction Company API"}

@app.get("/test-images")
def test_images():
    """Test endpoint to check uploaded images."""
    import os
    upload_dir = "uploads"
    if os.path.exists(upload_dir):
        files = os.listdir(upload_dir)
        return {
            "message": "Images found",
            "count": len(files),
            "files": files,
            "upload_dir": os.path.abspath(upload_dir)
        }
    return {"message": "Upload directory not found", "upload_dir": os.path.abspath(upload_dir)}

# Company Info endpoints
@app.get("/api/company", response_model=schemas.CompanyInfo)
def get_company_info(db: Session = Depends(get_db)):
    company_info = crud.get_company_info(db)
    if not company_info:
        # Return fallback data instead of 404
        return schemas.CompanyInfo(
            id=1,
            name="СтройМакс",
            description="Ведущая строительная компания с многолетним опытом в области жилого и коммерческого строительства.",
            mission="Создавать комфортное и качественное жилье для наших клиентов, используя передовые технологии и материалы.",
            experience_years=15,
            advantages="• 15 лет успешной работы\n• Более 200 реализованных проектов\n• Собственная команда профессионалов\n• Гарантия качества на все работы\n• Современные технологии строительства",
            main_photo="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
    return company_info

@app.post("/api/company", response_model=schemas.CompanyInfo)
def create_company_info(company_info: schemas.CompanyInfoCreate, db: Session = Depends(get_db)):
    return crud.create_company_info(db=db, company_info=company_info)

@app.put("/api/company", response_model=schemas.CompanyInfo)
def update_company_info(company_info: schemas.CompanyInfoCreate, db: Session = Depends(get_db)):
    updated_info = crud.update_company_info(db=db, company_info=company_info)
    if not updated_info:
        raise HTTPException(status_code=404, detail="Company info not found")
    return updated_info

# Projects endpoints
@app.get("/api/projects", response_model=List[schemas.ProjectList])
def get_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        projects = crud.get_projects(db, skip=skip, limit=limit)
        return projects
    except Exception as e:
        print(f"Error fetching projects: {e}")
        return []  # Return empty list instead of error

@app.get("/api/projects/{project_id}", response_model=schemas.Project)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = crud.get_project(db, project_id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.post("/api/projects", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    return crud.create_project(db=db, project=project)

@app.put("/api/projects/{project_id}", response_model=schemas.Project)
def update_project(project_id: int, project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    updated_project = crud.update_project(db=db, project_id=project_id, project=project)
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project

@app.delete("/api/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    success = crud.delete_project(db=db, project_id=project_id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}

# Contact endpoints
@app.post("/api/contact", response_model=schemas.ContactRequest)
async def create_contact_request(contact_request: schemas.ContactRequestCreate, db: Session = Depends(get_db)):
    """Create a new contact request and send email notifications."""
    try:
        # Create contact request in database
        db_contact_request = crud.create_contact_request(db=db, contact_request=contact_request)
        
        # Prepare data for email
        contact_data = {
            'name': contact_request.name,
            'email': contact_request.email,
            'phone': contact_request.phone,
            'message': contact_request.message,
            'created_at': db_contact_request.created_at.strftime("%Y-%m-%d %H:%M:%S") if db_contact_request.created_at else "Не указано"
        }
        
        # Send email notifications (async)
        try:
            await email_config.send_contact_notification(contact_data)
            print(f"✅ Email notifications sent for contact request from {contact_request.email}")
        except Exception as e:
            print(f"⚠️ Failed to send email notifications: {e}")
            # Don't fail the request if email fails
        
        return db_contact_request
        
    except Exception as e:
        print(f"❌ Error creating contact request: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create contact request: {str(e)}")

@app.get("/api/contact", response_model=List[schemas.ContactRequest])
def get_contact_requests(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_contact_requests(db, skip=skip, limit=limit)

# ===== ADMIN ENDPOINTS =====

@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    """Login endpoint for admin authentication."""
    admin = auth.authenticate_admin(db, username, password)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": admin.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/admin/projects", response_model=schemas.Project)
async def create_project_admin(
    form_data: dict = Depends(extract_project_form_data),
    db: Session = Depends(get_db),
    current_admin: models.Admin = Depends(get_current_admin)
):
    """Create a new project (admin only)."""
    try:
        # Extract fields from form data
        title = form_data.get("title")
        short_description = form_data.get("short_description")
        full_description = form_data.get("full_description")
        area = form_data.get("area")
        location = form_data.get("location")
        main_photo = form_data.get("main_photo")
        gallery_photos = form_data.get("gallery_photos")
        
        print(f"🆕 Creating new project")
        print(f"   Title: {title}")
        print(f"   Short description: {short_description}")
        print(f"   Full description: {full_description}")
        print(f"   Area: {area}")
        print(f"   Location: {location}")
        print(f"   Main photo: {main_photo.filename if main_photo else 'None'}")
        print(f"   Gallery photos: {gallery_photos}")
        
        # Enhanced logging for gallery photos
        if gallery_photos is not None:
            print(f"   Gallery photos type: {type(gallery_photos)}")
            print(f"   Gallery photos count: {len(gallery_photos) if gallery_photos else 0}")
            if gallery_photos:
                for i, photo in enumerate(gallery_photos):
                    if hasattr(photo, 'filename'):
                        print(f"     Photo {i}: filename={photo.filename}, size={photo.size}, type={photo.content_type}")
                        print(f"     Photo {i} object type: {type(photo)}")
                        if hasattr(photo, 'file'):
                            print(f"     Photo {i} has file attribute: {photo.file is not None}")
        else:
            print(f"   Gallery photos is None (not provided)")
        
        # Validate required fields
        if not title or not short_description or not full_description or not main_photo:
            raise HTTPException(status_code=400, detail="Missing required fields")
        
        # Save main photo
        main_photo_filename = await file_utils.save_uploaded_file(main_photo)
        
        # Save gallery photos if provided
        gallery_filenames = []
        if gallery_photos:
            gallery_filenames = await file_utils.save_multiple_files(gallery_photos)
        
        # Create project data manually without Pydantic validation
        project_data = {
            "title": title,
            "short_description": short_description,
            "full_description": full_description,
            "main_photo": main_photo_filename,
            "gallery_photos": ",".join(gallery_filenames) if gallery_filenames else None,
            "area": area,
            "location": location
        }
        
        # Use crud directly with raw data instead of Pydantic schema
        return crud.create_project_raw(db, project_data)
    except Exception as e:
        # Clean up uploaded files on error
        if 'main_photo_filename' in locals():
            file_utils.delete_file(main_photo_filename)
        if 'gallery_filenames' in locals():
            for filename in gallery_filenames:
                file_utils.delete_file(filename)
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/admin/projects/{project_id}", response_model=schemas.Project)
async def update_project_admin(
    project_id: int,
    form_data: dict = Depends(extract_project_form_data),
    db: Session = Depends(get_db),
    current_admin: models.Admin = Depends(get_current_admin)
):
    """Update a project (admin only)."""
    try:
        # Extract fields from form data
        title = form_data.get("title")
        short_description = form_data.get("short_description")
        full_description = form_data.get("full_description")
        area = form_data.get("area")
        location = form_data.get("location")
        main_photo = form_data.get("main_photo")
        gallery_photos = form_data.get("gallery_photos")
        clear_gallery = form_data.get("clear_gallery")
        
        print(f"🔄 Updating project {project_id}")
        print(f"   Title: {title}")
        print(f"   Short description: {short_description}")
        print(f"   Full description: {full_description}")
        print(f"   Area: {area}")
        print(f"   Location: {location}")
        print(f"   Main photo: {main_photo}")
        print(f"   Gallery photos: {gallery_photos}")
        print(f"   Clear gallery flag: {clear_gallery}")
        
        # Enhanced logging for gallery photos
        if gallery_photos is not None:
            print(f"   Gallery photos type: {type(gallery_photos)}")
            print(f"   Gallery photos count: {len(gallery_photos) if gallery_photos else 0}")
            if gallery_photos:
                for i, photo in enumerate(gallery_photos):
                    if hasattr(photo, 'filename'):
                        print(f"     Photo {i}: filename={photo.filename}, size={photo.size}, type={photo.content_type}")
                        print(f"     Photo {i} object type: {type(photo)}")
                        if hasattr(photo, 'file'):
                            print(f"     Photo {i} has file attribute: {photo.file is not None}")
        else:
            print(f"   Gallery photos is None (not provided)")
        
        # Get existing project
        existing_project = crud.get_project(db, project_id)
        if not existing_project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        print(f"   Existing project: {existing_project.title}")
        print(f"   Existing gallery: {existing_project.gallery_photos}")
        print(f"   Existing project data types:")
        print(f"     title: {type(existing_project.title).__name__} = {existing_project.title}")
        print(f"     short_description: {type(existing_project.short_description).__name__} = {existing_project.short_description}")
        print(f"     full_description: {type(existing_project.full_description).__name__} = {existing_project.full_description}")
        print(f"     main_photo: {type(existing_project.main_photo).__name__} = {existing_project.main_photo}")
        print(f"     gallery_photos: {type(existing_project.gallery_photos).__name__} = {existing_project.gallery_photos}")
        print(f"     area: {type(existing_project.area).__name__} = {existing_project.area}")
        print(f"     location: {type(existing_project.location).__name__} = {existing_project.location}")
        
        # Start with existing data
        update_data = {
            "title": existing_project.title,
            "short_description": existing_project.short_description,
            "full_description": existing_project.full_description,
            "main_photo": existing_project.main_photo,
            "gallery_photos": existing_project.gallery_photos,
            "area": existing_project.area,
            "location": existing_project.location
        }
        
        # Update only provided fields
        if title is not None:
            update_data["title"] = title
        if short_description is not None:
            update_data["short_description"] = short_description
        if full_description is not None:
            update_data["full_description"] = full_description
        if area is not None:
            update_data["area"] = area
        if location is not None:
            update_data["location"] = location
        
        # Handle photo updates
        if main_photo:
            print(f"   Updating main photo: {main_photo.filename}")
            # Delete old main photo
            if existing_project.main_photo:
                file_utils.delete_file(existing_project.main_photo)
            # Save new main photo
            main_photo_filename = await file_utils.save_uploaded_file(main_photo)
            update_data["main_photo"] = main_photo_filename
            print(f"   New main photo saved: {main_photo_filename}")
        
        # Handle gallery photos
        if clear_gallery == 'true':
            print(f"   Clearing gallery (clear_gallery flag set)")
            # Delete old gallery photos
            if existing_project.gallery_photos:
                for old_photo in existing_project.gallery_photos.split(","):
                    if old_photo.strip():
                        file_utils.delete_file(old_photo.strip())
            update_data["gallery_photos"] = None
        elif gallery_photos is not None:  # Check if gallery_photos was explicitly passed
            print(f"   Gallery photos provided: {len(gallery_photos)} files")
            if gallery_photos and len(gallery_photos) > 0:  # If new photos are provided
                print(f"   Processing {len(gallery_photos)} new photos")
                
                # Delete old gallery photos
                if existing_project.gallery_photos:
                    print(f"   Deleting old gallery photos")
                    for old_photo in existing_project.gallery_photos.split(","):
                        if old_photo.strip():
                            file_utils.delete_file(old_photo.strip())
                
                # Save new gallery photos
                print(f"   Saving {len(gallery_photos)} new photos...")
                gallery_filenames = await file_utils.save_multiple_files(gallery_photos)
                update_data["gallery_photos"] = ",".join(gallery_filenames)
                print(f"   Successfully saved {len(gallery_filenames)} new photos")
            else:
                print(f"   Gallery photos field provided but empty - keeping existing gallery")
                # If gallery_photos is empty list, keep existing gallery unchanged
                # Don't modify update_data["gallery_photos"]
        else:
            print(f"   No gallery photos provided, keeping existing: {existing_project.gallery_photos}")
        # Note: If gallery_photos is None (not passed), keep existing gallery_photos
        
        print(f"   Final update data: {update_data}")
        
        # Check data types before validation
        print(f"   Data types check:")
        for key, value in update_data.items():
            if value is not None:
                print(f"     {key}: {type(value).__name__} = {value}")
            else:
                print(f"     {key}: None")
        
        # Update project directly with raw data instead of Pydantic validation
        try:
            print(f"   🔍 Attempting to update project with data:")
            for key, value in update_data.items():
                if value is not None:
                    print(f"     {key}: {type(value).__name__} = {repr(value)}")
                else:
                    print(f"     {key}: None")
            
            # Use crud directly with raw data instead of Pydantic schema
            result = crud.update_project_raw(db, project_id, update_data)
            print(f"   Project updated successfully")
            return result
        except Exception as update_error:
            print(f"   ❌ Update error: {update_error}")
            print(f"   ❌ Update data that failed: {update_data}")
            print(f"   ❌ Error type: {type(update_error).__name__}")
            raise HTTPException(status_code=500, detail=f"Update error: {str(update_error)}")
        
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/admin/projects/{project_id}")
async def delete_project_admin(
    project_id: int,
    db: Session = Depends(get_db),
    current_admin: models.Admin = Depends(get_current_admin)
):
    """Delete a project (admin only)."""
    try:
        # Get existing project
        existing_project = crud.get_project(db, project_id)
        if not existing_project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        # Delete associated files
        if existing_project.main_photo:
            file_utils.delete_file(existing_project.main_photo)
        if existing_project.gallery_photos:
            for photo in existing_project.gallery_photos.split(","):
                file_utils.delete_file(photo)
        
        # Delete project from database
        success = crud.delete_project(db, project_id)
        if success:
            return {"message": "Project deleted successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to delete project")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/admin/projects", response_model=List[schemas.Project])
async def get_projects_admin(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_admin: models.Admin = Depends(get_current_admin)
):
    """Get all projects (admin only, with full details)."""
    try:
        print(f"🔍 Админ запрашивает проекты: skip={skip}, limit={limit}")
        projects = crud.get_projects(db, skip=skip, limit=limit)
        print(f"✅ Получено проектов из БД: {len(projects)}")
        
        # Попробуем сериализовать каждый проект
        serialized_projects = []
        for i, project in enumerate(projects):
            try:
                print(f"   🔍 Сериализация проекта {i+1}: {project.title}")
                print(f"      gallery_photos: {project.gallery_photos} (тип: {type(project.gallery_photos)})")
                
                project_schema = schemas.Project.from_orm(project)
                serialized_projects.append(project_schema)
                print(f"   ✅ Проект {i+1}: {project.title} - сериализация успешна")
            except Exception as e:
                print(f"   ❌ Ошибка сериализации проекта {i+1}: {e}")
                print(f"      Детали ошибки: {type(e).__name__}: {str(e)}")
                import traceback
                traceback.print_exc()
                raise HTTPException(status_code=500, detail=f"Ошибка сериализации проекта {i+1}: {e}")
        
        print(f"✅ Все проекты успешно сериализованы: {len(serialized_projects)}")
        return serialized_projects
        
    except Exception as e:
        print(f"❌ Ошибка в админ-эндпоинте: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/admin/verify-token")
async def verify_admin_token(
    current_admin: models.Admin = Depends(get_current_admin)
):
    """Verify if admin token is valid."""
    return {
        "valid": True,
        "username": current_admin.username,
        "message": "Token is valid"
    }

@app.get("/admin/company", response_model=schemas.CompanyInfo)
async def get_company_info_admin(
    db: Session = Depends(get_db),
    current_admin: models.Admin = Depends(get_current_admin)
):
    """Get company info (admin only)."""
    company_info = crud.get_company_info(db)
    if not company_info:
        raise HTTPException(status_code=404, detail="Company info not found")
    return company_info

@app.put("/admin/company", response_model=schemas.CompanyInfo)
async def update_company_info_admin(
    name: str = Form(...),
    description: str = Form(...),
    mission: str = Form(...),
    experience_years: int = Form(...),
    advantages: str = Form(...),
    main_photo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_admin: models.Admin = Depends(get_current_admin)
):
    """Update company info (admin only)."""
    try:
        # Handle photo update
        photo_filename = None
        if main_photo:
            photo_filename = await file_utils.save_uploaded_file(main_photo)
        
        # Create company info update
        company_data = {
            "name": name,
            "description": description,
            "mission": mission,
            "experience_years": experience_years,
            "advantages": advantages,
            "main_photo": photo_filename or "default.jpg"
        }
        
        return crud.update_company_info(db, schemas.CompanyInfoCreate(**company_data))
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Initialize admin user on startup
@app.on_event("startup")
async def startup_event():
    """Initialize admin user and create upload directory on startup."""
    db = next(get_db())
    try:
        create_initial_admin(db)
    finally:
        db.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 