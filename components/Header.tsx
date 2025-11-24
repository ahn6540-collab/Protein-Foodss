import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const isListPage = location.pathname === '/list';

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-emerald-600 tracking-tighter">FIT MEAL PICK</span>
        </Link>

        <nav className="flex items-center gap-4">
          {!isListPage && (
            <Link 
              to="/list"
              className="hidden md:block bg-gray-900 text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors"
            >
              도시락 비교하기
            </Link>
          )}
          {isListPage && (
            <Link 
              to="/"
              className="text-gray-500 hover:text-emerald-600 font-medium text-sm transition-colors"
            >
              홈으로
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;