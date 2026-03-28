import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from '@/context/AppContext';
import { SplashScreen } from '@/screens/SplashScreen';
import { RoleSelectionScreen } from '@/screens/RoleSelectionScreen';
import { EngineerDashboard } from '@/screens/EngineerDashboard';
import { AddFarmerScreen } from '@/screens/AddFarmerScreen';
import { FarmDetailScreen } from '@/screens/FarmDetailScreen';
import { DiseaseDetectionScreen } from '@/screens/DiseaseDetectionScreen';
import { ChatbotScreen } from '@/screens/ChatbotScreen';
import { FarmerHomeScreen } from '@/screens/FarmerHomeScreen';
import { CompanyDashboard } from '@/screens/CompanyDashboard';
import { MarketplaceScreen } from '@/screens/MarketplaceScreen';
import { NotificationsScreen } from '@/screens/NotificationsScreen';
import { EarningsScreen } from '@/screens/EarningsScreen';
import type { UserRole } from '@/types';

// Main App Content
function AppContent() {
  const { currentRole, login } = useApp();
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'role-selection' | 'main'>('splash');
  const [navigationStack, setNavigationStack] = useState<string[]>(['dashboard']);

  // Handle splash completion
  const handleSplashComplete = () => {
    setCurrentScreen('role-selection');
  };

  // Handle role selection
  const handleRoleSelect = (role: UserRole) => {
    // Auto-login with mock data
    login(role, {
      displayName: role === 'engineer' ? 'د. محمد سالم' : role === 'farmer' ? 'أحمد محمود' : 'النيل للأسمدة',
      phone: '01001234567',
    });
    setCurrentScreen('main');
  };

  // Navigation handler
  const navigateTo = (screen: string) => {
    setNavigationStack(prev => [...prev, screen]);
  };

  // Go back handler
  const goBack = () => {
    setNavigationStack(prev => prev.slice(0, -1));
  };

  // Get current screen from stack
  const getCurrentScreen = () => {
    return navigationStack[navigationStack.length - 1] || 'dashboard';
  };

  // Render screen based on role and current screen
  const renderScreen = () => {
    const screen = getCurrentScreen();

    // Engineer Screens
    if (currentRole === 'engineer') {
      switch (screen) {
        case 'dashboard':
          return <EngineerDashboard onNavigate={navigateTo} />;
        case 'add-farmer':
          return <AddFarmerScreen onBack={goBack} onComplete={goBack} />;
        case 'farm/1':
        case 'farm/2':
        case 'farm/3':
          return <FarmDetailScreen farmId={screen.split('/')[1]} onBack={goBack} onNavigate={navigateTo} />;
        case 'diagnosis':
          return <DiseaseDetectionScreen onBack={goBack} />;
        case 'chatbot':
          return <ChatbotScreen onBack={goBack} />;
        case 'notifications':
          return <NotificationsScreen onBack={goBack} />;
        case 'earnings':
          return <EarningsScreen onBack={goBack} />;
        case 'marketplace':
          return <MarketplaceScreen onNavigate={navigateTo} />;
        default:
          return <EngineerDashboard onNavigate={navigateTo} />;
      }
    }

    // Farmer Screens
    if (currentRole === 'farmer') {
      switch (screen) {
        case 'dashboard':
        case 'home':
          return <FarmerHomeScreen onNavigate={navigateTo} />;
        case 'chat-engineer':
          return <ChatbotScreen onBack={goBack} />;
        case 'chatbot':
          return <ChatbotScreen onBack={goBack} />;
        case 'notifications':
          return <NotificationsScreen onBack={goBack} />;
        case 'marketplace':
        case 'products':
          return <MarketplaceScreen onNavigate={navigateTo} />;
        default:
          return <FarmerHomeScreen onNavigate={navigateTo} />;
      }
    }

    // Company Screens
    if (currentRole === 'company') {
      switch (screen) {
        case 'dashboard':
          return <CompanyDashboard onNavigate={navigateTo} />;
        case 'marketplace':
          return <MarketplaceScreen onNavigate={navigateTo} />;
        case 'notifications':
          return <NotificationsScreen onBack={goBack} />;
        case 'earnings':
          return <EarningsScreen onBack={goBack} />;
        default:
          return <CompanyDashboard onNavigate={navigateTo} />;
      }
    }

    return <EngineerDashboard onNavigate={navigateTo} />;
  };

  return (
    <div className="mobile-container">
      <AnimatePresence mode="wait">
        {currentScreen === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SplashScreen onComplete={handleSplashComplete} />
          </motion.div>
        )}

        {currentScreen === 'role-selection' && (
          <motion.div
            key="role-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RoleSelectionScreen onSelectRole={handleRoleSelect} />
          </motion.div>
        )}

        {currentScreen === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={getCurrentScreen()}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main App with Provider
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
