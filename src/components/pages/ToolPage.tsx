import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { tools } from '../../data/tools';
import { useAuth } from '../../contexts/AuthContext';
import { useToolTracking } from '../../hooks/useToolTracking';
import { Lock, ArrowLeft, Mail, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthModal } from '../auth/AuthModal';
import { useState } from 'react';

export const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const { user } = useAuth();
  const { addToRecent } = useToolTracking();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const tool = tools.find(t => t.id === toolId);
  
  if (!tool) {
    return <Navigate to="/" replace />;
  }

  // Check if user has access to premium tools
  const hasAccessToPremium = user && (user.emailVerified || user.providerData[0]?.providerId === 'google.com');

  // Add to recent tools when component mounts (only if user has access)
  useEffect(() => {
    if (tool && (!tool.isPremium || hasAccessToPremium)) {
      addToRecent(tool.id);
    }
  }, [tool, hasAccessToPremium, addToRecent]);
  
  // Show sign in modal if user is not authenticated
  if (tool.isPremium && !user) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 text-center">
            <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full w-fit mx-auto mb-6">
              <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 dark:text-orange-400" />
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Premium Tool
            </h1>
            
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
              <strong>{tool.name}</strong> is a premium tool. Sign in to access all premium features and unlock the full potential of Daily Tools Pro.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => setShowAuthModal(true)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                <span>Sign In to Access</span>
              </button>
              
              <Link
                to="/"
                className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Tools</span>
              </Link>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base">
                Why Sign In?
              </h4>
              <ul className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 text-left space-y-1">
                <li>• Access all premium tools</li>
                <li>• Save your favorite tools</li>
                <li>• Track your tool usage history</li>
                <li>• Sync across all your devices</li>
              </ul>
            </div>
          </div>
        </div>

        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </>
    );
  }

  // Show email verification required if user is signed in but email not verified (except Google users)
  if (tool.isPremium && user && !user.emailVerified && user.providerData[0]?.providerId !== 'google.com') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 text-center">
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-fit mx-auto mb-6">
            <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Email Verification Required
          </h1>
          
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
            To access <strong>{tool.name}</strong> and other premium tools, please verify your email address first. Check your inbox for a verification email.
          </p>

          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Signed in as:</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 break-all">
              {user.email}
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                // Resend verification email
                if (user) {
                  import('firebase/auth').then(({ sendEmailVerification }) => {
                    sendEmailVerification(user)
                      .then(() => {
                        alert('Verification email sent! Please check your inbox.');
                      })
                      .catch((error) => {
                        console.error('Error sending verification email:', error);
                        alert('Error sending verification email. Please try again.');
                      });
                  });
                }
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              <Mail className="h-4 w-4" />
              <span>Resend Verification Email</span>
            </button>
            
            <Link
              to="/dashboard"
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              <span>Go to Dashboard</span>
            </Link>
            
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Tools</span>
            </Link>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base">
              Why Email Verification?
            </h4>
            <ul className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 text-left space-y-1">
              <li>• Secure access to premium features</li>
              <li>• Account recovery protection</li>
              <li>• Important updates and notifications</li>
              <li>• Enhanced account security</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  const ToolComponent = tool.component;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Tools</span>
          </Link>
        </div>
        
        <ToolComponent />
      </div>
    </div>
  );
};