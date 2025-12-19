import React from 'react';
import { Product } from '../types.ts';

interface ProductCardProps {
  product: Product;
  onClick: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <article 
      className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col border border-orange-50 hover:border-orange-200 transition-all cursor-pointer group"
      onClick={() => onClick(product.id)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black/60 text-[10px] text-white backdrop-blur-sm">
          {product.mall}
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold leading-snug line-clamp-2 h-10 text-gray-800">
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-500">
            {product.weightPerPack}g ({product.pricePer100g.toLocaleString()}원/100g)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 py-2 px-3 bg-orange-50/50 rounded-xl border border-orange-100/50">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-500">탄수화물</span>
            <span className="font-bold text-gray-800">{product.carb}g</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-500">단백질</span>
            <span className="font-bold text-orange-600">{product.protein}g</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-500">지방</span>
            <span className="font-bold text-gray-800">{product.fat}g</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-500">칼로리</span>
            <span className="font-bold text-gray-800">{product.calorie}kcal</span>
          </div>
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="text-lg font-extrabold text-gray-900">
            {product.pricePerPack.toLocaleString()}
            <span className="text-[11px] font-normal ml-0.5">원</span>
          </div>
          <button 
            className="px-4 py-1.5 rounded-full bg-orange-400 text-white text-[11px] font-bold hover:bg-orange-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClick(product.id);
            }}
          >
            구매하기
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;