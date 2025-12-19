import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import ListPage from './pages/ListPage.tsx';
import { INITIAL_PRODUCTS } from './data.ts';
import { Product } from './types.ts';

function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [clickCounts, setClickCounts] = useState<Record<number, number>>({});

  const handleProductClick = useCallback((id: number) => {
    setClickCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  }, []);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-[#FFF7F2] text-gray-900">
        <header className="bg-white/95 backdrop-blur border-b border-orange-100 sticky top-0 z-30">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-orange-400 text-white font-black text-xl shadow-sm">F</span>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight">Fit Meal Pick</span>
                <span className="text-[10px] text-gray-400 font-bold">영양 기준 식단 비교 서비스</span>
              </div>
            </Link>
            <nav className="flex items-center gap-4">
              <Link to="/list" className="text-sm font-bold text-gray-600 hover:text-orange-400 transition-colors">전체보기</Link>
              <Link to="/list" className="hidden sm:inline-flex px-4 py-2 rounded-full bg-orange-400 text-white text-xs font-bold hover:bg-orange-500 shadow-sm transition-all">도시락 비교하기</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage products={products} onClickProduct={handleProductClick} />} />
            <Route path="/list" element={<ListPage products={products} clickCounts={clickCounts} onClickProduct={handleProductClick} />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-orange-100 py-10 mt-10">
          <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
            <h2 className="text-xl font-black text-gray-300">FIT MEAL PICK</h2>
            <p className="text-[11px] text-gray-400 leading-relaxed max-w-md mx-auto">
              본 서비스는 다이어트 도시락 영양 정보를 한눈에 비교하기 위한 베타 버전입니다.<br/>
              실제 상품의 가격 및 성분 정보는 구매처의 최종 정보를 반드시 확인하시기 바랍니다.
            </p>
            <p className="text-[10px] text-gray-300">© 2025 Fit Meal Pick. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;