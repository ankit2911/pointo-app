import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import CommunityScreen from './screens/CommunityScreen';
import MyBatteryScreen from './screens/MyBatteryScreen';
import ProfileScreen from './screens/ProfileScreen';
import InstallationScreen from './screens/InstallationScreen';
import InstallationStatus from './screens/InstallationStatus';
import PaymentHistory from './screens/PaymentHistory';
import Documents from './screens/Documents';
import Support from './screens/Support';
import ServiceRequests from './screens/ServiceRequests';
import LoginScreen from './screens/LoginScreen';
import BatteryDetails from './screens/BatteryDetails';
import FinancingFlow from './screens/FinancingFlow';
import { LanguageProvider } from './context/LanguageContext';

const MainLayout = () => (
  <>
    <Header />
    <main className="flex-1 overflow-y-auto bg-gray-50 scrollbar-hide">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/explore" element={<ExploreScreen />} />
        <Route path="/community" element={<CommunityScreen />} />
        <Route path="/my-battery" element={<MyBatteryScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/installation" element={<InstallationScreen />} />
        <Route path="/installation-status" element={<InstallationStatus />} />
        <Route path="/payments" element={<PaymentHistory />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/support" element={<Support />} />
        <Route path="/service-requests" element={<ServiceRequests />} />
      </Routes>
    </main>
    <BottomNav />
  </>
);

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <UserProvider>
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
          <div className="w-full max-w-[390px] h-screen max-h-[844px] bg-white flex flex-col shadow-2xl shadow-gray-400/30 overflow-hidden rounded-none sm:rounded-[2rem] sm:border sm:border-gray-200">
            <Routes>
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/battery/:id" element={<BatteryDetails />} />
              <Route path="/financing/start" element={<FinancingFlow />} />
              <Route path="/*" element={<MainLayout />} />
            </Routes>
          </div>
        </div>
      </UserProvider>
    </LanguageProvider>
  );
};

export default App;
