
import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types.ts';
import ProductCard from '../components/ProductCard.tsx';

interface HomePageProps {
  products: Product[];
  onClickProduct: (id: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, onClickProduct }) => {
  const navigate = useNavigate();

  const topProteinProducts = useMemo(() => {
    return [...products].sort((a, b) => b.protein - a.protein).slice(0, 4);
  }, [products]);

  const handleCardClick = (id: number) => {
    onClickProduct(id);
    navigate('/list');
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-orange-50">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-500 text-xs font-bold mb-6 border border-orange-100">
            Beta Version
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6 leading-[1.2]">
            닭가슴살 고를 땐,<br/>
            <span className="text-orange-400 underline decoration-orange-100 underline-offset-8">영양 성분</span>부터 확인하세요
          </h1>
          <p className="text-sm sm:text-lg text-gray-500 mb-10 max-w-xl mx-auto font-medium">
            네이버스토어의 인기 닭가슴살을 한곳에 모았습니다.<br/>
            단백질, 칼로리, 탄수화물 기준으로 당신에게 딱 맞는 식단을 찾아보세요.
          </p>
          {/* Fix: Changed 'class' to 'className' to resolve React attribute error */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/list"
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-orange-400 text-white font-extrabold text-lg shadow-lg hover:bg-orange-500 hover:scale-105 transition-all"
            >
              지금 바로 비교하기
            </Link>
            <div className="text-[11px] text-gray-400 font-bold bg-white px-4 py-2 rounded-full border border-gray-100">
              🔥 실시간 네이버 스마트스토어 인기 상품 반영 중
            </div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
      </section>

      {/* Top Nutrient Section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <span className="text-orange-400">💪</span> 단백질 끝판왕 닭가슴살
            </h2>
            <p className="text-sm text-gray-400 font-bold mt-1">100g당 단백질 함량이 가장 높은 상품들이에요.</p>
          </div>
          <Link to="/list" className="text-xs font-bold text-orange-400 hover:underline">
            전체보기 &rarr;
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

      {/* Trust Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-orange-400 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-lg">
            <h3 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">
              더 똑똑하게,<br/> 더 건강하게 식단을 관리하세요
            </h3>
            <p className="text-sm opacity-90 mb-8 font-bold leading-relaxed">
              광고와 마케팅에 속지 말고, 실제 데이터 기반의 영양 성분을 비교하여 당신의 몸에 가장 좋은 선택을 하세요.
            </p>
            <Link to="/list" className="inline-block bg-white text-orange-500 font-black px-8 py-3 rounded-full hover:bg-gray-100 transition-all">
              시작하기
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-y-1/4 translate-x-1/4">
             <span className="text-[200px] font-black leading-none">FIT</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
