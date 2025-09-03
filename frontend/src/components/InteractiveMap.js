import React from 'react';

const InteractiveMap = ({ 
  address = "г. Москва, ул. Строителей, 15",
  companyName = "СтройМакс",
  officeInfo = "Бизнес-центр 'СтройМакс', офис 401",
  metroInfo = "Метро 'Строителей', 5 минут пешком",
  parkingInfo = "Бесплатная парковка для клиентов"
}) => {
  // Google Maps embed URL with custom coordinates (Moscow, near metro)
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.371615257803!2d37.6172993!3d55.755826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0L_QvtC70YzQt9C-0LLQsNGC0LXQu9GMLCDQnNC-0YHQutC-0LLRgdC60LjQuSDQstC-0YHQvtC-0LvRj9C90LjQuSwg0KDQvtGB0YHQuNGP!5e0!3m2!1sru!2sru!4v1234567890";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Map Container */}
      <div className="h-96 w-full">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${companyName} - Как нас найти`}
        ></iframe>
      </div>
      
      {/* Map Info Overlay */}
      <div className="p-6 bg-white border-t border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Офис {companyName}</h3>
            <p className="text-gray-600 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {address}
            </p>
            <p className="text-gray-600 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {officeInfo}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Открыть в Google Maps
            </a>
          </div>
        </div>
      </div>
      
      {/* Additional Location Info */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Адрес</h4>
            <p className="text-xs text-gray-600">{address}</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Как добраться</h4>
            <p className="text-xs text-gray-600">{metroInfo}</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Парковка</h4>
            <p className="text-xs text-gray-600">{parkingInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap; 