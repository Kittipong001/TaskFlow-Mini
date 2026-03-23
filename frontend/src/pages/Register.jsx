import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const { username, password, confirmPassword } = formData;
  const navigate = useNavigate();
  const { register, isError, isSuccess, isLoading, message, user, resetAuthStatus } = useAuthStore();
  const [localError, setLocalError] = useState('');

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
    setLocalError('');
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    register({ username, password });
  };

  return (
    <div className="w-full flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl border border-violet-100 relative overflow-hidden">
        {/* Decorative Blob */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-violet-600 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 mb-2">Create Account</h1>
            <p className="text-gray-500 text-sm font-medium">Join TaskFlow Mini today!</p>
          </div>
          
          {(isError || localError) && (
            <div className="bg-rose-50 text-rose-600 border border-rose-200 p-4 rounded-xl mb-6 text-sm text-center font-medium">
              {localError || message}
            </div>
          )}
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all duration-300"
                name="username"
                value={username}
                placeholder="Choose a username"
                onChange={onChange}
                required
                minLength={3}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all duration-300"
                name="password"
                value={password}
                placeholder="Create a password"
                onChange={onChange}
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all duration-300"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm your password"
                onChange={onChange}
                required
                minLength={6}
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full text-white font-bold py-3 px-4 rounded-xl shadow-lg mt-2 transform transition-all duration-300 ${isLoading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 hover:-translate-y-0.5 hover:shadow-indigo-500/30'}`}
            >
              {isLoading ? 'Creating...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-600 hover:text-indigo-800 hover:underline transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
