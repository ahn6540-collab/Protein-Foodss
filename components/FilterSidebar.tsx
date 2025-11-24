import React from 'react';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount: number;
}

const MALL_OPTIONS = ['쿠팡', '랭킹닭컴', '네이버스토어'];

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, totalCount }) => {
  
  const handleMallChange = (mall: string) => {
    setFilters(prev => {
      const newMalls = prev.selectedMalls.includes(mall)
        ? prev.selectedMalls.filter(m => m !== mall)
        : [...prev.selectedMalls, mall];
      return { ...prev, selectedMalls: newMalls };
    });
  };

  const handleReset = () => {
    setFilters({
      minProtein: 0,
      maxCalorie: 1000,
      maxSugar: 20,
      minPrice: 0,
      maxPrice: 15000,
      maxPricePer100g: 5000,
      selectedMalls: []
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg text-gray-900">필터</h2>
        <button 
          onClick={handleReset}
          className="text-xs text-gray-500 underline hover:text-emerald-600"
        >
          초기화
        </button>
      </div>

      <div className="space-y-8">
        {/* Mall Selection */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3">쇼핑몰</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox"
                checked={filters.selectedMalls.length === 0}
                onChange={() => setFilters(prev => ({ ...prev, selectedMalls: [] }))}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-600">전체</span>
            </label>
            {MALL_OPTIONS.map(mall => (
              <label key={mall} className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={filters.selectedMalls.includes(mall)}
                  onChange={() => handleMallChange(mall)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600">{mall}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Protein Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">단백질 (최소)</h3>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              {filters.minProtein}g 이상
            </span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="50" 
            value={filters.minProtein} 
            onChange={(e) => setFilters(prev => ({ ...prev, minProtein: Number(e.target.value) }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Calorie Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">칼로리 (최대)</h3>
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
              {filters.maxCalorie}kcal 이하
            </span>
          </div>
          <input 
            type="range" 
            min="100" 
            max="1000" 
            step="10"
            value={filters.maxCalorie} 
            onChange={(e) => setFilters(prev => ({ ...prev, maxCalorie: Number(e.target.value) }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Sugar Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">당류 (최대)</h3>
            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {filters.maxSugar}g 이하
            </span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="20" 
            value={filters.maxSugar} 
            onChange={(e) => setFilters(prev => ({ ...prev, maxSugar: Number(e.target.value) }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Price Inputs */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3">1팩 가격 (원)</h3>
          <div className="flex items-center space-x-2">
            <input 
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
              placeholder="최소"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <span className="text-gray-400">~</span>
            <input 
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              placeholder="최대"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Price per 100g */}
        <div>
           <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">100g당 가격 (최대)</h3>
            <span className="text-xs text-gray-500">{filters.maxPricePer100g.toLocaleString()}원</span>
          </div>
           <input 
            type="range" 
            min="500" 
            max="5000" 
            step="100"
            value={filters.maxPricePer100g} 
            onChange={(e) => setFilters(prev => ({ ...prev, maxPricePer100g: Number(e.target.value) }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <span className="text-sm text-gray-500">
          검색 결과 <strong className="text-emerald-600">{totalCount}</strong>건
        </span>
      </div>
    </div>
  );
};

export default FilterSidebar;