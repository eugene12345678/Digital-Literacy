import  { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Award, CheckCircle2, MessageSquare, Monitor, Navigation, Send, ShieldCheck, ShoppingCart, Smartphone, CreditCard, BookOpen, Download, Share2, ThumbsUp, ThumbsDown, Check, HelpCircle } from 'lucide-react';

// Tutorial data (in a real app, this would come from an API or database)
const tutorialsData = [
  {
    id: 'whatsapp-basics',
    title: 'WhatsApp Basics',
    description: 'Learn how to send messages, make calls, and create groups on WhatsApp.',
    category: 'communication',
    difficulty: 'beginner',
    duration: '15 min',
    icon: MessageSquare,
    image: 'https://images.pexels.com/photos/4132538/pexels-photo-4132538.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    sections: [
      {
        title: 'Getting Started',
        content: 'WhatsApp is a popular messaging app that lets you send text messages, make voice and video calls, and share photos and videos with friends and family worldwide. To get started, you need to download the app from your app store (App Store for iPhone or Google Play Store for Android).',
        steps: [
          'Open your app store on your phone',
          'Search for "WhatsApp"',
          'Tap "Install" or "Get"',
          'Once installed, open the app'
        ]
      },
      {
        title: 'Setting Up Your Account',
        content: 'When you first open WhatsApp, youll need to set up your account by verifying your phone number and creating a profile.',
        steps: [
          'Enter your phone number when prompted',
          'WhatsApp will send a verification code via SMS',
          'Enter the verification code',
          'Add your name and an optional profile picture'
        ]
      },
      {
        title: 'Sending Text Messages',
        content: 'Sending messages on WhatsApp is simple and works similar to regular text messaging, but without any SMS fees.',
        steps: [
          'Tap on the chat icon (usually at the bottom of the screen)',
          'Select a contact from your list or tap on the new chat icon',
          'Type your message in the text field at the bottom',
          'Tap the send button (arrow icon)'
        ]
      },
      {
        title: 'Making Voice and Video Calls',
        content: 'WhatsApp allows you to make free voice and video calls to your contacts using your internet connection.',
        steps: [
          'Open a chat with the person you want to call',
          'Tap the phone icon in the top right for a voice call',
          'Tap the video camera icon for a video call',
          'When they answer, youll be connected'
        ]
      },
      {
        title: 'Creating and Managing Groups',
        content: 'Groups are a great way to stay in touch with multiple people at once, like family members or friends.',
        steps: [
          'Tap on the "Chats" tab',
          'Tap the new chat icon',
          'Select "New Group"',
          'Select the contacts you want to add',
          'Create a group name and optional group icon',
          'Tap "Create" or "Done"'
        ]
      }
    ]
  },
  {
    id: 'paytm-payments',
    title: 'Paytm Payments',
    description: 'Make secure digital payments and money transfers with Paytm.',
    category: 'online-services',
    difficulty: 'beginner',
    duration: '20 min',
    icon: CreditCard,
    image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    sections: [
      {
        title: 'Introduction to Paytm',
        content: 'Paytm is a popular digital payment platform that allows you to make payments, transfer money, and pay bills using your smartphone. It\'s widely used in India for everything from small purchases to utility payments.',
        steps: []
      },
      {
        title: 'Installing and Setting Up',
        content: 'To get started with Paytm, you need to download the app and set up your account.',
        steps: [
          'Download Paytm from your app store',
          'Open the app and enter your mobile number',
          'Verify your number with the OTP (One-Time Password) sent to you',
          'Create a profile with your name and email'
        ]
      },
      {
        title: 'Adding Money to Paytm Wallet',
        content: 'Before making payments, you need to add money to your Paytm wallet.',
        steps: [
          'Open the Paytm app',
          'Tap on "Balance" or "Wallet"',
          'Select "Add Money"',
          'Enter the amount you want to add',
          'Choose your payment method (debit card, credit card, net banking)',
          'Complete the payment process'
        ]
      },
      {
        title: 'Making Payments',
        content: 'Paytm offers multiple ways to make payments to individuals and businesses.',
        steps: [
          'For QR code payments: Tap "Scan & Pay", scan the merchant\'s QR code, enter amount, and confirm',
          'For mobile number payments: Tap "Pay", enter mobile number, amount, and confirm',
          'For bill payments: Select "Recharge & Pay Bills", choose the service, enter details, and make payment'
        ]
      },
      {
        title: 'Security Features',
        content: 'Paytm includes several security features to protect your money and information.',
        steps: [
          'Set up a PIN or biometric authentication for transactions',
          'Never share your OTP or password with anyone',
          'Regularly check your transaction history',
          'Log out from the Paytm website when using on shared computers'
        ]
      }
    ]
  },
  {
    id: 'google-maps',
    title: 'Google Maps Navigation',
    description: 'Find directions, explore places, and navigate with confidence.',
    category: 'online-services',
    difficulty: 'beginner',
    duration: '25 min',
    icon: Navigation,
    image: 'https://images.pexels.com/photos/4116218/pexels-photo-4116218.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    sections: [
      {
        title: 'Getting Started with Google Maps',
        content: 'Google Maps is a powerful navigation tool that helps you find locations, get directions, and explore new places. It\'s available on smartphones, tablets, and computers.',
        steps: [
          'Download Google Maps from your app store if using a mobile device',
          'Open the app or visit maps.google.com on a computer',
          'Allow location access when prompted for better functionality'
        ]
      },
      {
        title: 'Finding Places',
        content: 'You can search for almost any location, business, or address using Google Maps.',
        steps: [
          'Tap the search bar at the top of the screen',
          'Type the name of a place, address, or type of business (e.g., "coffee shops near me")',
          'Select from the suggested results that appear',
          'View details about the location including hours, contact information, and reviews'
        ]
      },
      {
        title: 'Getting Directions',
        content: 'One of the most useful features of Google Maps is getting step-by-step directions to your destination.',
        steps: [
          'Search for your destination',
          'Tap the "Directions" button',
          'Your current location will be set as the starting point by default, or you can enter a different starting location',
          'Choose your transportation mode (driving, walking, public transit, or cycling)',
          'Tap "Start" to begin navigation'
        ]
      },
      {
        title: 'Using Voice Navigation',
        content: 'Voice guidance helps you navigate safely while driving or walking.',
        steps: [
          'After starting navigation, make sure your volume is turned up',
          'The app will provide voice instructions for turns and route changes',
          'You can tap the speaker icon to mute or unmute voice guidance',
          'Follow the blue route line on the map and listen for instructions'
        ]
      },
      {
        title: 'Saving Favorite Places',
        content: 'Save places you visit frequently for quick access in the future.',
        steps: [
          'Search for a location',
          'Tap "Save" on the location information card',
          'Choose a list to save to (Favorites, Want to go, etc.)',
          'Access your saved places by tapping your profile picture and selecting "Your places"'
        ]
      }
    ]
  },
  // Additional tutorials would be added here
  {
    id: 'smartphone-basics',
    title: 'Smartphone Basics',
    description: 'Master essential functions on your Android or iPhone device.',
    category: 'basics',
    difficulty: 'beginner',
    duration: '30 min',
    icon: Smartphone,
    image: 'https://images.pexels.com/photos/5082576/pexels-photo-5082576.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    sections: []
  },
  {
    id: 'email-setup',
    title: 'Email Setup & Usage',
    description: 'Create an email account and learn to send, receive, and organize emails.',
    category: 'communication',
    difficulty: 'beginner',
    duration: '20 min',
    icon: Send,
    image: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    sections: []
  },
  {
    id: 'online-shopping',
    title: 'Online Shopping Guide',
    description: 'Shop safely and confidently on popular e-commerce platforms.',
    category: 'online-services',
    difficulty: 'intermediate',
    duration: '35 min',
    icon: ShoppingCart,
    image: 'https://images.pexels.com/photos/6169659/pexels-photo-6169659.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    sections: []
  },
  {
    id: 'password-security',
    title: 'Password Security',
    description: 'Create strong passwords and keep your accounts secure.',
    category: 'safety',
    difficulty: 'beginner',
    duration: '15 min',
    icon: ShieldCheck,
    image: 'https://images.pexels.com/photos/60504/security-protection-privacy-policy-60504.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    sections: []
  },
  {
    id: 'video-calls',
    title: 'Making Video Calls',
    description: 'Connect with family and friends through video calling apps.',
    category: 'communication',
    difficulty: 'beginner',
    duration: '25 min',
    icon: Monitor,
    image: 'https://images.pexels.com/photos/7256460/pexels-photo-7256460.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    sections: []
  }
];

const TutorialDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentTutorial, setCurrentTutorial] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const tutorial = tutorialsData.find(tutorial => tutorial.id === id);
    
    // Simulate loading
    setTimeout(() => {
      setCurrentTutorial(tutorial);
      setLoading(false);
      
      // Reset state when tutorial changes
      setCurrentSectionIndex(0);
      setCompletedSections([]);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute w-full h-full rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
            <div className="absolute w-full h-full rounded-full border-r-4 border-l-4 border-secondary animate-ping opacity-75"></div>
          </div>
          <p className="mt-4 text-xl font-light text-gray-600 dark:text-gray-400">Loading tutorial...</p>
        </div>
      </div>
    );
  }

  if (!currentTutorial) {
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/tutorials" className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Tutorials
          </Link>
          
          <div className="glass-panel p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tutorial Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The tutorial you're looking for doesn't exist or has been removed.</p>
            <Link to="/tutorials" className="primary-button inline-flex items-center justify-center">
              Browse All Tutorials
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = currentTutorial.icon;
  const totalSections = currentTutorial.sections.length;
  const currentSection = currentTutorial.sections[currentSectionIndex];
  const progress = completedSections.length > 0 
    ? Math.round((completedSections.length / totalSections) * 100) 
    : 0;

  const handleNext = () => {
    if (currentSectionIndex < totalSections - 1) {
      // Mark current section as completed if not already
      if (!completedSections.includes(currentSectionIndex)) {
        setCompletedSections([...completedSections, currentSectionIndex]);
      }
      setCurrentSectionIndex(currentSectionIndex + 1);
      // Scroll to top of content
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      // Scroll to top of content
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const markComplete = () => {
    if (!completedSections.includes(currentSectionIndex)) {
      const newCompleted = [...completedSections, currentSectionIndex];
      setCompletedSections(newCompleted);
      
      // If all sections are completed, show a congratulations message
      if (newCompleted.length === totalSections) {
        // In a real app, this would save progress to the user's account
        console.log('Tutorial completed!');
      }
    }
  };

  const handleSectionClick = (index: number) => {
    setCurrentSectionIndex(index);
    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/tutorials" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Tutorials
          </Link>
        </div>
        
        {/* Tutorial header */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0">
            <img 
              src={currentTutorial.image} 
              alt={currentTutorial.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          <div className="relative py-12 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  currentTutorial.difficulty === 'beginner' ? 'bg-green-500/90 text-white' :
                  currentTutorial.difficulty === 'intermediate' ? 'bg-yellow-500/90 text-white' :
                  'bg-red-500/90 text-white'
                }`}>
                  <Award className="inline-block h-3 w-3 mr-1" />
                  {currentTutorial.difficulty.charAt(0).toUpperCase() + currentTutorial.difficulty.slice(1)}
                </span>
                
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white">
                  <Clock className="inline-block h-3 w-3 mr-1" />
                  {currentTutorial.duration}
                </span>
                
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white">
                  <BookOpen className="inline-block h-3 w-3 mr-1" />
                  {totalSections} Sections
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {currentTutorial.title}
              </h1>
              
              <p className="text-xl text-gray-200 mb-6">{currentTutorial.description}</p>
              
              {totalSections > 0 && (
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
                    <div className="mr-3">
                      <svg className="w-12 h-12">
                        <circle 
                          className="text-gray-300/30" 
                          strokeWidth="5" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="18" 
                          cx="24" 
                          cy="24"
                        />
                        <circle 
                          className="text-primary" 
                          strokeWidth="5" 
                          strokeDasharray={113}
                          strokeDashoffset={113 - (113 * progress) / 100}
                          strokeLinecap="round" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="18" 
                          cx="24" 
                          cy="24"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-200">Your Progress</p>
                      <p className="text-xl font-bold text-white">{progress}%</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setShowHelp(!showHelp)}
                    className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center hover:bg-white/20 transition-colors"
                  >
                    <HelpCircle className="h-5 w-5 mr-2 text-white" />
                    <span className="text-white font-medium">Need Help?</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Help dialog */}
        {showHelp && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
            <div className="glass-panel max-w-lg mx-auto p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Need Help?</h3>
                <button 
                  onClick={() => setShowHelp(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  If you're having trouble with this tutorial, here are some options that might help:
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Try watching the video demonstration if available
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Visit our <Link to="/chat" className="text-primary hover:underline">AI Chat</Link> to ask specific questions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">
                      You can also call our helpline at +1 (555) 123-4567
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setShowHelp(false)}
                  className="px-4 py-2 bg-primary text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Main content area with sidebar */}
        {totalSections > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar/Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="glass-panel p-4 sticky top-24">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Tutorial Sections</h3>
                <nav>
                  <ul className="space-y-1">
                    {currentTutorial.sections.map((section: any, index: number) => (
                      <li key={index}>
                        <button
                          onClick={() => handleSectionClick(index)}
                          className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${
                            currentSectionIndex === index
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <span className="flex-grow truncate">{section.title}</span>
                          {completedSections.includes(index) && (
                            <CheckCircle2 className="h-4 w-4 ml-2 text-success flex-shrink-0" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              <motion.div
                key={currentSectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-6 md:p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {currentSection.title}
                </h2>
                
                <div className="prose max-w-none dark:prose-invert mb-8">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    {currentSection.content}
                  </p>
                  
                  {currentSection.steps && currentSection.steps.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Steps:</h3>
                      <ol className="space-y-3 list-none pl-0">
                        {currentSection.steps.map((step: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
                
                {/* Video placeholder - in a real app, this would be an actual video */}
                <div className="mb-8 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Icon className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">Video demonstration would appear here</p>
                  </div>
                </div>
                
                {/* Feedback */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Was this section helpful?</h3>
                  <div className="flex gap-3">
                    <button className="flex items-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <ThumbsUp className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">Yes</span>
                    </button>
                    <button className="flex items-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <ThumbsDown className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">No</span>
                    </button>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-wrap gap-4 justify-between">
                  <div>
                    {currentSectionIndex > 0 && (
                      <button 
                        onClick={handlePrevious}
                        className="secondary-button flex items-center"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Previous Section
                      </button>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    {!completedSections.includes(currentSectionIndex) && (
                      <button 
                        onClick={markComplete}
                        className="flex items-center py-3 px-6 bg-success text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <Check className="mr-2 h-5 w-5" />
                        Mark as Complete
                      </button>
                    )}
                    
                    {currentSectionIndex < totalSections - 1 && (
                      <button 
                        onClick={handleNext}
                        className="primary-button flex items-center"
                      >
                        Next Section
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
              
              {/* Action buttons for tutorial */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="flex items-center py-2 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Download className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">Download PDF</span>
                </button>
                
                <button className="flex items-center py-2 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Share2 className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">Share Tutorial</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-8 text-center">
            <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Icon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Coming Soon</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We're still working on the content for this tutorial. Check back soon!
            </p>
            <Link
              to="/tutorials"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
            >
              Browse Other Tutorials
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialDetailPage;