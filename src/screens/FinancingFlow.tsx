import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronRight, Gavel, User, Layout, CreditCard, Loader2, Zap } from 'lucide-react';
import { batteryProducts } from '../data/batteryProducts';

type FlowStep = 'intro' | 'plan' | 'consent' | 'identity' | 'additional' | 'result';

const FinancingFlow: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Selection state
  const [selectedBatteryId, setSelectedBatteryId] = useState(batteryProducts[1].id);
  const [downPayment, setDownPayment] = useState(12000);
  const [tenure, setTenure] = useState(24);
  
  const [step, setStep] = useState<FlowStep>('intro');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [isReserved, setIsReserved] = useState(false);

  const steps: FlowStep[] = ['intro', 'plan', 'consent', 'identity', 'additional', 'result'];
  
  const selectedBattery = batteryProducts.find(b => b.id === selectedBatteryId) || batteryProducts[0];
  const loanAmount = selectedBattery.price - downPayment;
  
  // Simple EMI logic to match user examples:
  // Spark (55k), DP 12k, Tenure 24 => EMI 2500
  // Ultra (75k), DP 30k, Tenure 24 => EMI 3200
  // Effective monthly interest rate (~1.5% for prototype simplicity)
  const calculateEMI = () => {
    if (selectedBatteryId === 'bp-spark' && downPayment === 12000 && tenure === 24) return 2500;
    if (selectedBatteryId === 'bp-ultra' && downPayment === 30000 && tenure === 24) return 3200;
    
    // Generic fallback formula: (Loan * 1.4) / Tenure (assuming 40% total interest over tenure for demo)
    return Math.round((loanAmount * 1.4) / tenure);
  };

  const emi = calculateEMI();
  const currentStepIndex = steps.indexOf(step);

  const handleIdentitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('additional');
    }, 2000);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate final decision
    setTimeout(() => {
      setLoading(false);
      setIsEligible(true); // Always true for this prototype, or mock random
      setStep('result');
    }, 1500);
  };

  const renderProgress = () => (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      {steps.map((s, idx) => {
        const isActive = idx <= currentStepIndex;
        const isCurrent = idx === currentStepIndex;
        return (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center gap-1.5">
              <div 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-green-600 scale-110 shadow-[0_0_10px_rgba(22,163,74,0.4)]' : 'bg-gray-200'
                }`}
              />
              <span className={`text-[8px] font-bold uppercase tracking-widest ${
                isCurrent ? 'text-green-600' : 'text-gray-400'
              }`}>
                {t(`fin_step_${s === 'additional' ? 'info' : s}` as any)}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-[2px] mx-2 -mt-4 transition-all duration-500 ${
                idx < currentStepIndex ? 'bg-green-600' : 'bg-gray-100'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  const StepIntro = () => (
    <div className="flex-1 flex flex-col p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-4 text-center py-4">
        <div className="w-20 h-20 bg-green-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-sm">
          <CreditCard className="text-green-600" size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-900">{t('fin_title')}</h2>
          <p className="text-sm font-medium text-gray-500 leading-relaxed px-4">
            {t('fin_subtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { icon: <CheckCircle2 className="text-green-500" />, title: t('fin_zero_down'), desc: 'Own your battery without upfront costs' },
          { icon: <CheckCircle2 className="text-green-500" />, title: t('fin_instant_approval'), desc: 'Paperless process within 5 minutes' },
          { icon: <CheckCircle2 className="text-green-500" />, title: '₹699/month EMI', desc: 'Flexible loan terms up to 24 months' },
        ].map((item, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="shrink-0 mt-0.5">{item.icon}</div>
            <div className="space-y-0.5">
              <p className="text-sm font-black text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <button 
          onClick={() => setStep('plan')}
          className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-[0.98] transition-transform"
        >
          {t('fin_start_app')}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  const StepPlan = () => (
    <div className="flex-1 flex flex-col p-6 space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="space-y-2">
        <h2 className="text-xl font-black text-gray-900">{t('fin_select_plan')}</h2>
        <p className="text-xs text-gray-500">{t('fin_subtitle')}</p>
      </div>

      <div className="space-y-6">
        {/* Battery Selection */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('nav_my_battery')}</label>
          <div className="grid grid-cols-2 gap-3">
            {batteryProducts.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBatteryId(b.id)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col gap-1 text-left ${
                  selectedBatteryId === b.id 
                  ? 'border-green-600 bg-green-50 shadow-md translate-y-[-2px]' 
                  : 'border-gray-100 bg-white opacity-60'
                }`}
              >
                <span className="text-[10px] font-bold text-gray-500 uppercase">{b.tag}</span>
                <span className="text-xs font-black text-gray-900">{b.name}</span>
                <span className="text-xs font-bold text-green-600">₹{b.price.toLocaleString('en-IN')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* DP & Tenure Selection */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('fin_downpayment')}</label>
            <div className="space-y-2">
              {[12000, 30000].map((dp) => (
                <button
                  key={dp}
                  onClick={() => setDownPayment(dp)}
                  className={`w-full py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                    downPayment === dp 
                    ? 'border-gray-900 bg-gray-900 text-white' 
                    : 'border-gray-100 bg-white text-gray-500'
                  }`}
                >
                  ₹{dp.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('fin_tenure')}</label>
            <div className="space-y-2">
              {[12, 24].map((t_val) => (
                <button
                  key={t_val}
                  onClick={() => setTenure(t_val)}
                  className={`w-full py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                    tenure === t_val 
                    ? 'border-gray-900 bg-gray-900 text-white' 
                    : 'border-gray-100 bg-white text-gray-500'
                  }`}
                >
                  {t_val} Months
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white border-2 border-green-600 rounded-3xl p-5 shadow-xl shadow-green-600/5 space-y-4">
           <div className="flex items-center justify-between pb-3 border-b border-gray-100">
             <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">{t('fin_summary')}</h3>
             <Zap className="text-green-500 fill-green-500" size={16} />
           </div>
           <div className="grid grid-cols-2 gap-y-4">
             <div>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{t('nav_my_battery')}</p>
               <p className="text-xs font-black text-gray-900">{selectedBattery.name}</p>
             </div>
             <div>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{t('fin_loan_amt')}</p>
               <p className="text-xs font-black text-gray-900">₹{loanAmount.toLocaleString('en-IN')}</p>
             </div>
             <div>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{t('fin_emi')}</p>
               <p className="text-sm font-black text-green-600 tracking-tight">₹{emi.toLocaleString('en-IN')}/mo</p>
             </div>
             <div>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{t('fin_tenure')}</p>
               <p className="text-xs font-black text-gray-900">{tenure} {t('fin_months')}</p>
             </div>
           </div>
        </div>
      </div>

      <div className="mt-auto">
        <button 
          onClick={() => setStep('consent')}
          className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-[0.98] transition-transform"
        >
          {t('fin_proceed_credit')}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  const StepConsent = () => (
    <div className="flex-1 flex flex-col p-6 space-y-8 animate-in fade-in slide-in-from-right-4">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
          <Gavel className="text-blue-600" size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-gray-900">{t('fin_consent_title')}</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            {t('fin_consent_text')}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex gap-4 p-4 rounded-2xl border-2 border-gray-100 bg-white hover:border-blue-100 transition-colors cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input 
              type="checkbox" 
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="peer sr-only"
            />
            <div className="w-6 h-6 border-2 border-gray-300 rounded-lg transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-white opacity-0 peer-checked:opacity-100" />
            </div>
          </div>
          <p className="text-xs font-bold text-gray-700 leading-normal">
            {t('fin_consent_checkbox')}
          </p>
        </label>
        <button className="text-xs font-bold text-blue-600 hover:underline px-1">
          {t('fin_terms_link')}
        </button>
      </div>

      <div className="mt-auto">
        <button 
          disabled={!consent}
          onClick={() => setStep('identity')}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
            consent 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 active:scale-[0.98]' 
            : 'bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed'
          }`}
        >
          {t('fin_continue')}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  const StepIdentity = () => (
    <div className="flex-1 flex flex-col p-6 space-y-8 animate-in fade-in slide-in-from-right-4">
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="text-green-600 animate-spin" size={48} />
          <p className="text-sm font-bold text-gray-600">{t('fin_checking')}</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center">
              <User className="text-purple-600" size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-gray-900">{t('fin_identity_title')}</h2>
            </div>
          </div>

          <form onSubmit={handleIdentitySubmit} className="space-y-5 flex-1 flex flex-col">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('fin_full_name')}</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('fin_pan_number')}</label>
                <input 
                  required
                  type="text" 
                  placeholder="ABCDE1234F"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all uppercase"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('fin_dob')}</label>
                <input 
                  required
                  type="date" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
              </div>
            </div>

            <div className="mt-auto">
              <button 
                type="submit"
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-transform"
              >
                {t('fin_check_eligibility')}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );

  const StepAdditional = () => (
    <div className="flex-1 flex flex-col p-6 space-y-8 animate-in fade-in slide-in-from-right-4">
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="text-green-600 animate-spin" size={48} />
          <p className="text-sm font-bold text-gray-600">{t('sr_request_submitted')}</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center">
              <Layout className="text-orange-600" size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-gray-900">{t('fin_additional_info')}</h2>
            </div>
          </div>

          <form onSubmit={handleFinalSubmit} className="space-y-5 flex-1 flex flex-col">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('fin_house_type')}</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none">
                  <option value="owned">{t('fin_house_owned')}</option>
                  <option value="rented">{t('fin_house_rented')}</option>
                  <option value="family">{t('fin_house_family')}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('fin_income')}</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none">
                  <option value="low">{t('fin_income_low')}</option>
                  <option value="mid">{t('fin_income_mid')}</option>
                  <option value="high">{t('fin_income_high')}</option>
                  <option value="vhigh">{t('fin_income_vhigh')}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('fin_employment_type')}</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none">
                  <option value="salaried">{t('fin_emp_salaried')}</option>
                  <option value="self">{t('fin_emp_self')}</option>
                  <option value="business">{t('fin_emp_business')}</option>
                </select>
              </div>
            </div>

            <div className="mt-auto">
              <button 
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-green-600/20 active:scale-[0.98] transition-transform"
              >
                {t('fin_submit_app')}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );

  const StepResult = () => (
    <div className="flex-1 flex flex-col p-6 space-y-8 animate-in zoom-in-95 duration-500">
      {isEligible ? (
        <>
          <div className="space-y-4 text-center py-6">
            <div className="w-24 h-24 bg-green-50 rounded-[3rem] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="text-green-600" size={60} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-gray-900">
                {isReserved ? t('fin_reserve_success') : t('fin_result_success')}
              </h2>
              <p className="text-sm font-medium text-gray-500 leading-relaxed px-4">
                {isReserved ? t('fin_contact_msg') : "Congratulations! We've found the best financing plan for you."}
              </p>
            </div>
          </div>

          {!isReserved && (
            <div className="bg-white border-2 border-green-600 rounded-[2rem] p-6 space-y-6 shadow-2xl shadow-green-600/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                 <Zap className="text-green-600 fill-green-600 opacity-20" size={64} />
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-1">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('nav_my_battery')}</p>
                  <p className="text-sm font-black text-gray-900">{selectedBattery.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('fin_loan_amt')}</p>
                  <p className="text-sm font-black text-gray-900">₹{loanAmount.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('fin_emi')}</p>
                  <p className="text-sm font-black text-green-600 tracking-tight">₹{emi.toLocaleString('en-IN')}/mo</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('fin_tenure')}</p>
                  <p className="text-sm font-black text-gray-900">{tenure} {t('fin_months')}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-auto space-y-3">
            {!isReserved ? (
              <button 
                onClick={() => setIsReserved(true)}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all"
              >
                {t('fin_reserve_battery')}
              </button>
            ) : (
              <button 
                onClick={() => navigate('/')}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all"
              >
                {t('nav_home')}
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="space-y-4 text-center py-6">
            <div className="w-24 h-24 bg-red-50 rounded-[3rem] flex items-center justify-center mx-auto">
              <AlertCircle className="text-red-600" size={60} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-gray-900">{t('fin_result_failure')}</h2>
              <p className="text-sm text-gray-500 leading-relaxed px-4">
                {t('fin_failure_text')}
              </p>
            </div>
          </div>

          <div className="mt-auto">
            <button 
              onClick={() => navigate('/support')}
              className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all"
            >
              {t('fin_contact_dealer')}
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-4 bg-white">
        <button 
          onClick={() => step === 'intro' ? navigate(-1) : setStep(steps[currentStepIndex - 1])}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Financing Application</h1>
      </div>

      {step !== 'result' && renderProgress()}

      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
        {step === 'intro' && <StepIntro />}
        {step === 'plan' && <StepPlan />}
        {step === 'consent' && <StepConsent />}
        {step === 'identity' && <StepIdentity />}
        {step === 'additional' && <StepAdditional />}
        {step === 'result' && <StepResult />}
      </div>
    </div>
  );
};

export default FinancingFlow;
