import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-lg font-bold text-gray-400 mb-4">FIT MEAL PICK</h2>
        <p className="text-gray-500 text-sm mb-2">
          본 서비스는 베타 버전으로, 실제 가격·정보와 차이가 있을 수 있습니다.
        </p>
        <p className="text-gray-400 text-xs">
          © 2024 Fit Meal Pick. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;