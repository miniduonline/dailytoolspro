// firebase.ts - Enhanced version with better error handling
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyADcQ7-zxfVHZ-zL6GR4MlUjLHfYoVEODk",
  authDomain: "dailytoolsprosite.firebaseapp.com",
  projectId: "dailytoolsprosite",
  storageBucket: "dailytoolsprosite.firebasestorage.app",
  messagingSenderId: "437992458964",
  appId: "1:437992458964:web:bcb79ea0ddd1767ac84941",
  measurementId: "G-BT3YMZD545"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize messaging only if supported
let messaging: any = null;

const initializeMessaging = async () => {
  const supported = await isSupported();
  if (supported) {
    messaging = getMessaging(app);
    return messaging;
  }
  console.warn('Firebase Messaging is not supported in this browser');
  return null;
};

export const requestForToken = async () => {
  try {
    // Check if messaging is supported
    if (!messaging) {
      messaging = await initializeMessaging();
      if (!messaging) return null;
    }

    // Request notification permission
    const permission = await Notification.requestPermission();
    console.log('Notification permission:', permission);
    
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }

    // Get FCM token
    const currentToken = await getToken(messaging, {
      vapidKey: "BCzF5mDUHxyv_0e74KcGwynV_8rvuCohShjeNDMN8v2fRt2hWOOsrnk8DgXQ9z3KONCMkekR3B1R_WXmc4cgGfI"
    });

    if (currentToken) {
      console.log('FCM Token:', currentToken);
      // TODO: Send token to your backend
      return currentToken;
    } else {
      console.warn('No registration token available');
      return null;
    }
  } catch (err) {
    console.error('An error occurred while retrieving token:', err);
    return null;
  }
};

export const setupMessageListener = async () => {
  try {
    if (!messaging) {
      messaging = await initializeMessaging();
      if (!messaging) return;
    }

    onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      
      // Show notification manually for foreground messages
      if (payload.notification) {
        new Notification(payload.notification.title || 'New Message', {
          body: payload.notification.body,
          icon: payload.notification.icon || '/favicon.ico',
          badge: '/favicon.ico'
        });
      }
    });
  } catch (error) {
    console.error('Error setting up message listener:', error);
  }
};

export { messaging };
export default app;
