// ===================================
// App.tsx - Fixed with proper navigation debugging
// ===================================

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './components/pages/Home';
import { Categories } from './components/pages/Categories';
import { Dashboard } from './components/pages/Dashboard';
import { ToolPage } from './components/pages/ToolPage';
import { requestForToken, setupMessageListener } from './config/firebase';

// Component to debug routing
function RouteDebugger() {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Current route:', location.pathname);
    console.log('Route state:', location.state);
  }, [location]);
  
  return null;
}

function App() {
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        // Request FCM token
        const token = await requestForToken();
        
        if (token) {
          console.log('Successfully got FCM token');
          // Set up message listener for foreground messages
          await setupMessageListener();
        }
      } catch (error) {
        console.error('Failed to initialize notifications:', error);
      }
    };

    initializeNotifications();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <RouteDebugger />
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tool/:toolId" element={<ToolPage />} />
                {/* Add a catch-all route for debugging */}
                <Route path="*" element={
                  <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-red-600">404 - Page Not Found</h2>
                    <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
                  </div>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;