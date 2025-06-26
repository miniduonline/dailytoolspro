// ===================================
// main.tsx - Enhanced service worker registration
// ===================================

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Firebase service worker with better error handling
// Skip registration in StackBlitz environment where service workers are not supported
if ('serviceWorker' in navigator && !window.location.hostname.includes('stackblitz')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js', { scope: '/' })
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          console.log('Service Worker update found');
        });
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
} else if (window.location.hostname.includes('stackblitz')) {
  console.log('Service Worker registration skipped: StackBlitz environment detected');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);