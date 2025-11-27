import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types.ts';
import AdPlaceholder from '../components/AdPlaceholder.tsx';
import ProductCard from '../components/ProductCard.tsx';

interface HomePageProps {
  products: Product[];
  onClickProduct: (id: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, onClickProduct }) => {
  const navigate = useNavigate();

  // Top 5 High Protein Products
  const topProteinProducts = useMemo(() => {
    return [...products].sort((a, b) => b.protein - a.protein).slice(0, 4);
  }, [products]);

  const handleCardClick = (id: number) => {
    onClickProduct(id);
    navigate('/list');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            단백질·칼로리 기준으로<br className="hidden md:block"/> 
            다이어트 도시락 한 번에 비교하기
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            쿠팡, 랭킹닭컴, 네이버스토어에 흩어진 도시락들을 한 번에 모아서 
            단백질·칼로리·당류 기준으로 필터링하고 최저가를 찾으세요.
          </p>
          <Link 
            to="/list"
            className="inline-block bg-white text-emerald-700 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all"
          >
            지금 바로 비교하기
          </Link>
        </div>
      </section>

      {/* Ad Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 w-full">
        <AdPlaceholder type="horizontal" />
      </div>

      {/* Popular/Top Protein Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              🔥 단백질 괴물 도시락 TOP 4
            </h2>
            <p className="text-gray-500">성분 깡패들만 모았습니다.</p>
          </div>
          <Link to="/list" className="text-emerald-600 font-medium hover:underline mt-4 md:mt-0">
            전체 보기 &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProteinProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={handleCardClick} 
            />
          ))}
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;