import { useState, useEffect } from 'react';

const POPUP_STORAGE_KEY = 'customToolPopupLastShown';
const POPUP_DELAY = 12000; // 12 seconds
const POPUP_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const useCustomToolPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTimer, setPopupTimer] = useState<NodeJS.Timeout | null>(null);

  const shouldShowPopup = (): boolean => {
    const lastShown = localStorage.getItem(POPUP_STORAGE_KEY);
    if (!lastShown) return true;
    
    const lastShownTime = new Date(lastShown).getTime();
    const now = new Date().getTime();
    
    return (now - lastShownTime) >= POPUP_COOLDOWN;
  };

  const showPopup = () => {
    if (shouldShowPopup()) {
      setIsPopupOpen(true);
      localStorage.setItem(POPUP_STORAGE_KEY, new Date().toISOString());
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    if (popupTimer) {
      clearTimeout(popupTimer);
      setPopupTimer(null);
    }
  };

  const initializePopup = () => {
    if (shouldShowPopup()) {
      const timer = setTimeout(() => {
        showPopup();
      }, POPUP_DELAY);
      
      setPopupTimer(timer);
    }
  };

  const resetPopupTimer = () => {
    localStorage.removeItem(POPUP_STORAGE_KEY);
    console.log('Popup timer reset. Popup will show again on next page load.');
  };

  const triggerPopupNow = () => {
    localStorage.removeItem(POPUP_STORAGE_KEY);
    showPopup();
  };

  useEffect(() => {
    initializePopup();

    // Cleanup timer on unmount
    return () => {
      if (popupTimer) {
        clearTimeout(popupTimer);
      }
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isPopupOpen) {
        closePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isPopupOpen]);

  return {
    isPopupOpen,
    closePopup,
    resetPopupTimer,
    triggerPopupNow
  };
};