import os
import uuid
from typing import List
from fastapi import UploadFile, HTTPException
from PIL import Image
import aiofiles
from dotenv import load_dotenv

# Load environment variables
try:
    load_dotenv()
except:
    load_dotenv("config.env")

# Configuration
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./uploads")
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", "10485760"))  # 10MB
ALLOWED_EXTENSIONS = os.getenv("ALLOWED_EXTENSIONS", "jpg,jpeg,png,gif,webp").split(",")

# Create upload directory if it doesn't exist
os.makedirs(UPLOAD_DIR, exist_ok=True)

def is_valid_image_file(filename: str) -> bool:
    """Check if the file has a valid image extension."""
    return any(filename.lower().endswith(ext) for ext in ALLOWED_EXTENSIONS)

def is_valid_file_size(file_size: int) -> bool:
    """Check if the file size is within limits."""
    return file_size <= MAX_FILE_SIZE

async def save_uploaded_file(upload_file: UploadFile) -> str:
    """Save an uploaded file and return the filename."""
    if not is_valid_image_file(upload_file.filename):
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file type. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    if not is_valid_file_size(upload_file.size):
        raise HTTPException(
            status_code=400, 
            detail=f"File too large. Max size: {MAX_FILE_SIZE // 1024 // 1024}MB"
        )
    
    # Generate unique filename
    file_extension = os.path.splitext(upload_file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    # Save file
    async with aiofiles.open(file_path, 'wb') as out_file:
        content = await upload_file.read()
        await out_file.write(content)
    
    # Optimize image after saving
    try:
        optimize_image(file_path)
        print(f"✅ Image optimized: {unique_filename}")
    except Exception as e:
        print(f"⚠️ Image optimization failed: {e}")
    
    return unique_filename

async def save_multiple_files(upload_files: List[UploadFile]) -> List[str]:
    """Save multiple uploaded files and return list of filenames."""
    filenames = []
    for upload_file in upload_files:
        filename = await save_uploaded_file(upload_file)
        filenames.append(filename)
        print(f"✅ Multiple file saved and optimized: {filename}")
    return filenames

def delete_file(filename: str) -> bool:
    """Delete a file from the upload directory."""
    try:
        file_path = os.path.join(UPLOAD_DIR, filename)
        if os.path.exists(file_path):
            os.remove(file_path)
            return True
        return False
    except Exception:
        return False

def get_file_url(filename: str) -> str:
    """Get the URL for a file."""
    return f"/uploads/{filename}"

def optimize_image(file_path: str, max_width: int = 1200, max_height: int = 800) -> str:
    """Optimize an image file."""
    try:
        with Image.open(file_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Resize if necessary
            if img.width > max_width or img.height > max_height:
                img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
            
            # Save optimized image
            optimized_path = file_path.replace('.', '_optimized.')
            img.save(optimized_path, 'JPEG', quality=85, optimize=True)
            
            # Replace original with optimized
            os.replace(optimized_path, file_path)
            
        return file_path
    except Exception as e:
        print(f"Error optimizing image: {e}")
        return file_path 