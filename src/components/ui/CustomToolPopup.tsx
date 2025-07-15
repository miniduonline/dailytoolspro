import React, { useState, useEffect } from 'react';
import { X, Mail, MessageCircle, CheckCircle, Zap, Clock } from 'lucide-react';

interface CustomToolPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomToolPopup: React.FC<CustomToolPopupProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleEmailContact = () => {
    const subject = encodeURIComponent('Custom Tool Development Inquiry');
    const body = encodeURIComponent(
      "Hi,\n\nI'm interested in getting a custom tool developed for my needs. Please let me know more about your services and pricing.\n\nThanks!"
    );
    window.open(`mailto:hello@minidushashimal.com?subject=${subject}&body=${body}`);
    handleClose();
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      "Hi, I'm interested in custom tool development services. Can you tell me more about your offerings?"
    );
    window.open(`https://wa.me/94702382336?text=${message}`, '_blank');
    handleClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'bg-black bg-opacity-60 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={handleOverlayClick}
    >
      <div 
        className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
      >
        {/* Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-2xl p-0.5">
          <div className="bg-white dark:bg-gray-800 rounded-2xl h-full w-full" />
        </div>

        {/* Content */}
        <div className="relative p-8">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <X className="h-5 w-5 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Need a Custom Tool?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Get a professional web tool built specifically for your needs
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Professional custom tool development
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Tailored to your specific requirements
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Clock className="h-3 w-3 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Quick turnaround time & ongoing support
              </span>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleEmailContact}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              <Mail className="h-4 w-4" />
              <span>Email Us</span>
            </button>
            
            <button
              onClick={handleWhatsAppContact}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="h-3 w-3" />
                <span>hello@minidushashimal.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <MessageCircle className="h-3 w-3" />
                <span>+94 70 238 2336</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};