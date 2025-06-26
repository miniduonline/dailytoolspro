import React, { useState } from 'react';
import { Heart, Coffee, Mail, X, Shield, FileText, HelpCircle, Facebook, Instagram } from 'lucide-react';

// Custom TikTok icon since it's not available in lucide-react
const TikTokIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  const PrivacyPolicyContent = () => (
    <div className="space-y-4 text-gray-700 dark:text-gray-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy Policy</h3>
      <p><strong>Last updated:</strong> June 17, 2025</p>
      
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Information We Collect</h4>
          <p className="text-sm">We collect minimal information to provide our services. This may include usage analytics, error logs, and any information you voluntarily provide when contacting us.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">How We Use Your Information</h4>
          <p className="text-sm">We use collected information to improve our services, fix bugs, and respond to your inquiries. We do not sell or share your personal information with third parties.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Data Storage</h4>
          <p className="text-sm">Most tools process data locally in your browser. We do not store your personal files or data on our servers unless explicitly stated.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Third-Party Services</h4>
          <p className="text-sm">We may use third-party analytics and error tracking services. These services have their own privacy policies.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Contact Us</h4>
          <p className="text-sm">If you have questions about this Privacy Policy, contact us at admin@dailytoolspro.com</p>
        </div>
      </div>
    </div>
  );

  const TermsOfUseContent = () => (
    <div className="space-y-4 text-gray-700 dark:text-gray-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Terms of Use</h3>
      <p><strong>Last updated:</strong> June 17, 2025</p>
      
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Acceptance of Terms</h4>
          <p className="text-sm">By using Daily Tools Pro, you agree to these terms. If you don't agree, please don't use our services.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Use of Services</h4>
          <p className="text-sm">Our tools are provided free of charge for personal and commercial use. You may not use our services for illegal activities or to harm others.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Disclaimer</h4>
          <p className="text-sm">Our tools are provided "as is" without warranties. We're not liable for any damages from using our services. Always backup important data.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Intellectual Property</h4>
          <p className="text-sm">Daily Tools Pro and its original content are owned by Minidu Shashimal Aluthge. You retain ownership of any content you create using our tools.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Changes to Terms</h4>
          <p className="text-sm">We may update these terms occasionally. Continued use constitutes acceptance of updated terms.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Contact</h4>
          <p className="text-sm">Questions about these terms? Contact admin@dailytoolspro.com</p>
        </div>
      </div>
    </div>
  );

  const FAQContent = () => (
    <div className="space-y-4 text-gray-700 dark:text-gray-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Is Daily Tools Pro really free?</h4>
          <p className="text-sm">Yes! All our core tools are completely free to use. We may offer premium features in the future, but the essential functionality will always be free.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Do I need to create an account?</h4>
          <p className="text-sm">No account required! Most tools work directly in your browser without any registration or login.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Is my data safe?</h4>
          <p className="text-sm">Yes. Most tools process your data locally in your browser. We don't store your files or personal data on our servers.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Can I use these tools for commercial purposes?</h4>
          <p className="text-sm">Absolutely! You can use our tools for both personal and commercial projects without any restrictions.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">What browsers are supported?</h4>
          <p className="text-sm">Our tools work on all modern browsers including Chrome, Firefox, Safari, and Edge. Some advanced features may require recent browser versions.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">How can I report a bug or request a feature?</h4>
          <p className="text-sm">You can contact us at admin@dailytoolspro.com or reach out through our social media channels. We appreciate all feedback!</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Are the tools mobile-friendly?</h4>
          <p className="text-sm">Yes! All our tools are designed to work seamlessly on desktop, tablet, and mobile devices.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">How often do you add new tools?</h4>
          <p className="text-sm">We regularly add new tools based on user feedback and demand. Follow us on social media to stay updated on new releases.</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Daily Tools Pro
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Your essential tool hub for productivity, creativity, and development. 
                Free to use with premium features available.
              </p>
              
              {/* Legal Links */}
              <div className="flex flex-wrap gap-3 text-sm">
                <button
                  onClick={() => openModal('privacy')}
                  className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  <Shield className="h-3 w-3" />
                  <span>Privacy Policy</span>
                </button>
                <button
                  onClick={() => openModal('terms')}
                  className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  <FileText className="h-3 w-3" />
                  <span>Terms of Use</span>
                </button>
                <button
                  onClick={() => openModal('faq')}
                  className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  <HelpCircle className="h-3 w-3" />
                  <span>FAQ</span>
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                Support This Project
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                This site is free to use. Support development with coffee or get in touch.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href="https://buymeacoffee.com/miniduonline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Coffee className="h-4 w-4" />
                  <span>Buy Me Coffee</span>
                </a>
                <a
                  href="mailto:admin@dailytoolspro.com"
                  className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact Admin</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-3">
                <a
                  href="https://facebook.com/dailytoolspro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                  title="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </a>
                <a
                  href="https://instagram.com/dailytoolspro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                  title="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </a>
                <a
                  href="https://tiktok.com/@dailytoolspro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                  title="Follow us on TikTok"
                >
                  <TikTokIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
              Developed by<Heart className="h-4 w-4 text-red-500 mx-1" /> {' '}
              <a href="https://minidushashimal.com" className="ml-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Minidu Shashimal Aluthge
              </a> 
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 sm:mt-0">
              © 2025 Daily Tools Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </Modal>

      <Modal
        isOpen={activeModal === 'terms'}
        onClose={closeModal}
        title="Terms of Use"
      >
        <TermsOfUseContent />
      </Modal>

      <Modal
        isOpen={activeModal === 'faq'}
        onClose={closeModal}
        title="Frequently Asked Questions"
      >
        <FAQContent />
      </Modal>
    </>
  );
};