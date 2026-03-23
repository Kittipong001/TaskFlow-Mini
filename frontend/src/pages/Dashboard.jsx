import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useTaskStore from '../store/useTaskStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { tasks, isLoading, isError, message, getTasks, resetTaskStatus, createTask, deleteTask, updateTask } = useTaskStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
    if (!user) {
      navigate('/login');
    } else {
      getTasks();
    }
    return () => {
      resetTaskStatus();
    };
  }, [user, navigate, isError, message, getTasks, resetTaskStatus]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTask(formData);
    setFormData({ title: '', description: '', priority: 'medium' });
  };

  const toggleStatus = (task) => {
    const nextStatus = task.status === 'pending' ? 'in-progress' : task.status === 'in-progress' ? 'completed' : 'pending';
    updateTask(task._id, { status: nextStatus });
  }

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 min-h-screen pb-12">
      
      {/* Sidebar / Create Task Form */}
      <aside className="lg:w-1/3 space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-violet-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 to-indigo-500"></div>
          <h2 className="text-2xl font-bold mb-6 text-indigo-950 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Task
          </h2>
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Task Title <span className="text-rose-500">*</span></label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={onChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all duration-300"
                placeholder="What needs to be done?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={onChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all duration-300 resize-none"
                placeholder="Add more details..."
                rows="4"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
              <div className="relative">
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={onChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white appearance-none transition-all duration-300"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </span>
              ) : 'Publish Task'}
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content / Task List */}
      <main className="lg:w-2/3">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-900 to-indigo-800 tracking-tight">My Tasks</h1>
            <p className="text-gray-500 mt-2">Manage your workflow seamlessly.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-violet-100 text-sm font-semibold text-indigo-900">
            {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'} Total
          </div>
        </div>

        {tasks.length > 0 ? (
          <div className="grid gap-5">
            {tasks.map((task) => (
              <div key={task._id} className="group bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-violet-50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-violet-200 transition-all duration-300 relative overflow-hidden">
                {/* Status Indicator Bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${task.status === 'completed' ? 'bg-emerald-500' : task.status === 'in-progress' ? 'bg-amber-400' : 'bg-violet-400'}`}></div>
                
                <div className="flex flex-col sm:flex-row justify-between pl-3 sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <button 
                        onClick={() => toggleStatus(task)}
                        className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer
                          ${task.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 hover:border-violet-500 hover:bg-violet-50'}`}
                      >
                        {task.status === 'completed' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 outline-none" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      <h3 className={`text-xl font-bold ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-indigo-950'}`}>
                        {task.title}
                      </h3>
                    </div>
                    
                    {task.description && (
                      <p className={`text-sm mb-4 pl-9 ${task.status === 'completed' ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-3 pl-9 mt-4">
                      <span className={`text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full 
                        ${task.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 
                          task.status === 'in-progress' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                        {task.status}
                      </span>
                      <span className={`text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full 
                        ${task.priority === 'high' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 
                          task.priority === 'medium' ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' : 'bg-sky-50 text-sky-600 border border-sky-200'}`}>
                        {task.priority || 'medium'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-row sm:flex-col justify-end sm:justify-between items-end gap-3 pl-9 sm:pl-0">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <Link 
                        to={`/task/${task._id}`} 
                        className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors shadow-sm"
                        title="Edit Task"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </Link>
                      <button 
                        onClick={() => deleteTask(task._id)}
                        className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition-colors shadow-sm"
                        title="Delete Task"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-dashed border-violet-200 text-center">
            <div className="w-24 h-24 bg-violet-50 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-indigo-950 mb-2">You're all caught up!</h3>
            <p className="text-gray-500 max-w-sm">You don't have any active tasks right now. Create an item on the left to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
