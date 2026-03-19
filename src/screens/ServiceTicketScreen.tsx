import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

const ServiceTicketScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { t } = useLanguage();

  if (!user || !('serviceTicket' in user) || !user.serviceTicket) return null;

  const ticket = user.serviceTicket;
  const steps = [
    { key: 'rtf_step_raised', id: 'Request Raised' },
    { key: 'rtf_step_picked', id: 'Battery Picked Up' },
    { key: 'rtf_step_repair', id: 'Under Repair' },
    { key: 'rtf_step_ready', id: 'Ready for Delivery' }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === ticket.status);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full active:scale-95 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">{t('rtf_repair_title')}</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Ticket Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{t('rtf_ticket_id')}</p>
              <h2 className="text-xl font-black text-gray-900">{ticket.id}</h2>
            </div>
            <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {t('rtf_step_repair')}
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{t('rtf_issue')}</p>
            <p className="text-sm font-bold text-gray-800">{ticket.issue}</p>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="relative pl-8 space-y-10">
          {/* Vertical Line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100" />
          
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={index} className="relative">
                {/* Step Node */}
                <div className={`absolute -left-[25px] w-5 h-5 rounded-full border-4 border-white shadow-sm z-10 transition-colors duration-500 ${
                  isCompleted ? 'bg-green-500' : isCurrent ? 'bg-amber-500' : 'bg-gray-200'
                }`} />
                
                {/* Step Content */}
                <div>
                  <h3 className={`text-sm font-bold transition-colors ${
                    isCompleted ? 'text-green-600' : isCurrent ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {t(step.key as any)}
                  </h3>
                  {isCurrent && (
                    <p className="text-xs text-gray-500 mt-1">
                      {t('rtf_completion_estimate').replace('{{days}}', ticket.estimatedDays.toString())}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-4">
           <button 
             onClick={() => navigate('/support')}
             className="bg-white text-gray-900 border border-gray-200 font-bold py-4 rounded-2xl active:scale-95 transition-transform text-sm"
           >
             {t('contact_support')}
           </button>
           <button className="bg-gray-900 text-white font-bold py-4 rounded-2xl active:scale-95 transition-transform text-sm">
             {t('rtf_call_dealer')}
           </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceTicketScreen;
