import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface VoiceCommandContextType {
  isListening: boolean;
  toggleListening: () => void;
  startListening: () => void;
  stopListening: () => void;
}

const VoiceCommandContext = createContext<VoiceCommandContextType | undefined>(undefined);

export function VoiceCommandProvider({ children }: { children: React.ReactNode }) {
  const [isListening, setIsListening] = useState(false);
  const [annyang, setAnnyang] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamic import of annyang for better compatibility
    import('annyang').then((module) => {
      setAnnyang(module.default);
    }).catch(error => {
      console.error('Failed to load annyang:', error);
    });

    return () => {
      if (annyang) {
        annyang.abort();
      }
    };
  }, []);

  useEffect(() => {
    if (!annyang) return;

    // Define commands
    const commands = {
      'go to *page': (page: string) => {
        const routes: Record<string, string> = {
          home: '/',
          tutorials: '/tutorials',
          chat: '/chat',
          chatbot: '/chat',
          feedback: '/feedback',
        };

        const route = routes[page.toLowerCase()];
        if (route) {
          toast.success(`Navigating to ${page}`);
          navigate(route);
        } else {
          toast.error(`Sorry, I don't know how to navigate to ${page}`);
        }
      },
      'toggle theme': () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        toast.success(`Switched to ${isDark ? 'dark' : 'light'} theme`);
      },
      'increase font size': () => {
        const currentScale = localStorage.getItem('fontScale') || '100';
        const scales = ['100', '125', '150', '200'];
        const currentIndex = scales.indexOf(currentScale);
        const newIndex = Math.min(currentIndex + 1, scales.length - 1);
        
        if (newIndex !== currentIndex) {
          localStorage.setItem('fontScale', scales[newIndex]);
          document.body.classList.remove(`text-scale-${currentScale}`);
          document.body.classList.add(`text-scale-${scales[newIndex]}`);
          toast.success(`Font size increased to ${scales[newIndex]}%`);
        } else {
          toast.info('Font size already at maximum');
        }
      },
      'decrease font size': () => {
        const currentScale = localStorage.getItem('fontScale') || '100';
        const scales = ['100', '125', '150', '200'];
        const currentIndex = scales.indexOf(currentScale);
        const newIndex = Math.max(currentIndex - 1, 0);
        
        if (newIndex !== currentIndex) {
          localStorage.setItem('fontScale', scales[newIndex]);
          document.body.classList.remove(`text-scale-${currentScale}`);
          document.body.classList.add(`text-scale-${scales[newIndex]}`);
          toast.success(`Font size decreased to ${scales[newIndex]}%`);
        } else {
          toast.info('Font size already at minimum');
        }
      },
      'help': () => {
        toast(
          <div>
            <h3 className="font-bold">Available Voice Commands:</h3>
            <ul className="list-disc pl-4 mt-2">
              <li>Go to [home/tutorials/chat/feedback]</li>
              <li>Toggle theme</li>
              <li>Increase/decrease font size</li>
            </ul>
          </div>,
          { duration: 5000 }
        );
      }
    };

    annyang.addCommands(commands);
    annyang.addCallback('resultNoMatch', () => {
      toast.error("Sorry, I didn't understand that command");
    });

    return () => {
      annyang.removeCommands();
    };
  }, [annyang, navigate]);

  useEffect(() => {
    if (!annyang) return;

    if (isListening) {
      annyang.start();
      toast.success('Voice commands activated');
    } else {
      annyang.abort();
    }
  }, [isListening, annyang]);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const startListening = () => {
    if (!isListening) {
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (isListening) {
      setIsListening(false);
    }
  };

  return (
    <VoiceCommandContext.Provider value={{ 
      isListening, 
      toggleListening,
      startListening,
      stopListening
    }}>
      {children}
    </VoiceCommandContext.Provider>
  );
}

export function useVoiceCommands() {
  const context = useContext(VoiceCommandContext);
  if (context === undefined) {
    throw new Error('useVoiceCommands must be used within a VoiceCommandProvider');
  }
  return context;
}

export default VoiceCommandProvider;