import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { batteryProducts } from '../data/batteryProducts';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Zap, Shield, CreditCard, ShoppingBag } from 'lucide-react';

const BatteryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const product = batteryProducts.find(p => p.id === id) || batteryProducts[1]; // Default to Thunder 60V if not found

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-4 border-b border-gray-100 shrink-0">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{t('details_title')}</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Product Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{product.name}</h2>
            {product.tag === 'Most Popular' && (
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                {t('details_popular')}
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-gray-500">{product.description}</p>
        </div>

        {/* Hero Illustration / Icon */}
        <div className="aspect-square bg-gradient-to-br from-green-50 to-emerald-50 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-green-500 rounded-full" />
            <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-emerald-500 rounded-full" />
          </div>
          <div className="relative z-1 w-32 h-48 bg-white rounded-3xl shadow-xl flex flex-col border border-green-100 overflow-hidden">
             <div className="h-4 w-12 bg-gray-200 mx-auto mt-2 rounded-t-lg" />
             <div className="flex-1 p-4 flex flex-col items-center justify-center gap-4">
               <Zap className="text-green-600 fill-green-600" size={48} />
               <div className="w-full space-y-2">
                 <div className="h-1.5 w-full bg-green-100 rounded-full overflow-hidden">
                   <div className="h-full w-4/5 bg-green-500 rounded-full" />
                 </div>
                 <div className="h-1.5 w-3/4 bg-green-100 rounded-full" />
               </div>
             </div>
             <div className="h-6 bg-green-50 flex items-center justify-center">
               <span className="text-[8px] font-black text-green-700 tracking-widest uppercase">POINTO LITHIUM</span>
             </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-3 font-outfit">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">{t('details_specs_title')}</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: t('details_voltage'), value: product.voltage },
              { label: t('details_capacity'), value: product.capacity },
              { label: t('product_range'), value: product.range },
              { label: t('product_charge'), value: product.chargeTime },
              { label: t('details_cycle_life'), value: product.cycleLife },
              { label: t('details_weight'), value: product.weight },
            ].map((spec) => (
              <div key={spec.label} className="bg-gray-50 border border-gray-100 p-3 rounded-2xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{spec.label}</p>
                <p className="text-sm font-black text-gray-900 mt-0.5">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Charger & BMS */}
        <div className="grid grid-cols-1 gap-4">
          {/* Charger */}
          <div className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{product.chargerName || t('details_charger_title')}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{t('charger_included_with')} {product.name}</p>
                </div>
              </div>
              {product.chargerName === 'Charger Advance' && (
                <span className="bg-blue-100 text-blue-700 text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
                  {t('charger_ip_rated')}
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              {product.chargerSpecs ? (
                product.chargerSpecs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full" />
                    <p className="text-xs font-medium text-gray-600">{spec}</p>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('details_input')}</p>
                    <p className="text-xs font-bold text-gray-900">220V AC</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('details_output')}</p>
                    <p className="text-xs font-bold text-gray-900">67.2V DC</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-blue-500 shrink-0" />
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  {t('charger_warranty')}
                </p>
              </div>
              <p className="text-xs font-black text-gray-900">{product.chargerWarranty || '1 Year'}</p>
            </div>
          </div>

          {/* Safety */}
          <div className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                <Shield size={20} />
              </div>
              <h3 className="font-bold text-gray-900">{t('details_safety_title')}</h3>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-700 tracking-wide uppercase">{t('details_safety_features')}</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {[
                  t('details_protection_overcharge'), 
                  t('details_protection_overheat'), 
                  t('details_protection_short_circuit'), 
                  t('details_protection_balancing')
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full" />
                    <p className="text-xs font-medium text-gray-600">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Warranty */}
        <div className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-3xl text-white space-y-4 shadow-xl mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-60">{t('details_warranty_title')}</h3>
            <Shield className="text-green-500" size={24} />
          </div>
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">{product.warranty.split(' ')[0]}</span>
              <span className="text-lg font-bold opacity-80">{t('details_warranty_period').split(' ')[1]}</span>
            </div>
            <div className="space-y-2 pt-4 border-t border-white/10">
              <p className="text-xs font-bold opacity-60 uppercase">{t('details_warranty_coverage')}</p>
              <div className="space-y-1.5 font-medium">
                <p className="text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  {t('details_coverage_1')}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  {t('details_coverage_2')}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  {t('details_coverage_3')}
                </p>
              </div>
            </div>
          </div>
          <p className="text-[10px] opacity-40 italic text-center pt-2">
            {t('details_authorized_dealer')}
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="shrink-0 p-4 bg-white border-t border-gray-100 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('details_price')}</p>
          <p className="text-xl font-black text-gray-900 tracking-tight">₹{product.price.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-green-600 font-bold whitespace-nowrap">₹{product.emiPrice}{t('product_per_month_emi')}</p>
        </div>
        <button className="h-12 w-12 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center border border-gray-200 hover:bg-gray-100 active:scale-95 transition-all">
          <ShoppingBag size={20} />
        </button>
        <button 
          onClick={() => navigate('/financing/start')}
          className="flex-[1.5] bg-green-600 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 hover:bg-green-700 active:scale-[0.98] transition-all"
        >
          <CreditCard size={18} />
          <span>{t('product_get_financing')}</span>
        </button>
      </div>
    </div>
  );
};

export default BatteryDetails;
