import React from 'react';

interface AdPlaceholderProps {
  type: 'horizontal' | 'vertical';
  className?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type, className = '' }) => {
  const baseClasses = "bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 text-sm p-4";
  const sizeClasses = type === 'horizontal' ? "w-full h-32" : "w-full h-full min-h-[300px]";

  return (
    <div className={`${baseClasses} ${sizeClasses} ${className}`}>
      <span className="font-semibold mb-1">ADVERTISEMENT</span>
      <span className="text-xs text-center">여기는 향후 광고/배너가 들어갈 영역입니다</span>
    </div>
  );
};

export default AdPlaceholder;