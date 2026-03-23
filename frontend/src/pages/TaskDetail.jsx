import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useTaskStore from '../store/useTaskStore';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { tasks, updateTask, isLoading, isError, message, getTasks } = useTaskStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
  });

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
    if (!user) {
      navigate('/login');
    } else {
      if (tasks.length === 0) {
        getTasks();
      }
    }
  }, [user, navigate, isError, message, tasks.length, getTasks]);

  useEffect(() => {
    const taskToEdit = tasks.find((t) => t._id === id);
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        status: taskToEdit.status,
        priority: taskToEdit.priority,
      });
    }
  }, [id, tasks]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateTask(id, formData);
    navigate('/');
  };

  const taskToEdit = tasks.find((t) => t._id === id);

  if (isLoading || tasks.length === 0) {
    return (
      <div className="w-full flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (!taskToEdit) {
    return (
      <div className="w-full flex justify-center mt-20">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-violet-100 text-center max-w-md w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Task Not Found</h2>
          <p className="text-gray-500 mb-6">This task might have been deleted or doesn't exist.</p>
          <Link to="/" className="inline-block bg-indigo-50 text-indigo-600 font-semibold px-6 py-3 rounded-full hover:bg-indigo-100 transition-colors">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-10">
      <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-violet-800 font-semibold mb-6 transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Tasks
      </Link>

      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-violet-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-violet-100 rounded-full blur-3xl opacity-60 -mr-20 -mt-20"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-900 to-indigo-800 mb-8">Edit Task Details</h1>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Task Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={onChange}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white focus:border-transparent transition-all duration-300 text-gray-800 font-medium"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={onChange}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white focus:border-transparent transition-all duration-300 text-gray-700 resize-none min-h-[120px]"
                rows="5"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 appearance-none font-medium cursor-pointer shadow-sm"
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="in-progress">🚀 In Progress</option>
                  <option value="completed">✅ Completed</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 bottom-0 right-0 flex items-center px-5 pt-7 text-indigo-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Priority Level</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={onChange}
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 appearance-none font-medium cursor-pointer shadow-sm"
                >
                  <option value="low">🟡 Low Priority</option>
                  <option value="medium">🟠 Medium Priority</option>
                  <option value="high">🔴 High Priority</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 bottom-0 right-0 flex items-center px-5 pt-7 text-indigo-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 mt-4 border-t border-gray-100">
              <Link 
                to="/" 
                className="order-2 sm:order-1 px-8 py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-bold transition-colors text-center"
              >
                Discard Changes
              </Link>
              <button 
                type="submit" 
                className="order-1 sm:order-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all text-center"
              >
                Save Updates
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
