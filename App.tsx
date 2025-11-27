import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import ListPage from './pages/ListPage.tsx';
import { INITIAL_PRODUCTS } from './data.ts';
import { Product } from './types.ts';

function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [clickCounts, setClickCounts] = useState<Record<number, number>>({});

  // Simulated click tracking logic
  const handleProductClick = useCallback((id: number) => {
    setClickCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  }, []);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                products={products} 
                onClickProduct={handleProductClick}
              />
            } 
          />
          <Route 
            path="/list" 
            element={
              <ListPage 
                products={products} 
                clickCounts={clickCounts}
                onClickProduct={handleProductClick}
              />
            } 
          />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;