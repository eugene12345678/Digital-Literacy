import  { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Copy, Check, Mic, MicOff, Clock, FileText, AlertCircle, X, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';
import { useVoiceCommands } from '../contexts/VoiceCommandContext';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const sampleQuestions = [
  "How do I create a strong password?",
  "What is the best way to avoid scams online?",
  "How do I use video calling apps?",
  "How can I send photos on WhatsApp?",
  "What should I do if I forget my password?",
  "How do I update my apps?",
];

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'bot',
    text: "Hello! I'm DigiBuddy, your digital literacy assistant. I'm here to help you with any questions about using technology. How can I help you today?",
    timestamp: new Date()
  }
];

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const { stopListening } = useVoiceCommands();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const response = await fetch('https://digital-literacy.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }

      const data = await response.json();
      
      const botResponse: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text: data.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Sorry, I had trouble processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      stopListening();
    } else {
      setIsListening(true);
      
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        toast.error('Sorry, I had trouble understanding. Please try again.');
        setIsListening(false);
      };
      
      recognition.start();
    }
  };

  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Chat with DigiBuddy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Your AI assistant for all digital literacy questions
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="glass-panel p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Help Topics</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors">
                  <Smartphone className="h-5 w-5 mr-3 text-primary" />
                  <span>Device Basics</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors">
                  <FileText className="h-5 w-5 mr-3 text-primary" />
                  <span>App Tutorials</span>
                </a>
                <a href="#" className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors">
                  <AlertCircle className="h-5 w-5 mr-3 text-primary" />
                  <span>Safety & Privacy</span>
                </a>
              </div>
              
              <div className="mt-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Try asking about:</h3>
                <div className="space-y-2">
                  {sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSampleQuestion(question)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      "{question}"
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Privacy Note</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your conversations with DigiBuddy are private and not stored permanently. We use AI to provide helpful responses but do not share your data.
                </p>
              </div>
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="h-[600px] glass-panel rounded-t-xl flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-primary text-white ml-3' 
                            : 'bg-gray-200 dark:bg-gray-700 mr-3'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        
                        <div>
                          <div className={`relative p-3 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                          }`}>
                            <p className="whitespace-pre-wrap">{message.text}</p>
                            
                            {message.type === 'bot' && (
                              <button 
                                onClick={() => copyToClipboard(message.text, message.id)}
                                className="absolute -top-2 -right-2 p-1 rounded-full bg-white dark:bg-gray-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                aria-label="Copy to clipboard"
                              >
                                {copiedId === message.id ? (
                                  <Check className="h-3.5 w-3.5 text-success" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                                )}
                              </button>
                            )}
                          </div>
                          
                          <div className={`text-xs text-gray-500 mt-1 ${
                            message.type === 'user' ? 'text-right' : 'text-left'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <div className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center">
                          <div className="flex space-x-1.5">
                            <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Input Area */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here..."
                    className="w-full pr-20 pl-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    rows={2}
                  />
                  <div className="absolute right-3 bottom-3 flex space-x-2">
                    <button
                      onClick={handleVoiceInput}
                      className={`p-2 rounded-full ${
                        isListening
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      } hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors`}
                      aria-label={isListening ? "Stop voice input" : "Start voice input"}
                    >
                      {isListening ? (
                        <MicOff className="h-5 w-5" />
                      ) : (
                        <Mic className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      className={`p-2 rounded-full ${
                        isLoading || !inputValue.trim()
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                          : 'bg-primary text-white hover:bg-primary/90'
                      } transition-colors`}
                      aria-label="Send message"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Sample Questions */}
            <div className="mt-6 lg:hidden">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Try asking about:</h3>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSampleQuestion(question)}
                    className="px-3 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    "{question}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;

