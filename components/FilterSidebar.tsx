import React from 'react';
import { FilterState } from '../types.ts';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, totalCount }) => {
  
  const handleReset = () => {
    setFilters({
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
  };

  const updateRange = (field: keyof FilterState, value: number) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const RangeSlider = ({ label, minField, maxField, min, max, step = 1, unit = '' }: any) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-[11px] font-bold text-gray-800">{label} ({unit})</h3>
        <span className="text-[10px] text-orange-500 font-semibold bg-orange-50 px-2 py-0.5 rounded">
          {filters[minField]} ~ {filters[maxField]}
        </span>
      </div>
      <div className="space-y-1 bg-[#FFF7F2] border border-orange-100 rounded-xl px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="w-8 text-[10px] text-gray-400">최소</span>
          <input 
            type="range" min={min} max={max} step={step} value={filters[minField]}
            onChange={(e) => updateRange(minField, Number(e.target.value))}
            className="w-full h-1.5 bg-orange-100 rounded-full appearance-none cursor-pointer accent-orange-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-8 text-[10px] text-gray-400">최대</span>
          <input 
            type="range" min={min} max={max} step={step} value={filters[maxField]}
            onChange={(e) => updateRange(maxField, Number(e.target.value))}
            className="w-full h-1.5 bg-orange-100 rounded-full appearance-none cursor-pointer accent-orange-400"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm sticky top-20 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-extrabold text-sm text-gray-900">Filters</h2>
          <p className="text-[10px] text-gray-400">영양 성분별 맞춤 검색</p>
        </div>
        <button 
          onClick={handleReset}
          className="text-[10px] text-gray-400 hover:text-orange-500 underline"
        >
          초기화
        </button>
      </div>

      <div className="space-y-5">
        <RangeSlider label="단백질" minField="minProtein" maxField="maxProtein" min={0} max={50} unit="g" />
        <RangeSlider label="탄수화물" minField="minCarb" maxField="maxCarb" min={0} max={80} unit="g" />
        <RangeSlider label="지방" minField="minFat" maxField="maxFat" min={0} max={30} unit="g" />
        <RangeSlider label="당류" minField="minSugar" maxField="maxSugar" min={0} max={20} unit="g" />
        <RangeSlider label="칼로리" minField="minCalorie" maxField="maxCalorie" min={0} max={800} step={10} unit="kcal" />
      </div>

      <div className="pt-4 border-t border-orange-50 text-center">
        <p className="text-[11px] text-gray-500">
          검색 결과 <strong className="text-orange-500">{totalCount}</strong>건
        </p>
      </div>
    </div>
  );
};

export default FilterSidebar;