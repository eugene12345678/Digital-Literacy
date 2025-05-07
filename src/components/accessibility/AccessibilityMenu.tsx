import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, X, ZoomIn, ZoomOut, Globe, Eye } from 'lucide-react';
import { useVoiceCommands } from '../../contexts/VoiceCommandContext';

const AccessibilityMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { startListening } = useVoiceCommands();
  
  const [fontScale, setFontScale] = useState(() => 
    localStorage.getItem('fontScale') || '100'
  );

  const changeFontSize = (direction: 'increase' | 'decrease') => {
    const scales = ['100', '125', '150', '200'];
    const currentIndex = scales.indexOf(fontScale);
    let newIndex;
    
    if (direction === 'increase') {
      newIndex = Math.min(currentIndex + 1, scales.length - 1);
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
    }
    
    if (newIndex !== currentIndex) {
      const newScale = scales[newIndex];
      setFontScale(newScale);
      localStorage.setItem('fontScale', newScale);
      
      document.body.classList.remove(`text-scale-${fontScale}`);
      document.body.classList.add(`text-scale-${newScale}`);
    }
  };

  const toggleHighContrast = () => {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast.toString());
  };

  return (
    <>
      {/* Accessibility Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-20 z-40 p-3 rounded-full bg-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Open accessibility menu"
      >
        <Accessibility className="h-6 w-6" />
      </button>

      {/* Accessibility Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Accessibility Options</h2>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Font Size */}
                  <div className="glass-panel p-4 rounded-xl">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Font Size</h3>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => changeFontSize('decrease')}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Decrease font size"
                        disabled={fontScale === '100'}
                      >
                        <ZoomOut className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </button>
                      
                      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white font-medium">
                        {fontScale}%
                      </div>
                      
                      <button
                        onClick={() => changeFontSize('increase')}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Increase font size"
                        disabled={fontScale === '200'}
                      >
                        <ZoomIn className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Voice Commands */}
                  <div className="glass-panel p-4 rounded-xl">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Voice Commands</h3>
                    <button
                      onClick={() => {
                        startListening();
                        setIsOpen(false);
                      }}
                      className="w-full py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors"
                    >
                      Start Voice Commands
                    </button>
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <p>Try saying:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>"Go to home"</li>
                        <li>"Toggle theme"</li>
                        <li>"Increase font size"</li>
                        <li>"Help" for more commands</li>
                      </ul>
                    </div>
                  </div>

                  {/* High Contrast */}
                  <div className="glass-panel p-4 rounded-xl">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Display Options</h3>
                    <button
                      onClick={toggleHighContrast}
                      className="flex items-center w-full py-3 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Eye className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">Toggle High Contrast</span>
                    </button>
                  </div>

                  {/* Language Options */}
                  <div className="glass-panel p-4 rounded-xl">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Language</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="py-2 px-3 bg-primary/10 text-primary rounded-lg font-medium transition-colors"
                      >
                        English
                      </button>
                      <button
                        className="py-2 px-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                      >
                        Español
                      </button>
                      <button
                        className="py-2 px-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                      >
                        Français
                      </button>
                      <button
                        className="py-2 px-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                      >
                        Deutsch
                      </button>
                    </div>
                    <button
                      className="mt-3 flex items-center justify-center w-full py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      <span>More Languages</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityMenu;