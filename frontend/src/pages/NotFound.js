import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Страница не найдена</h1>
        <p className="text-gray-600 mb-8">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <div className="space-x-4">
          <Link to="/" className="btn-primary">
            На главную
          </Link>
          <Link to="/projects" className="btn-secondary">
            К проектам
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 