import React from 'react';
import { useNavigate } from 'react-router-dom';
import { batteryProducts } from '../data/batteryProducts';
import ProductCard from '../components/ProductCard';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

const ExploreScreen: React.FC = () => {
  const { status } = useUser();
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="p-4 pb-6">
      {status === 'approved' && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-indigo-900">{t('explore_already_reserved')}</p>
            <p className="text-[10px] text-indigo-600 mt-0.5">{t('explore_pending_install')}</p>
          </div>
          <button 
            onClick={() => navigate('/installation')}
            className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-700 active:scale-95 transition-transform"
          >
            {t('explore_view_install')}
          </button>
        </div>
      )}

      <div className="mb-4">
        <h1 className="text-xl font-extrabold text-gray-900">{t('explore_catalogue')}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{t('explore_find_perfect')}</p>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        {[t('explore_filter_all'), '48V', '60V', '72V', t('explore_filter_budget'), t('explore_filter_premium')].map((filter, i) => (
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
            id={product.id}
            name={product.name}
            voltage={`${product.voltage} ${product.capacity}`}
            range={product.range}
            chargeTime={product.chargeTime}
            warranty={product.warranty}
            price={product.price}
            emiPrice={product.emiPrice}
            tag={product.tag}
            onViewDetails={() => navigate(`/battery/${product.id}`)}
            onGetFinancing={() => navigate('/financing/start')}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreScreen;
