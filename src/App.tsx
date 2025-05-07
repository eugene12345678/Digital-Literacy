import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import TutorialsPage from './pages/TutorialsPage';
import TutorialDetailPage from './pages/TutorialDetailPage';
import ChatbotPage from './pages/ChatbotPage';
import FeedbackPage from './pages/FeedbackPage';
import VoiceCommandProvider from './contexts/VoiceCommandContext';
import AccessibilityMenu from './components/accessibility/AccessibilityMenu';
import PageTransition from './components/ui/PageTransition';
import ScrollToTop from './components/utils/ScrollToTop';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating loading for smoother transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="relative w-24 h-24">
            <div className="absolute w-full h-full rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
            <div className="absolute w-full h-full rounded-full border-r-4 border-l-4 border-secondary animate-ping opacity-75"></div>
          </div>
          <p className="text-white mt-4 text-xl font-light">Loading DLC...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <VoiceCommandProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Navbar />
            <main className="flex-grow">
              <AccessibilityMenu />
              <Routes>
                <Route path="/" element={
                  <PageTransition>
                    <HomePage />
                  </PageTransition>
                } />
                <Route path="/tutorials" element={
                  <PageTransition>
                    <TutorialsPage />
                  </PageTransition>
                } />
                <Route path="/tutorials/:id" element={
                  <PageTransition>
                    <TutorialDetailPage />
                  </PageTransition>
                } />
                <Route path="/chat" element={
                  <PageTransition>
                    <ChatbotPage />
                  </PageTransition>
                } />
                <Route path="/feedback" element={
                  <PageTransition>
                    <FeedbackPage />
                  </PageTransition>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
        </VoiceCommandProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;