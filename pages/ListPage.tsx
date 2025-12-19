import React, { useState, useMemo } from 'react';
import { Product, FilterState, SortOption } from '../types.ts';
import FilterSidebar from '../components/FilterSidebar.tsx';
import ProductCard from '../components/ProductCard.tsx';

interface ListPageProps {
  products: Product[];
  clickCounts: Record<number, number>;
  onClickProduct: (id: number) => void;
}

const ListPage: React.FC<ListPageProps> = ({ products, clickCounts, onClickProduct }) => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    minProtein: 0,
    maxProtein: 50,
    minCarb: 0,
    maxCarb: 80,
    minFat: 0,
    maxFat: 30,
    minSugar: 0,
    maxSugar: 20,
    minCalorie: 0,
    maxCalorie: 800
  });

  const [sortBy, setSortBy] = useState<SortOption>('VIEWS_DESC');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (p.protein < filters.minProtein || p.protein > filters.maxProtein) return false;
      if (p.carb < filters.minCarb || p.carb > filters.maxCarb) return false;
      if (p.fat < filters.minFat || p.fat > filters.maxFat) return false;
      if (p.sugar < filters.minSugar || p.sugar > filters.maxSugar) return false;
      if (p.calorie < filters.minCalorie || p.calorie > filters.maxCalorie) return false;
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'VIEWS_DESC': return (clickCounts[b.id] || 0) - (clickCounts[a.id] || 0);
        case 'PRICE_ASC': return a.pricePerPack - b.pricePerPack;
        case 'SALES_DESC': return b.pricePerPack - a.pricePerPack; // 임시
        case 'PROTEIN_DESC': return b.protein - a.protein;
        default: return 0;
      }
    });
  }, [products, filters, sortBy, clickCounts]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:grid lg:grid-cols-[280px,1fr] gap-8">
        
        <aside>
          <FilterSidebar 
            filters={filters} 
            setFilters={setFilters} 
            totalCount={filteredProducts.length} 
          />
        </aside>

        <main className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
            <div>
              <h1 className="text-lg font-extrabold text-gray-900">상품 리스트</h1>
              <p className="text-[11px] text-gray-400 mt-0.5">선택한 영양 기준에 딱 맞는 닭가슴살만 보여드려요.</p>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-[11px] text-gray-500 font-bold">정렬</label>
              <select 
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-[#FFF7F2] border border-orange-100 text-gray-700 text-[11px] font-bold rounded-full px-4 py-2 focus:ring-orange-400 outline-none"
              >
                <option value="VIEWS_DESC">인기순 (조회수)</option>
                <option value="PRICE_ASC">가격 낮은순</option>
                <option value="PROTEIN_DESC">단백질 많은순</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={onClickProduct} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-orange-100">
              <span className="text-4xl mb-4">🔍</span>
              <p className="text-gray-500 font-bold text-sm mb-2">조건에 맞는 상품이 없어요.</p>
              <button 
                onClick={() => setFilters({
                  category: 'all', minProtein: 0, maxProtein: 50, minCarb: 0, maxCarb: 80, minFat: 0, maxFat: 30, minSugar: 0, maxSugar: 20, minCalorie: 0, maxCalorie: 800
                })}
                className="text-orange-500 text-xs font-bold hover:underline"
              >
                필터 모두 초기화하기
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ListPage;