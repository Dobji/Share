import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Add timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          setLoading(false);
          console.warn('Request timeout, using fallback data');
        }, 10000); // 10 seconds timeout

        const response = await axios.get('http://localhost:8000/api/projects');
        clearTimeout(timeoutId);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Ошибка при загрузке проектов');
        // Fallback data - красивые проекты для демонстрации
        setProjects([
          {
            id: 1,
            title: "Жилой комплекс 'Солнечный'",
            short_description: "Современный жилой комплекс с развитой инфраструктурой и красивым ландшафтным дизайном. Включает 5 жилых корпусов, подземные паркинги, детские и спортивные площадки.",
            main_photo: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
            area: "45,000 м²",
            location: "Центральный район"
          },
          {
            id: 2,
            title: "Бизнес-центр 'Премьер'",
            short_description: "Элитный бизнес-центр класса А с современными офисами и конференц-залами. 20 этажей офисных помещений с рестораном и фитнес-центром.",
            main_photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
            area: "25,000 м²",
            location: "Деловой центр"
          },
          {
            id: 3,
            title: "Коттеджный поселок 'Усадьба'",
            short_description: "Эксклюзивный коттеджный поселок с индивидуальными проектами домов и участками от 6 соток. Собственная инфраструктура и зоны отдыха.",
            main_photo: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
            area: "15 га",
            location: "Пригородная зона"
          },
          {
            id: 4,
            title: "Торговый центр 'МегаМолл'",
            short_description: "Современный торгово-развлекательный комплекс с множеством магазинов, ресторанов и кинотеатром. Инновационные решения в архитектуре.",
            main_photo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
            area: "80,000 м²",
            location: "Торговая зона"
          },
          {
            id: 5,
            title: "Отель 'Люкс'",
            short_description: "Пятизвездочный отель с роскошными номерами, спа-центром и конференц-залами. Уникальный дизайн и высочайший уровень сервиса.",
            main_photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
            area: "12,000 м²",
            location: "Исторический центр"
          },
          {
            id: 6,
            title: "Медицинский центр 'Здоровье'",
            short_description: "Современный медицинский комплекс с диагностическим центром, стационаром и реабилитационными отделениями. Передовые медицинские технологии.",
            main_photo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
            area: "18,000 м²",
            location: "Медицинский район"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary hover:transform hover:scale-105 transition-all duration-300"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Наши проекты
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Изучите наше портфолио и убедитесь в качестве и разнообразии наших работ
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="card group hover:shadow-xl hover:transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={project.main_photo?.startsWith('http') ? project.main_photo : `http://localhost:8000/uploads/${project.main_photo}`}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                      console.log('Image failed to load:', project.main_photo);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.short_description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
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
                  </div>
                  
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-all duration-300 hover:transform hover:scale-105"
                  >
                    Подробнее
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Хотите обсудить свой проект?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Свяжитесь с нами для получения профессиональной консультации и расчета стоимости
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Получить консультацию
            </Link>
            <a href="tel:+74951234567" className="btn-secondary">
              Позвонить нам
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects; 