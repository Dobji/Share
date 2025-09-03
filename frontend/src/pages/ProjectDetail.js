import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Проект не найден');
        // Fallback data - расширенные данные для демонстрации
        const projectData = {
          1: {
            id: 1,
            title: "Жилой комплекс 'Солнечный'",
            short_description: "Современный жилой комплекс с развитой инфраструктурой и красивым ландшафтным дизайном.",
            full_description: "Жилой комплекс 'Солнечный' - это современный проект, включающий 5 жилых корпусов высотой от 12 до 25 этажей. Комплекс расположен в экологически чистом районе города с прекрасной транспортной доступностью. В проекте предусмотрены подземные паркинги, детские и спортивные площадки, зоны отдыха и торговые помещения на первых этажах. Архитектура комплекса сочетает в себе современные тенденции и функциональность, создавая комфортную среду для жизни.",
            main_photo: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
            gallery_photos: JSON.stringify([
              "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
            ]),
            completion_date: "2024-06-15T00:00:00",
            area: "45,000 м²",
            location: "Центральный район"
          },
          2: {
            id: 2,
            title: "Бизнес-центр 'Премьер'",
            short_description: "Элитный бизнес-центр класса А с современными офисами и конференц-залами.",
            full_description: "Бизнес-центр 'Премьер' - это современное здание класса А, предназначенное для размещения офисов премиум-класса. Центр включает в себя 20 этажей офисных помещений, конференц-залы, ресторан, фитнес-центр и подземную парковку. Здание оснащено современными системами безопасности, климат-контроля и телекоммуникаций. Архитектурное решение создает престижный образ и обеспечивает максимальную эффективность использования пространства.",
            main_photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
            gallery_photos: JSON.stringify([
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1497366754035-2008f4f76134?w=800&h=600&fit=crop"
            ]),
            completion_date: "2023-12-01T00:00:00",
            area: "25,000 м²",
            location: "Деловой центр"
          },
          3: {
            id: 3,
            title: "Коттеджный поселок 'Усадьба'",
            short_description: "Эксклюзивный коттеджный поселок с индивидуальными проектами домов и участками от 6 соток.",
            full_description: "Коттеджный поселок 'Усадьба' - это эксклюзивный проект малоэтажного строительства, включающий 50 индивидуальных домов площадью от 150 до 400 м². Каждый дом проектируется индивидуально с учетом пожеланий заказчика. Поселок имеет собственную инфраструктуру: детский сад, школу, магазины, спортивные площадки и зоны отдыха. Ландшафтный дизайн создает уютную атмосферу загородной жизни с современным комфортом.",
            main_photo: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
            gallery_photos: JSON.stringify([
              "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
            ]),
            completion_date: "2024-09-01T00:00:00",
            area: "15 га",
            location: "Пригородная зона"
          }
        };
        
        setProject(projectData[id] || projectData[1]);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">{error || 'Проект не найден'}</div>
          <Link to="/projects" className="btn-primary">
            Вернуться к проектам
          </Link>
        </div>
      </div>
    );
  }

  // Handle gallery photos - they might be a JSON string or comma-separated string
  let galleryPhotos = [];
  if (project.gallery_photos) {
    try {
      if (typeof project.gallery_photos === 'string') {
        if (project.gallery_photos.includes('[')) {
          // JSON format
          galleryPhotos = JSON.parse(project.gallery_photos);
        } else {
          // Comma-separated format from backend
          galleryPhotos = project.gallery_photos.split(',').filter(p => p.trim());
        }
      }
    } catch (e) {
      console.error('Error parsing gallery photos:', e);
      galleryPhotos = [];
    }
  }
  
  const allPhotos = [project.main_photo, ...galleryPhotos.filter(photo => photo !== project.main_photo)];

  const formatDate = (dateString) => {
    if (!dateString) return 'В процессе';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/projects" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Назад к проектам
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            {project.area && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {project.area}
              </div>
            )}
            {project.location && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {project.location}
              </div>
            )}
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(project.completion_date)}
            </div>
          </div>
        </div>
      </section>

      {/* Main Image and Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={allPhotos[currentImageIndex]?.startsWith('http') ? allPhotos[currentImageIndex] : `http://localhost:8000/uploads/${allPhotos[currentImageIndex]}`}
                  alt={project.title}
                  className="w-full h-96 lg:h-[500px] object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                    console.log('Main image failed to load:', allPhotos[currentImageIndex]);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Галерея проекта</h3>
              <div className="grid grid-cols-2 gap-4">
                {allPhotos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
                      currentImageIndex === index 
                        ? 'ring-2 ring-primary-600 ring-offset-2' 
                        : 'hover:scale-105'
                    }`}
                  >
                    <img
                      src={photo?.startsWith('http') ? photo : `http://localhost:8000/uploads/${photo}`}
                      alt={`${project.title} - фото ${index + 1}`}
                      className="w-full h-24 object-cover"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                        console.log('Thumbnail failed to load:', photo);
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Описание проекта</h2>
            
            <div className="text-gray-700 leading-relaxed space-y-6">
              <p className="text-xl text-gray-600 mb-6">
                {project.short_description}
              </p>
              
              <p>
                {project.full_description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Особенности проекта</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Площадь</h3>
              <p className="text-gray-600">{project.area}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Расположение</h3>
              <p className="text-gray-600">{project.location}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Срок завершения</h3>
              <p className="text-gray-600">{formatDate(project.completion_date)}</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Статус</h3>
              <p className="text-gray-600">В процессе реализации</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center text-white px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Заинтересовал проект?</h2>
          <p className="text-xl mb-8 opacity-90">
            Свяжитесь с нами для получения дополнительной информации и обсуждения возможностей сотрудничества
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Получить консультацию
            </Link>
            <a href="tel:+74951234567" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Позвонить нам
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail; 