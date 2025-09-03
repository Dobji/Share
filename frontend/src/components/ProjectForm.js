import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

const ProjectForm = ({ project = null, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    full_description: '',
    area: '',
    location: ''
  });
  
  const [mainPhoto, setMainPhoto] = useState(null);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [errors, setErrors] = useState({});

  const isEditing = !!project;

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        short_description: project.short_description || '',
        full_description: project.full_description || '',
        area: project.area || '',
        location: project.location || ''
      });
      
      if (project.main_photo) {
        setMainPhoto(project.main_photo);
      }
      
      if (project.gallery_photos) {
        // Split by comma and filter out empty strings, then map to objects with type indicator
        const existingPhotos = project.gallery_photos.split(',')
          .filter(p => p.trim())
          .map(photo => ({ 
            filename: photo.trim(), 
            isExisting: true,
            url: photo.trim().startsWith('http') ? photo.trim() : `http://localhost:8000/uploads/${photo.trim()}`
          }));
        setGalleryPhotos(existingPhotos);
      } else {
        setGalleryPhotos([]);
      }
    } else {
      setFormData({
        title: '',
        short_description: '',
        full_description: '',
        area: '',
        location: ''
      });
      setMainPhoto(null);
      setGalleryPhotos([]);
    }
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название проекта обязательно';
    }
    
    if (!formData.short_description.trim()) {
      newErrors.short_description = 'Краткое описание обязательно';
    }
    
    if (!formData.full_description.trim()) {
      newErrors.full_description = 'Полное описание обязательно';
    }
    
    if (!mainPhoto && !isEditing) {
      newErrors.mainPhoto = 'Главное фото обязательно';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = new FormData();
    
    // Add form fields
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    });
    
    // Add main photo
    if (mainPhoto && typeof mainPhoto === 'object') {
      submitData.append('main_photo', mainPhoto);
    }
    
    // Handle gallery photos for editing vs creating
    if (isEditing) {
      // When editing, we need to handle existing vs new photos carefully
      const newPhotos = galleryPhotos.filter(photo => photo instanceof File);
      const existingPhotos = galleryPhotos.filter(photo => 
        typeof photo === 'string' || (typeof photo === 'object' && photo.isExisting)
      );
      
      console.log('🔄 Processing gallery photos for editing:');
      console.log('   New photos (File objects):', newPhotos.length);
      console.log('   Existing photos:', existingPhotos.length);
      
      if (newPhotos.length > 0) {
        // If there are new photos, send them as separate entries
        // Each file should be added with the same name 'gallery_photos'
        newPhotos.forEach((photo, index) => {
          console.log(`   Adding photo ${index + 1} to FormData: ${photo.name}, size: ${photo.size}`);
          submitData.append('gallery_photos', photo);
        });
        console.log('   Added new photos to FormData');
        
        // Debug: Log FormData contents
        console.log('   FormData contents after adding gallery photos:');
        for (let [key, value] of submitData.entries()) {
          if (value instanceof File) {
            console.log(`     ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
          } else {
            console.log(`     ${key}: ${value}`);
          }
        }
      } else if (galleryPhotos.length === 0) {
        // If gallery is completely empty, send a separate field to indicate clearing
        submitData.append('clear_gallery', 'true');
        console.log('   Added clear_gallery flag to FormData');
      } else if (existingPhotos.length > 0 && newPhotos.length === 0) {
        // If there are only existing photos and no new ones, don't send gallery_photos field
        // This will keep the existing gallery unchanged
        console.log('   Keeping existing gallery unchanged - no new photos to add');
      }
    } else {
      // When creating new project, send all gallery photos
      const newPhotos = galleryPhotos.filter(photo => photo instanceof File);
      console.log('🔄 Creating new project with gallery photos:');
      console.log('   New photos (File objects):', newPhotos.length);
      
      if (newPhotos.length > 0) {
        // Send each photo as a separate entry with the same name
        newPhotos.forEach((photo, index) => {
          console.log(`   Adding photo ${index + 1} to FormData: ${photo.name}, size: ${photo.size}`);
          submitData.append('gallery_photos', photo);
        });
        console.log('   Added gallery photos to FormData for new project');
        
        // Debug: Log FormData contents
        console.log('   FormData contents after adding gallery photos:');
        for (let [key, value] of submitData.entries()) {
          if (value instanceof File) {
            console.log(`     ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
          } else {
            console.log(`     ${key}: ${value}`);
          }
        }
      }
    }
    
    // Debug logging
    console.log('🔄 Submitting form data:');
    console.log('   Form data:', formData);
    console.log('   Main photo:', mainPhoto);
    console.log('   Gallery photos:', galleryPhotos);
    console.log('   Is editing:', isEditing);
    
    // Enhanced FormData validation
    console.log('🔄 FormData validation:');
    let galleryPhotosCount = 0;
    let mainPhotoCount = 0;
    let otherFieldsCount = 0;
    
    for (let [key, value] of submitData.entries()) {
      if (key === 'gallery_photos') {
        galleryPhotosCount++;
        if (value instanceof File) {
          console.log(`   gallery_photos ${galleryPhotosCount}: File(${value.name}, ${value.size} bytes, ${value.type})`);
        } else {
          console.log(`   gallery_photos ${galleryPhotosCount}: ${value} (not a File)`);
        }
      } else if (key === 'main_photo') {
        mainPhotoCount++;
        if (value instanceof File) {
          console.log(`   main_photo ${mainPhotoCount}: File(${value.name}, ${value.size} bytes, ${value.type})`);
        } else {
          console.log(`   main_photo ${mainPhotoCount}: ${value} (not a File)`);
        }
      } else {
        otherFieldsCount++;
        console.log(`   ${key}: ${value}`);
      }
    }
    
    console.log(`   FormData summary: ${galleryPhotosCount} gallery photos, ${mainPhotoCount} main photos, ${otherFieldsCount} other fields`);
    
    // Validate that we have the expected number of files
    const expectedGalleryPhotos = galleryPhotos.filter(photo => photo instanceof File).length;
    if (galleryPhotosCount !== expectedGalleryPhotos) {
      console.error(`❌ Mismatch: Expected ${expectedGalleryPhotos} gallery photos, but FormData has ${galleryPhotosCount}`);
      console.error('   This suggests a problem with FormData formation');
    } else {
      console.log(`✅ FormData validation passed: ${galleryPhotosCount} gallery photos correctly added`);
    }
    
    onSubmit(submitData);
  };

  const handleMainPhotoChange = (photo) => {
    setMainPhoto(photo);
    if (errors.mainPhoto) {
      setErrors(prev => ({ ...prev, mainPhoto: '' }));
    }
  };

  const handleGalleryPhotosChange = (photos) => {
    console.log('🔄 ProjectForm: Received', photos?.length || 0, 'photos');
    setGalleryPhotos(photos || []);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Название проекта *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            errors.title ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Введите название проекта"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Short Description */}
      <div>
        <label htmlFor="short_description" className="block text-sm font-medium text-gray-700">
          Краткое описание *
        </label>
        <textarea
          id="short_description"
          name="short_description"
          rows={3}
          value={formData.short_description}
          onChange={handleInputChange}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            errors.short_description ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Краткое описание для карточки проекта"
        />
        {errors.short_description && (
          <p className="mt-1 text-sm text-red-600">{errors.short_description}</p>
        )}
      </div>

      {/* Full Description */}
      <div>
        <label htmlFor="full_description" className="block text-sm font-medium text-gray-700">
          Полное описание *
        </label>
        <textarea
          id="full_description"
          name="full_description"
          rows={6}
          value={formData.full_description}
          onChange={handleInputChange}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            errors.full_description ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Подробное описание проекта"
        />
        {errors.full_description && (
          <p className="mt-1 text-sm text-red-600">{errors.full_description}</p>
        )}
      </div>

      {/* Area and Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">
            Площадь
          </label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Например: 150 м²"
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Местоположение
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Например: Москва, ул. Примерная"
          />
        </div>
      </div>

      {/* Main Photo */}
      <div>
        <ImageUpload
          label="Главное фото *"
          required={!isEditing}
          onImagesChange={handleMainPhotoChange}
          currentImages={mainPhoto ? [mainPhoto] : []}
          maxFiles={1}
        />
        {errors.mainPhoto && (
          <p className="mt-1 text-sm text-red-600">{errors.mainPhoto}</p>
        )}
      </div>

      {/* Gallery Photos */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Фотографии галереи
        </label>
        <div className="mt-1">
          <ImageUpload
            label=""
            multiple={true}
            onImagesChange={handleGalleryPhotosChange}
            currentImages={galleryPhotos}
            maxFiles={9} // Изменяем на 9 файлов
            maxSize={10}
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Вы можете выбрать несколько фотографий одновременно (до 9 файлов). 
          Поддерживаются форматы: PNG, JPG, GIF до 10MB каждая.
        </p>
        {galleryPhotos.length > 0 && (
          <div className="mt-2 p-2 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              📸 Выбрано фотографий: {galleryPhotos.filter(p => p instanceof File).length} новых + {galleryPhotos.filter(p => !(p instanceof File)).length} существующих
            </p>
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Отмена
        </button>
        
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Сохранение...
            </>
          ) : (
            isEditing ? 'Обновить проект' : 'Создать проект'
          )}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm; 