import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ApplicationStartFlow: React.FC = () => {
  const { loggedInUser, updateLoggedInUser } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    vehicleModel: loggedInUser?.vehicleModel || '',
    city: loggedInUser?.city || '',
    usageType: loggedInUser?.usageType || 'Personal' as 'Personal' | 'Commercial',
  });

  useEffect(() => {
    if (!loggedInUser?.applicationStarted) {
      updateLoggedInUser({ applicationStarted: true });
    }
  }, []);

  const handleContinue = () => {
    updateLoggedInUser(formData);
    setStep(2);
  };

  if (step === 2) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        {/* Header */}
        <div className="px-4 py-4 flex items-center gap-4">
          <button onClick={() => setStep(1)} className="p-2 -ml-2 text-gray-400 hover:text-gray-600 transition-colors">
            <ChevronLeft />
          </button>
          <h1 className="text-lg font-black text-gray-900">Your Recommendation</h1>
        </div>

        <div className="flex-1 px-6 py-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-sm font-black text-green-600 uppercase tracking-widest">Recommended Battery</h2>
            <p className="text-3xl font-black text-gray-900 leading-tight">Pointo Ultra 51.2V</p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 space-y-6">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Why this suits you</h3>
            
            <div className="space-y-5">
              {[
                { title: 'Best range for your usage', desc: 'Optimized for high-efficiency city commutes.' },
                { title: 'Faster charging', desc: '0-80% in just 3.5 hours with Pointo Home Charge.' },
                { title: 'Higher savings', desc: 'Lower running costs compared to conventional batteries.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <CheckCircle />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <button
              onClick={() => navigate('/financing/start')}
              className="w-full bg-green-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all"
            >
              Proceed with Financing
            </button>
            <button
              onClick={() => navigate('/explore')}
              className="w-full bg-white text-gray-400 font-bold py-2 text-sm"
            >
              Explore Other Options
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-400 hover:text-gray-600 transition-colors">
          <ChevronLeft />
        </button>
        <h1 className="text-lg font-black text-gray-900">Get Started</h1>
      </div>

      <div className="flex-1 px-6 py-8 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-900 leading-tight">Tell us about your ride</h2>
          <p className="text-sm font-medium text-gray-400">We'll recommend the best lithium upgrade for you.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Vehicle Model</label>
            <input
              type="text"
              value={formData.vehicleModel}
              onChange={(e) => setFormData(prev => ({ ...prev, vehicleModel: e.target.value }))}
              placeholder="e.g. Ather 450X"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-green-500 font-bold text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              placeholder="e.g. Bangalore"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-green-500 font-bold text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Usage Type</label>
            <div className="grid grid-cols-2 gap-4">
              {['Personal', 'Commercial'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData(prev => ({ ...prev, usageType: type as any }))}
                  className={`py-4 rounded-2xl font-bold text-sm transition-all border-2 ${
                    formData.usageType === type 
                      ? 'bg-green-50 border-green-500 text-green-700' 
                      : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 mt-auto">
          <button
            onClick={handleContinue}
            disabled={!formData.vehicleModel || !formData.city}
            className="w-full bg-green-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:bg-gray-400 disabled:shadow-none"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStartFlow;
