import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(product.id);
    // In a real app, this would open window.open(product.detailUrl)
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer group"
      onClick={() => onClick(product.id)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isSponsored && (
          <span className="absolute top-2 right-2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded">
            AD
          </span>
        )}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2 py-1 rounded font-medium shadow-sm">
          {product.mall}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
          <span>{product.weightPerPack}g</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>{product.pricePer100g.toLocaleString()}원/100g</span>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-gray-50 p-2 rounded-lg mb-4 text-center text-sm">
          <div>
            <div className="text-xs text-gray-500 mb-1">단백질</div>
            <div className="font-bold text-emerald-600">{product.protein}g</div>
          </div>
          <div className="border-x border-gray-200">
            <div className="text-xs text-gray-500 mb-1">칼로리</div>
            <div className="font-bold text-orange-500">{product.calorie}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">당류</div>
            <div className="font-bold text-gray-600">{product.sugar}g</div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-xl font-bold text-gray-900">
            {product.pricePerPack.toLocaleString()}
            <span className="text-sm font-normal text-gray-500 ml-1">원</span>
          </div>
          <button 
            onClick={handleLinkClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;