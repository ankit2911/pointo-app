import React from 'react';

interface ProductCardProps {
  name: string;
  voltage: string;
  range: string;
  chargeTime: string;
  warranty: string;
  price: number;
  emiPrice: number;
  tag?: string;
}

const BatteryIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
    <line x1="23" y1="10" x2="23" y2="14" />
    <line x1="6" y1="10" x2="6" y2="14" />
    <line x1="10" y1="10" x2="10" y2="14" />
    <line x1="14" y1="10" x2="14" y2="14" />
  </svg>
);

const ProductCard: React.FC<ProductCardProps> = ({
  name, voltage, range, chargeTime, warranty, price, emiPrice, tag,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden">
      {tag && (
        <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
          {tag}
        </span>
      )}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
          <BatteryIcon />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900 leading-tight">{name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{voltage}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gray-50 rounded-xl p-2.5 text-center">
          <p className="text-xs text-gray-400">Range</p>
          <p className="text-sm font-bold text-gray-900">{range}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-2.5 text-center">
          <p className="text-xs text-gray-400">Charge</p>
          <p className="text-sm font-bold text-gray-900">{chargeTime}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-2.5 text-center">
          <p className="text-xs text-gray-400">Warranty</p>
          <p className="text-sm font-bold text-gray-900">{warranty}</p>
        </div>
      </div>

      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-lg font-extrabold text-gray-900">₹{price.toLocaleString('en-IN')}</p>
          <p className="text-xs text-green-600 font-medium">or ₹{emiPrice}/month EMI</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-white border-2 border-green-600 text-green-600 font-semibold text-sm py-2.5 rounded-xl hover:bg-green-50 transition-colors active:scale-[0.98]">
          View Details
        </button>
        <button className="flex-1 bg-green-600 text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-green-700 transition-colors active:scale-[0.98]">
          Get Financing
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
