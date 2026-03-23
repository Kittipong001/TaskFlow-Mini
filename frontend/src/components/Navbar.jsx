import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useTaskStore from '../store/useTaskStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, resetAuthStatus } = useAuthStore();
  const { clearTasks } = useTaskStore();

  const onLogout = () => {
    logout();
    clearTasks();
    resetAuthStatus();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-violet-900 via-indigo-800 to-indigo-900 shadow-lg sticky top-0 z-50 text-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-6xl">
        <div className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <Link to="/" className="hover:text-violet-200 transition-colors duration-300">TaskFlow Mini</Link>
        </div>
        <nav>
          <ul className="flex items-center space-x-6 text-sm font-medium">
            {user ? (
              <>
                <li className="flex items-center gap-2 bg-indigo-900/50 px-4 py-1.5 rounded-full border border-indigo-700/50 shadow-inner">
                  <div className="w-6 h-6 rounded-full bg-indigo-400 flex items-center justify-center text-xs font-bold shadow-sm">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-indigo-100">{user.username}</span>
                </li>
                <li>
                  <button
                    onClick={onLogout}
                    className="flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-300 px-5 py-2 rounded-full transition-all duration-300 border border-rose-500/30 font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-indigo-100 hover:text-white transition-colors duration-300 font-semibold">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="bg-white text-indigo-700 px-6 py-2 rounded-full shadow-md hover:bg-violet-50 hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300 font-bold"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
