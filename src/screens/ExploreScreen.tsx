import React from 'react';
import { batteryProducts } from '../data/batteryProducts';
import ProductCard from '../components/ProductCard';

const ExploreScreen: React.FC = () => {
  return (
    <div className="p-4 pb-6">
      <div className="mb-4">
        <h1 className="text-xl font-extrabold text-gray-900">Battery Catalogue</h1>
        <p className="text-sm text-gray-500 mt-0.5">Find the perfect lithium upgrade for your EV</p>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        {['All', '48V', '60V', '72V', 'Budget', 'Premium'].map((filter, i) => (
          <button
            key={filter}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
              i === 0
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="space-y-3">
        {batteryProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            voltage={product.voltage}
            range={product.range}
            chargeTime={product.chargeTime}
            warranty={product.warranty}
            price={product.price}
            emiPrice={product.emiPrice}
            tag={product.tag}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreScreen;
