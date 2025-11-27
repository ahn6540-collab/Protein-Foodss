import React, { useState, useMemo } from 'react';
import { Product, FilterState, SortOption } from '../types.ts';
import FilterSidebar from '../components/FilterSidebar.tsx';
import ProductCard from '../components/ProductCard.tsx';
import AdPlaceholder from '../components/AdPlaceholder.tsx';

interface ListPageProps {
  products: Product[];
  clickCounts: Record<number, number>;
  onClickProduct: (id: number) => void;
}

const ListPage: React.FC<ListPageProps> = ({ products, clickCounts, onClickProduct }) => {
  const [filters, setFilters] = useState<FilterState>({
    minProtein: 0,
    maxCalorie: 1000,
    maxSugar: 20,
    minPrice: 0,
    maxPrice: 20000,
    maxPricePer100g: 5000,
    selectedMalls: []
  });

  const [sortBy, setSortBy] = useState<SortOption>('PRICE_ASC');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Mall Filter
      if (filters.selectedMalls.length > 0 && !filters.selectedMalls.includes(p.mall)) return false;
      
      // Nutrient Filters
      if (p.protein < filters.minProtein) return false;
      if (p.calorie > filters.maxCalorie) return false;
      if (p.sugar > filters.maxSugar) return false;

      // Price Filters
      if (p.pricePerPack < filters.minPrice) return false;
      if (p.pricePerPack > filters.maxPrice) return false;
      if (p.pricePer100g > filters.maxPricePer100g) return false;

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'PRICE_ASC': return a.pricePerPack - b.pricePerPack;
        case 'PRICE_DESC': return b.pricePerPack - a.pricePerPack;
        case 'PROTEIN_DESC': return b.protein - a.protein;
        case 'CALORIE_ASC': return a.calorie - b.calorie;
        default: return 0;
      }
    });
  }, [products, filters, sortBy]);

  // Click Ranking (Top 5)
  const topClickedProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => (clickCounts[b.id] || 0) - (clickCounts[a.id] || 0))
      .slice(0, 5);
  }, [products, clickCounts]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button 
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="w-full bg-white border border-gray-300 py-3 rounded-lg font-bold text-gray-700 flex justify-center items-center gap-2"
          >
            <span>🔍 검색 필터</span>
            <span>{isMobileFilterOpen ? '닫기' : '열기'}</span>
          </button>
        </div>

        {/* Sidebar (Filters + Ranking + Ads) */}
        <aside className={`lg:w-1/4 flex-shrink-0 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="space-y-6">
            <FilterSidebar 
              filters={filters} 
              setFilters={setFilters} 
              totalCount={filteredProducts.length} 
            />

            {/* Popular Ranking Widget */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">실시간 인기 (클릭순)</h3>
              <ul className="space-y-3">
                {topClickedProducts.map((p, index) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <span className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${index < 3 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 truncate">{p.name}</p>
                      <p className="text-xs text-gray-400">{clickCounts[p.id] || 0}회 조회</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <AdPlaceholder type="vertical" />
          </div>
        </aside>

        {/* Main Content (Sorting + Grid) */}
        <main className="flex-1">
          {/* Sorting Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
            <h1 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
              도시락 리스트
            </h1>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-500">정렬:</label>
              <select 
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2"
              >
                <option value="PRICE_ASC">가격 낮은 순</option>
                <option value="PRICE_DESC">가격 높은 순</option>
                <option value="PROTEIN_DESC">단백질 많은 순</option>
                <option value="CALORIE_ASC">칼로리 낮은 순</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={onClickProduct} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
              <p className="text-gray-500 text-lg mb-2">조건에 맞는 도시락이 없습니다.</p>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, minProtein: 0, maxCalorie: 1000, maxPrice: 20000, selectedMalls: [] }))}
                className="text-emerald-600 font-medium hover:underline"
              >
                필터 초기화하기
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ListPage;