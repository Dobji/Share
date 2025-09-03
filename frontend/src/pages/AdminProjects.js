import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProjectForm from '../components/ProjectForm';
import Notification from '../components/Notification';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    // Validate token before fetching projects
    validateAndFetchProjects();
  }, [navigate]);

  const validateAndFetchProjects = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      // First validate token
      await axios.get('http://localhost:8000/admin/verify-token', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // If token is valid, fetch projects
      await fetchProjects();
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        showNotification('Ошибка при проверке авторизации', 'error');
      }
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:8000/admin/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('🔄 Fetched projects from server:', response.data);
      
      // Log details of each project's gallery
      response.data.forEach((project, index) => {
        if (project.gallery_photos) {
          const photoCount = project.gallery_photos.split(',').filter(p => p.trim()).length;
          console.log(`   Project ${index + 1} (${project.title}): ${photoCount} gallery photos`);
        } else {
          console.log(`   Project ${index + 1} (${project.title}): no gallery photos`);
        }
      });
      
      setProjects(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        const errorMessage = error.response?.data?.detail || 'Ошибка при загрузке проектов';
        showNotification(
          typeof errorMessage === 'string' ? errorMessage : 'Ошибка при загрузке проектов',
          'error'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (formData) => {
    setFormLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('http://localhost:8000/admin/projects', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      
      showNotification('Проект успешно создан!', 'success');
      setShowForm(false);
      validateAndFetchProjects();
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Ошибка при создании проекта';
      showNotification(
        typeof errorMessage === 'string' ? errorMessage : 'Ошибка при создании проекта',
        'error'
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateProject = async (formData) => {
    setFormLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      // Debug logging
      console.log('🔄 Updating project:', editingProject.id);
      console.log('   FormData contents:');
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`     ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
        } else {
          console.log(`     ${key}: ${value}`);
        }
      }
      
      const response = await axios.put(`http://localhost:8000/admin/projects/${editingProject.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      
      console.log('✅ Project updated successfully:', response.data);
      
      showNotification('Проект успешно обновлен!', 'success');
      setEditingProject(null);
      setShowForm(false);
      
      // Refresh projects list to show updated data
      validateAndFetchProjects();
    } catch (error) {
      console.error('❌ Error updating project:', error);
      console.error('   Response data:', error.response?.data);
      const errorMessage = error.response?.data?.detail || 'Ошибка при обновлении проекта';
      showNotification(
        typeof errorMessage === 'string' ? errorMessage : 'Ошибка при обновлении проекта',
        'error'
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот проект?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:8000/admin/projects/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      showNotification('Проект успешно удален!', 'success');
      validateAndFetchProjects();
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Ошибка при удалении проекта';
      showNotification(
        typeof errorMessage === 'string' ? errorMessage : 'Ошибка при удалении проекта',
        'error'
      );
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('adminTokenChanged'));
    
    navigate('/admin/login');
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const getImageUrl = (filename) => {
    if (!filename) return '/placeholder-image.jpg';
    return `http://localhost:8000/uploads/${filename}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Загрузка проектов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Админ-панель</h1>
              <p className="text-gray-600">Управление проектами СтройМакс</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Добавить проект
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProject ? 'Редактировать проект' : 'Создать новый проект'}
              </h2>
            </div>
            
            <ProjectForm
              project={editingProject}
              onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
              onCancel={handleCancelForm}
              loading={formLoading}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Список проектов</h2>
              <p className="text-gray-600">Всего проектов: {projects.length}</p>
            </div>
            
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Нет проектов</h3>
                <p className="mt-1 text-sm text-gray-500">Начните с создания первого проекта.</p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Добавить проект
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Фото
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Название
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Описание
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Площадь
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-2">
                            {/* Main photo */}
                            <img
                              src={getImageUrl(project.main_photo)}
                              alt={project.title}
                              className="h-16 w-16 object-cover rounded-lg"
                            />
                            
                            {/* Gallery photos preview */}
                            {project.gallery_photos && (
                              <div className="flex space-x-1">
                                {project.gallery_photos.split(',').filter(p => p.trim()).slice(0, 3).map((photo, index) => (
                                  <img
                                    key={index}
                                    src={getImageUrl(photo.trim())}
                                    alt={`Gallery ${index + 1}`}
                                    className="h-8 w-8 object-cover rounded"
                                  />
                                ))}
                                {project.gallery_photos.split(',').filter(p => p.trim()).length > 3 && (
                                  <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">
                                    +{project.gallery_photos.split(',').filter(p => p.trim()).length - 3}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {project.title}
                          </div>
                          {project.location && (
                            <div className="text-sm text-gray-500">
                              📍 {project.location}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {project.short_description}
                          </div>
                          {project.gallery_photos && (
                            <div className="text-xs text-gray-500 mt-1">
                              📸 Галерея: {project.gallery_photos.split(',').filter(p => p.trim()).length} фото
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.area || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditProject(project)}
                              className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                            >
                              ✏️ Редактировать
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-200"
                            >
                              🗑️ Удалить
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default AdminProjects; 