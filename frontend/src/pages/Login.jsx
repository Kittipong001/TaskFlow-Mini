import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;
  const navigate = useNavigate();
  const { login, isError, isSuccess, isLoading, message, user, resetAuthStatus } = useAuthStore();

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    resetAuthStatus();
  }, [user, isError, isSuccess, message, navigate, resetAuthStatus]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl border border-violet-100 relative overflow-hidden">
        {/* Decorative Blob */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-600 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 mb-2">Welcome Back</h1>
            <p className="text-gray-500 text-sm font-medium">Please enter your details to sign in.</p>
          </div>
          
          {isError && (
            <div className="bg-rose-50 text-rose-600 border border-rose-200 p-4 rounded-xl mb-6 text-sm text-center font-medium flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {message}
            </div>
          )}
          
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white focus:border-transparent transition-all duration-300"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white focus:border-transparent transition-all duration-300"
                name="password"
                value={password}
                placeholder="••••••••"
                onChange={onChange}
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full text-white font-bold py-3 px-4 rounded-xl shadow-lg transform transition-all duration-300 ${isLoading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 hover:-translate-y-0.5 hover:shadow-indigo-500/30'}`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-violet-600 hover:text-indigo-800 hover:underline transition-colors">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
