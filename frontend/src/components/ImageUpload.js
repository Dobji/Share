import React, { useState, useRef, useEffect } from 'react';

const ImageUpload = ({ 
  label, 
  required = false, 
  multiple = false, 
  onImagesChange, 
  currentImages = [], 
  maxFiles = 9, // Изменяем на 9 файлов
  maxSize = 10 // MB
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImages, setPreviewImages] = useState(currentImages);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentImages && currentImages.length > 0) {
      // Handle both existing image objects and new File objects
      const processedImages = currentImages.map(img => {
        if (typeof img === 'string') {
          // If it's a filename string
          return {
            filename: img,
            isExisting: true,
            url: img.startsWith('http') ? img : `http://localhost:8000/uploads/${img}`
          };
        } else if (img && typeof img === 'object' && img.isExisting) {
          // If it's already processed
          return img;
        } else if (img instanceof File) {
          // If it's a new File object
          return img;
        }
        return img;
      });
      
      setPreviewImages(processedImages);
    } else {
      setPreviewImages([]);
    }
  }, [currentImages]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    console.log(`🔄 ImageUpload: Processing ${files.length} files`);
    
    const validFiles = Array.from(files).filter(file => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        return false;
      }
      
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        return false;
      }
      
      return true;
    });

    if (validFiles.length === 0) return;

    // Limit number of files only if we're close to the limit
    if (multiple && previewImages.length + validFiles.length > maxFiles) {
      const canAdd = maxFiles - previewImages.length;
      if (canAdd > 0) {
        // Add as many as we can
        const filesToAdd = validFiles.slice(0, canAdd);
        validFiles.splice(0, canAdd);
        
        const newImages = [...previewImages, ...filesToAdd];
        setPreviewImages(newImages);
        
        // Convert back to the format expected by parent component
        const existingImages = previewImages.filter(img => 
          typeof img === 'string' || (typeof img === 'object' && img.isExisting)
        );
        const allImages = [...existingImages, ...filesToAdd];
        onImagesChange(allImages);
        
        // Show warning about remaining files
        if (validFiles.length > 0) {
          alert(`Добавлено ${filesToAdd.length} файлов. Максимальное количество: ${maxFiles}. Остальные файлы не добавлены.`);
        }
      } else {
        alert(`Достигнуто максимальное количество файлов: ${maxFiles}`);
      }
      return;
    }

    // Add all valid files
    const newImages = multiple ? [...previewImages, ...validFiles] : validFiles;
    setPreviewImages(newImages);
    
    // Convert back to the format expected by parent component
    if (multiple) {
      // For multiple images, we need to preserve existing images and add new files
      const existingImages = previewImages.filter(img => 
        typeof img === 'string' || (typeof img === 'object' && img.isExisting)
      );
      const allImages = [...existingImages, ...validFiles];
      onImagesChange(allImages);
    } else {
      onImagesChange(validFiles[0]);
    }
  };

  const handleFileInput = (e) => {
    console.log('🔄 ImageUpload: File input change event');
    console.log('   Event target:', e.target);
    console.log('   Files property:', e.target.files);
    console.log('   Files length:', e.target.files?.length);
    
    if (e.target.files && e.target.files[0]) {
      console.log('   Files found, processing...');
      console.log('   Files array:', Array.from(e.target.files).map(f => ({ name: f.name, size: f.size, type: f.type })));
      handleFiles(e.target.files);
    } else {
      console.log('   No files selected or files array is empty');
    }
  };

  const removeImage = (index) => {
    const newImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(newImages);
    
    // Convert back to the format expected by parent component
    if (multiple) {
      // For multiple images, we need to preserve existing images and new files separately
      const existingImages = newImages.filter(img => 
        typeof img === 'string' || (typeof img === 'object' && img.isExisting)
      );
      const newFiles = newImages.filter(img => img instanceof File);
      const allImages = [...existingImages, ...newFiles];
      
      console.log('🔄 ImageUpload: Removing image');
      console.log('   Remaining existing images:', existingImages.length);
      console.log('   Remaining new files:', newFiles.length);
      console.log('   Total remaining images:', allImages.length);
      
      onImagesChange(allImages);
    } else {
      onImagesChange(newImages.length > 0 ? newImages[0] : null);
    }
  };

  const openFileDialog = () => {
    console.log('🔄 ImageUpload: Opening file dialog');
    console.log('   Multiple selection enabled:', multiple);
    console.log('   Max files:', maxFiles);
    console.log('   Current preview images count:', previewImages.length);
    
    if (fileInputRef.current) {
      console.log('   File input ref found, clicking...');
      fileInputRef.current.click();
    } else {
      console.error('   File input ref not found!');
    }
  };

  const getImagePreview = (file) => {
    if (typeof file === 'string') {
      // If it's a URL string
      return file.startsWith('http') ? file : `http://localhost:8000/uploads/${file}`;
    }
    if (file && typeof file === 'object' && file.isExisting) {
      // If it's an existing image object
      return file.url;
    }
    if (file && typeof file === 'object' && file instanceof File) {
      // If it's a File object
      return URL.createObjectURL(file);
    }
    // Fallback
    return '/placeholder-image.jpg';
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
          dragActive 
            ? 'border-indigo-400 bg-indigo-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          data-testid="file-input"
        />
        
        <div className="space-y-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
          <div className="text-sm text-gray-600">
            <button
              type="button"
              onClick={openFileDialog}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {multiple ? 'Выбрать файлы' : 'Выбрать файл'}
            </button>
            {' '}или перетащите сюда
          </div>
          
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF до {maxSize}MB
            {multiple && (
              <>
                , максимум {maxFiles} файлов
                <br />
                <span className="text-indigo-600 font-medium">
                  💡 Можно выбрать несколько файлов одновременно!
                </span>
                <br />
                <span className="text-gray-500">
                  (Используйте Ctrl+клик или Shift+клик для выбора нескольких файлов)
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Image Previews */}
      {previewImages.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">
              Выбранные изображения ({previewImages.length})
            </h4>
            {multiple && previewImages.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setPreviewImages([]);
                  onImagesChange([]);
                }}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Очистить все
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {previewImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={getImagePreview(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 text-xs"
                >
                  ×
                </button>
                <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 