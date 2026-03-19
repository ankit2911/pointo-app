import React from 'react';
import { useNavigate } from 'react-router-dom';
import { batteryProducts } from '../data/batteryProducts';
import ProductCard from '../components/ProductCard';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

const ExploreScreen: React.FC = () => {
  const { status, user } = useUser();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (status === 'installed' && user?.paymentStatus === 'recovered') {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-6 grayscale">
          🔋
        </div>
        <h1 className="text-xl font-black text-gray-900 mb-2">Catalogue Locked</h1>
        <p className="text-sm text-gray-500 mb-8 max-w-[280px]">
          New accessories and batteries are hidden until the primary battery is reclaimed.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold text-sm"
        >
          Go Home
        </button>
      </div>
    );
  }

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

      {status === 'logged_in' && (
        <div className="bg-green-600 rounded-2xl p-5 mb-5 text-white shadow-lg shadow-green-600/20 flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-bold leading-tight">Ready to upgrade?</h3>
            <p className="text-[10px] text-green-100 mt-0.5">Check your eligibility in minutes</p>
          </div>
          <button 
            onClick={() => navigate('/application/start')}
            className="bg-white text-green-700 text-[10px] font-black px-4 py-2.5 rounded-xl hover:bg-green-50 active:scale-95 transition-transform shrink-0"
          >
            Start Application
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
            onGetFinancing={() => {
              if (status === 'guest') {
                navigate('/login', { state: { from: '/financing/start' } });
              } else {
                navigate('/financing/start');
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreScreen;
