import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactModal from './ContactModal';

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const services = [
    {
      id: 1,
      title: "Жилое строительство",
      description: "Строительство многоквартирных домов, коттеджей и таунхаусов под ключ",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      features: ["Многоквартирные дома", "Коттеджи", "Таунхаусы", "Дома под ключ"],
      anchor: "residential"
    },
    {
      id: 2,
      title: "Коммерческое строительство",
      description: "Строительство офисных зданий, торговых центров и промышленных объектов",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V6a2 2 0 00-2-2H8a2 2 0 00-2 2v2m8 0v2a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0v2a2 2 0 00-2 2v2a2 2 0 002 2h4a2 2 0 002-2V8a2 2 0 00-2-2" />
        </svg>
      ),
      features: ["Офисные здания", "Торговые центры", "Промышленные объекты", "Склады"],
      anchor: "commercial"
    },
    {
      id: 3,
      title: "Ремонт и отделка",
      description: "Капитальный ремонт, отделочные работы и реконструкция помещений",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      features: ["Капитальный ремонт", "Отделочные работы", "Реконструкция", "Дизайн-проекты"],
      anchor: "repair"
    },
    {
      id: 4,
      title: "Инженерные системы",
      description: "Монтаж и обслуживание инженерных коммуникаций и систем",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: ["Электрика", "Водоснабжение", "Отопление", "Вентиляция"],
      anchor: "engineering"
    },
    {
      id: 5,
      title: "Благоустройство",
      description: "Ландшафтный дизайн, озеленение и благоустройство территорий",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: ["Ландшафтный дизайн", "Озеленение", "Дорожки и площадки", "Малые формы"],
      anchor: "landscape"
    },
    {
      id: 6,
      title: "Проектирование",
      description: "Архитектурное проектирование и разработка проектной документации",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      features: ["Архитектурное проектирование", "Конструктивные решения", "Инженерные системы", "Сметная документация"],
      anchor: "architecture"
    },
    {
      id: 7,
      title: "Демонтажные работы",
      description: "Профессиональный демонтаж зданий и сооружений любой сложности",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      features: ["Демонтаж зданий", "Разбор конструкций", "Вывоз мусора", "Подготовка площадки"],
      anchor: "demolition"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Наши услуги</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Полный спектр строительных услуг от проектирования до сдачи объекта под ключ
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer"
              onClick={() => handleServiceClick(service)}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <div className="text-primary-600 group-hover:text-primary-700 transition-colors duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    <svg className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Service Details Button */}
              <div className="mt-6">
                <Link 
                  to={`/services#${service.anchor}`}
                  className="inline-flex items-center justify-center w-full bg-primary-600 text-white hover:bg-primary-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Наши услуги
                </Link>
              </div>

              {/* Click Indicator */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center text-primary-600 text-sm font-medium group-hover:text-primary-700 transition-colors duration-300">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Нажмите для связи
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-primary-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Нужна консультация по услугам?
            </h3>
            <p className="text-gray-600 mb-6">
              Наши специалисты помогут подобрать оптимальное решение для вашего проекта
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => handleServiceClick({ title: 'Общая консультация', description: 'Получить консультацию по всем услугам' })}
                className="bg-primary-600 text-white hover:bg-primary-700 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </div>
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        serviceTitle={selectedService?.title}
        serviceDescription={selectedService?.description}
      />
    </section>
  );
};

export default ServicesSection; 