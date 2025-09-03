import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactModal from '../components/ContactModal';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [layoutStyle, setLayoutStyle] = useState('massive');

  const mainServices = [
    {
      id: 1,
      title: "Жилое строительство",
      description: "Строительство многоквартирных домов, коттеджей и таунхаусов под ключ",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
      features: ["Многоквартирные дома", "Коттеджи", "Таунхаусы", "Дома под ключ"],
      advantages: ["Современные технологии", "Качественные материалы", "Соблюдение сроков", "Гарантия качества"]
    },
    {
      id: 2,
      title: "Коммерческое строительство",
      description: "Строительство офисных зданий, торговых центров и промышленных объектов",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      features: ["Офисные здания", "Торговые центры", "Промышленные объекты", "Склады"],
      advantages: ["Проектирование под бизнес", "Энергоэффективность", "Быстрая окупаемость", "Современный дизайн"]
    },
    {
      id: 3,
      title: "Ремонт и отделка",
      description: "Капитальный ремонт, отделочные работы и реконструкция помещений",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
      features: ["Капитальный ремонт", "Отделочные работы", "Реконструкция", "Дизайн-проекты"],
      advantages: ["Индивидуальный подход", "Современные материалы", "Четкие сроки", "Контроль качества"]
    },
    {
      id: 4,
      title: "Инженерные системы",
      description: "Монтаж и обслуживание инженерных коммуникаций и систем жизнеобеспечения",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop",
      features: ["Электрические системы", "Водоснабжение и канализация", "Отопление и вентиляция", "Кондиционирование"],
      advantages: ["Современное оборудование", "Энергоэффективность", "Надежность работы", "Простота обслуживания"]
    },
    {
      id: 5,
      title: "Ландшафтный дизайн",
      description: "Создание уникальных ландшафтных проектов и благоустройство территорий",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
      features: ["Ландшафтное проектирование", "Озеленение территории", "Мощение дорожек", "Малые архитектурные формы"],
      advantages: ["Индивидуальный дизайн", "Натуральные материалы", "Долговечность", "Эстетическая привлекательность"]
    },
    {
      id: 6,
      title: "Архитектурное проектирование",
      description: "Полный цикл архитектурного проектирования от концепции до рабочей документации",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      features: ["Архитектурные решения", "Конструктивные расчеты", "Инженерные системы", "Сметная документация"],
      advantages: ["Креативный подход", "Техническая экспертиза", "Соответствие нормам", "Оптимизация затрат"]
    },
    {
      id: 7,
      title: "Демонтажные работы",
      description: "Профессиональный демонтаж зданий и сооружений любой сложности",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
      features: ["Демонтаж зданий", "Разбор конструкций", "Вывоз мусора", "Подготовка площадки"],
      advantages: ["Безопасность работ", "Современная техника", "Быстрое выполнение", "Экологичность"]
    }
  ];

  const otherServices = [
    {
      id: 8,
      title: "Фасадные работы",
      description: "Отделка и ремонт фасадов зданий с использованием современных материалов",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
      features: ["Утепление фасадов", "Облицовка плиткой", "Штукатурные работы", "Покраска фасадов"]
    },
    {
      id: 9,
      title: "Кровельные работы",
      description: "Монтаж и ремонт кровельных систем различных типов и материалов",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      features: ["Металлочерепица", "Гибкая черепица", "Профнастил", "Натуральная черепица"]
    },
    {
      id: 10,
      title: "Отделочные материалы",
      description: "Продажа и поставка качественных отделочных материалов от ведущих производителей",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
      features: ["Керамическая плитка", "Ламинированные панели", "Декоративные покрытия", "Клеевые составы"]
    }
  ];

  const companyAdvantages = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Качество",
      description: "Мы используем только лучшие материалы и технологии для обеспечения высочайшего качества наших проектов."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Сроки",
      description: "Соблюдаем все договорные обязательства и сдаем проекты точно в срок."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Команда",
      description: "Наша команда состоит из опытных профессионалов с многолетним стажем в строительной отрасли."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Инновации",
      description: "Внедряем передовые технологии и современные решения для повышения эффективности."
    }
  ];

  const specializations = [
    "Строительство жилых комплексов и многоэтажных домов",
    "Возведение коммерческих объектов и торговых центров",
    "Промышленное строительство и складские комплексы",
    "Реконструкция и капитальный ремонт зданий",
    "Инженерные системы и коммуникации",
    "Ландшафтный дизайн и благоустройство территорий",
    "Архитектурное проектирование и дизайн",
    "Строительство под ключ с полным циклом работ"
  ];

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Layout Style Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
              <div className="flex gap-2">
                <button 
                  onClick={() => setLayoutStyle('massive')}
                  className={`p-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    layoutStyle === 'massive' 
                      ? 'bg-primary-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title="Масштабный макет"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span className="hidden sm:inline">Масштабный</span>
                </button>
                
                <button 
                  onClick={() => setLayoutStyle('cards')}
                  className={`p-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    layoutStyle === 'cards' 
                      ? 'bg-primary-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title="Карточки"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="hidden sm:inline">Карточки</span>
                </button>
                
                <button 
                  onClick={() => setLayoutStyle('grid')}
                  className={`p-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    layoutStyle === 'grid' 
                      ? 'bg-primary-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title="Сетка"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span className="hidden sm:inline">Сетка</span>
                </button>
                
                <button 
                  onClick={() => setLayoutStyle('list')}
                  className={`p-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    layoutStyle === 'list' 
                      ? 'bg-primary-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title="Список"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span className="hidden sm:inline">Список</span>
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Основные услуги</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Мы предлагаем полный спектр строительных услуг, используя передовые технологии и проверенные временем решения
            </p>
          </div>
          
          {/* Conditional Layout Rendering */}
          {layoutStyle === 'massive' && (
            <div className="space-y-32">
              {/* Service 1: Жилое строительство */}
              <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Image Section */}
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop"
                        alt="Жилое строительство"
                        className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Floating Stats */}
                    <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 transform group-hover:scale-110 transition-transform duration-500">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary-600">200+</div>
                        <div className="text-sm text-gray-600">Реализованных проектов</div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Основное направление
                      </div>
                      <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                        Жилое строительство
                      </h3>
                      <p className="text-xl text-gray-600 leading-relaxed">
                        Создаем комфортное и качественное жилье для наших клиентов, используя передовые технологии строительства и лучшие материалы.
                      </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Что входит:</h4>
                        <ul className="space-y-2">
                          {mainServices[0].features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Преимущества:</h4>
                        <ul className="space-y-2">
                          {mainServices[0].advantages.map((advantage, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button 
                        onClick={() => setSelectedService(mainServices[0])}
                        className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Получить консультацию
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 2: Коммерческое строительство */}
              <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content Section - Left */}
                  <div className="space-y-8 lg:order-1 order-2">
                    <div className="space-y-4">
                      <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Бизнес-решения
                      </div>
                      <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                        Коммерческое строительство
                      </h3>
                      <p className="text-xl text-gray-600 leading-relaxed">
                        Строим объекты, которые приносят прибыль. От офисных зданий до торговых центров - каждый проект создается с учетом бизнес-требований.
                      </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Что входит:</h4>
                        <ul className="space-y-2">
                          {mainServices[1].features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Преимущества:</h4>
                        <ul className="space-y-2">
                          {mainServices[1].advantages.map((advantage, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button 
                        onClick={() => setSelectedService(mainServices[1])}
                        className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Получить консультацию
                      </button>
                    </div>
                  </div>

                  {/* Image Section - Right */}
                  <div className="relative group lg:order-2 order-1">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop"
                        alt="Коммерческое строительство"
                        className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Floating Stats */}
                    <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 transform group-hover:scale-110 transition-transform duration-500">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">15+</div>
                        <div className="text-sm text-gray-600">Лет опыта</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 3: Ремонт и отделка */}
              <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Image Section */}
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=800&fit=crop"
                        alt="Ремонт и отделка"
                        className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Floating Stats */}
                    <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 transform group-hover:scale-110 transition-transform duration-500">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">98%</div>
                        <div className="text-sm text-gray-600">Довольных клиентов</div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                        </svg>
                        Премиум качество
                      </div>
                      <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                        Ремонт и отделка
                      </h3>
                      <p className="text-xl text-gray-600 leading-relaxed">
                        Превращаем ваши идеи в реальность. От капитального ремонта до дизайнерской отделки - каждый проект уникален и выполняется с особой тщательностью.
                      </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Что входит:</h4>
                        <ul className="space-y-2">
                          {mainServices[2].features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Преимущества:</h4>
                        <ul className="space-y-2">
                          {mainServices[2].advantages.map((advantage, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button 
                        onClick={() => setSelectedService(mainServices[2])}
                        className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Получить консультацию
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 4: Инженерные системы */}
              <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content Section - Left */}
                  <div className="space-y-8 lg:order-1 order-2">
                    <div className="space-y-4">
                      <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Технические решения
                      </div>
                      <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                        Инженерные системы
                      </h3>
                      <p className="text-xl text-gray-600 leading-relaxed">
                        Монтаж и обслуживание инженерных коммуникаций и систем жизнеобеспечения для комфортной и безопасной эксплуатации зданий.
                      </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Что входит:</h4>
                        <ul className="space-y-2">
                          {mainServices[3].features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Преимущества:</h4>
                        <ul className="space-y-2">
                          {mainServices[3].advantages.map((advantage, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button 
                        onClick={() => setSelectedService(mainServices[3])}
                        className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Получить консультацию
                      </button>
                    </div>
                  </div>

                  {/* Image Section - Right */}
                  <div className="relative group lg:order-2 order-1">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&h=800&fit=crop"
                        alt="Инженерные системы"
                        className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Floating Stats */}
                    <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 transform group-hover:scale-110 transition-transform duration-500">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">24/7</div>
                        <div className="text-sm text-gray-600">Поддержка</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 5: Ландшафтный дизайн */}
              <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Image Section */}
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&fit=crop"
                        alt="Ландшафтный дизайн"
                        className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Floating Stats */}
                    <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 transform group-hover:scale-110 transition-transform duration-500">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-600">150+</div>
                        <div className="text-sm text-gray-600">Проектов</div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Природная красота
                      </div>
                      <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                        Ландшафтный дизайн
                      </h3>
                      <p className="text-xl text-gray-600 leading-relaxed">
                        Создаем уникальные ландшафтные проекты, которые гармонично сочетают природную красоту с функциональностью и комфортом.
                      </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Что входит:</h4>
                        <ul className="space-y-2">
                          {mainServices[4].features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Преимущества:</h4>
                        <ul className="space-y-2">
                          {mainServices[4].advantages.map((advantage, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button 
                        onClick={() => setSelectedService(mainServices[4])}
                        className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Получить консультацию
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 6: Архитектурное проектирование */}
              <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content Section - Left */}
                  <div className="space-y-8 lg:order-1 order-2">
                    <div className="space-y-4">
                      <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Креативные решения
                      </div>
                      <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                        Архитектурное проектирование
                      </h3>
                      <p className="text-xl text-gray-600 leading-relaxed">
                        Полный цикл архитектурного проектирования от концепции до рабочей документации, создавая уникальные и функциональные решения.
                      </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Что входит:</h4>
                        <ul className="space-y-2">
                          {mainServices[5].features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Преимущества:</h4>
                        <ul className="space-y-2">
                          {mainServices[5].advantages.map((advantage, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button 
                        onClick={() => setSelectedService(mainServices[5])}
                        className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Получить консультацию
                      </button>
                    </div>
                  </div>

                  {/* Image Section - Right */}
                  <div className="relative group lg:order-2 order-1">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop"
                        alt="Архитектурное проектирование"
                        className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Floating Stats */}
                    <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 transform group-hover:scale-110 transition-transform duration-500">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-indigo-600">500+</div>
                        <div className="text-sm text-gray-600">Проектов</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 7: Демонтажные работы */}
              <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Image Section */}
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop"
                        alt="Демонтажные работы"
                        className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Floating Stats */}
                    <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 transform group-hover:scale-110 transition-transform duration-500">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600">100%</div>
                        <div className="text-sm text-gray-600">Безопасность</div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Профессиональный демонтаж
                      </div>
                      <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                        Демонтажные работы
                      </h3>
                      <p className="text-xl text-gray-600 leading-relaxed">
                        Профессиональный демонтаж зданий и сооружений любой сложности с соблюдением всех норм безопасности и экологических требований.
                      </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Что входит:</h4>
                        <ul className="space-y-2">
                          {mainServices[6].features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900">Преимущества:</h4>
                        <ul className="space-y-2">
                          {mainServices[6].advantages.map((advantage, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button 
                        onClick={() => setSelectedService(mainServices[6])}
                        className="bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Получить консультацию
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cards Layout */}
          {layoutStyle === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainServices.map((service, index) => (
                <div key={service.id} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  {/* Service Image */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Service Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                      Услуга {index + 1}
                    </div>
                  </div>
                  
                  {/* Service Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Что входит:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-3 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button 
                      onClick={() => setSelectedService(service)}
                      className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center group-hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Получить консультацию
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Grid Layout */}
          {layoutStyle === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mainServices.map((service, index) => (
                <div key={service.id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Image */}
                    <div className="relative overflow-hidden h-48 md:h-full">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {service.description}
                        </p>
                        
                        {/* Features */}
                        <ul className="space-y-1">
                          {service.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-xs text-gray-600">
                              <svg className="w-3 h-3 mr-2 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <button 
                        onClick={() => setSelectedService(service)}
                        className="mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors duration-300"
                      >
                        Консультация
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List Layout */}
          {layoutStyle === 'list' && (
            <div className="space-y-6">
              {mainServices.map((service, index) => (
                <div key={service.id} className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-lg w-full md:w-32 h-32 flex-shrink-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {service.description}
                          </p>
                          
                          {/* Features */}
                          <div className="flex flex-wrap gap-4">
                            {service.features.map((feature, featureIndex) => (
                              <span key={featureIndex} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                <svg className="w-3 h-3 mr-1 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => setSelectedService(service)}
                          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-300 flex-shrink-0"
                        >
                          Получить консультацию
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>



      {/* Company Advantages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Наши преимущества</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyAdvantages.map((advantage, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-500">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                  <div className="text-primary-600 group-hover:text-primary-700 transition-colors duration-300">
                    {advantage.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Мы специализируемся на следующих услугах</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializations.map((specialization, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg hover:bg-primary-50 transition-colors duration-300 group">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors duration-300">
                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 leading-relaxed">
                    {specialization}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center text-white px-4">
          <h2 className="text-3xl font-bold mb-6">Готовы начать свой проект?</h2>
          <p className="text-xl mb-8 opacity-90">
            Свяжитесь с нами для обсуждения ваших идей и получения профессиональной консультации
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              Связаться с нами
            </Link>
            <Link to="/projects" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              Посмотреть проекты
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {selectedService && (
        <ContactModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default Services; 