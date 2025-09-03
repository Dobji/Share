import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InteractiveMap from '../components/InteractiveMap';
import ServicesSection from '../components/ServicesSection';
import ContactModal from '../components/ContactModal';

const Home = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        // Add timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          setLoading(false);
          console.warn('Request timeout, using fallback data');
        }, 10000); // 10 seconds timeout

        const response = await axios.get('http://localhost:8000/api/company');
        clearTimeout(timeoutId);
        setCompanyInfo(response.data);
      } catch (error) {
        console.error('Error fetching company info:', error);
        // Fallback data
        setCompanyInfo({
          name: 'СтройМакс',
          description: 'Ведущая строительная компания с многолетним опытом в области жилого и коммерческого строительства.',
          mission: 'Создавать комфортное и качественное жилье для наших клиентов, используя передовые технологии и материалы.',
          experience_years: 15,
          advantages: '• 15 лет успешной работы\n• Более 200 реализованных проектов\n• Собственная команда профессионалов\n• Гарантия качества на все работы\n• Современные технологии строительства',
          main_photo: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${companyInfo?.main_photo?.startsWith('http') ? companyInfo.main_photo : companyInfo?.main_photo ? `http://localhost:8000/uploads/${companyInfo.main_photo}` : 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop'})`
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {companyInfo?.name || 'СтройМакс'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {companyInfo?.description || 'Ведущая строительная компания с многолетним опытом в области жилого и коммерческого строительства.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/projects" className="btn-primary text-lg px-8 py-4">
              Посмотреть проекты
            </Link>
            <Link to="/services" className="btn-secondary text-lg px-8 py-4">
              Наши услуги
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наша миссия</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {companyInfo?.mission || 'Создавать комфортное и качественное жилье для наших клиентов, используя передовые технологии и материалы.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <svg className="w-10 h-10 text-primary-600 group-hover:text-primary-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">Качество</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Мы используем только лучшие материалы и технологии для обеспечения высочайшего качества наших проектов.</p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <svg className="w-10 h-10 text-primary-600 group-hover:text-primary-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">Сроки</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Соблюдаем все договорные обязательства и сдаем проекты точно в срок.</p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <svg className="w-10 h-10 text-primary-600 group-hover:text-primary-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">Команда</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Наша команда состоит из опытных профессионалов с многолетним стажем в строительной отрасли.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Stages Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Этапы работы</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Мы работаем по четко отработанной схеме, которая гарантирует качество и соблюдение сроков
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Stage 1 */}
            <div className="relative group hover:transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-l-4 border-primary-600">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors duration-300">
                    <span className="text-2xl font-bold text-primary-600">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">Консультация</h3>
                </div>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Бесплатная консультация с нашими специалистами, обсуждение ваших потребностей и возможностей
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="relative group hover:transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-l-4 border-blue-600">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Проектирование</h3>
                </div>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Разработка детального проекта с учетом всех ваших пожеланий и технических требований
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="relative group hover:transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-l-4 border-green-600">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors duration-300">
                    <span className="text-2xl font-bold text-green-600">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">Согласование</h3>
                </div>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Согласование проекта, сметы и графика работ. Подписание договора и начало сотрудничества
                </p>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="relative group hover:transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-l-4 border-purple-600">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors duration-300">
                    <span className="text-2xl font-bold text-purple-600">4</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">Выполнение</h3>
                </div>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Профессиональное выполнение всех работ с соблюдением технологий и стандартов качества
                </p>
              </div>
            </div>

            {/* Stage 5 */}
            <div className="relative group hover:transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-l-4 border-orange-600">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-orange-200 transition-colors duration-300">
                    <span className="text-2xl font-bold text-orange-600">5</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Контроль</h3>
                </div>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Постоянный контроль качества на всех этапах работ с фотофиксацией и отчетностью
                </p>
              </div>
            </div>

            {/* Stage 6 */}
            <div className="relative group hover:transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-l-4 border-red-600">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors duration-300">
                    <span className="text-2xl font-bold text-red-600">6</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300">Сдача</h3>
                </div>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Сдача готового объекта, подписание актов выполненных работ и гарантийное обслуживание
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наш опыт</h2>
            <p className="text-xl text-gray-600">Более {companyInfo?.experience_years || 15} лет успешной работы в строительной отрасли</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group hover:transform hover:scale-110 transition-all duration-500 cursor-pointer">
              <div className="text-4xl font-bold text-primary-600 mb-2 group-hover:text-primary-700 transition-colors duration-300">{companyInfo?.experience_years || 15}+</div>
              <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Лет опыта</div>
            </div>
            <div className="group hover:transform hover:scale-110 transition-all duration-500 cursor-pointer">
              <div className="text-4xl font-bold text-primary-600 mb-2 group-hover:text-primary-700 transition-colors duration-300">200+</div>
              <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Реализованных проектов</div>
            </div>
            <div className="group hover:transform hover:scale-110 transition-all duration-500 cursor-pointer">
              <div className="text-4xl font-bold text-primary-600 mb-2 group-hover:text-primary-700 transition-colors duration-300">500+</div>
              <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Довольных клиентов</div>
            </div>
            <div className="group hover:transform hover:scale-110 transition-all duration-500 cursor-pointer">
              <div className="text-4xl font-bold text-primary-600 mb-2 group-hover:text-primary-700 transition-colors duration-300">50+</div>
              <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Профессионалов</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection onServiceClick={handleServiceClick} />

      {/* Location Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Как нас найти</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Наш офис расположен в центре Москвы, в современном бизнес-центре с удобной транспортной доступностью
            </p>
          </div>
          
          <InteractiveMap 
            address="г. Москва, ул. Строителей, 15"
            companyName="СтройМакс"
            officeInfo="Бизнес-центр 'СтройМакс', офис 401"
            metroInfo="Метро 'Строителей', 5 минут пешком"
            parkingInfo="Бесплатная парковка для клиентов"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Готовы начать свой проект?</h2>
          <p className="text-xl mb-8 opacity-90">
            Свяжитесь с нами для обсуждения ваших идей и получения профессиональной консультации
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Получить консультацию
            </Link>
            <Link to="/projects" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              Посмотреть проекты
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen}
        serviceTitle={selectedService?.title}
        serviceDescription={selectedService?.description}
        onClose={closeModal}
      />
    </div>
  );
};

export default Home; 