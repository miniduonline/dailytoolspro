// ===================================
// firebase-messaging-sw.js - Enhanced service worker
// ===================================

/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyADcQ7-zxfVHZ-zL6GR4MlUjLHfYoVEODk",
  authDomain: "dailytoolsprosite.firebaseapp.com",
  projectId: "dailytoolsprosite",
  storageBucket: "dailytoolsprosite.firebasestorage.app",
  messagingSenderId: "437992458964",
  appId: "1:437992458964:web:bcb79ea0ddd1767ac84941",
  measurementId: "G-BT3YMZD545"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);

  // Customize notification here
  const notificationTitle = payload.notification?.title || 'New Message';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message',
    icon: payload.notification?.icon || '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'daily-tools-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'open',
        title: 'Open App'
      }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    // Open the app
    event.waitUntil(
      clients.openWindow('/') // Replace with your app URL
    );
  }
});
