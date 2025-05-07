import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  fontScale: string;
  language: string;
  highContrast: boolean;
  setFontScale: (scale: string) => void;
  setLanguage: (lang: string) => void;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontScale, setFontScale] = useState(() => 
    localStorage.getItem('fontScale') || '100'
  );
  
  const [language, setLanguage] = useState(() => 
    localStorage.getItem('language') || 'en'
  );
  
  const [highContrast, setHighContrast] = useState(() => 
    localStorage.getItem('highContrast') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('fontScale', fontScale);
    
    // Update body class for font scaling
    document.body.classList.remove('text-scale-100', 'text-scale-125', 'text-scale-150', 'text-scale-200');
    document.body.classList.add(`text-scale-${fontScale}`);
  }, [fontScale]);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('highContrast', highContrast.toString());
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  return (
    <AccessibilityContext.Provider 
      value={{ 
        fontScale, 
        language, 
        highContrast, 
        setFontScale, 
        setLanguage, 
        toggleHighContrast 
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}