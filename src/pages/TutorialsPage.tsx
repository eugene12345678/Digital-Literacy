import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, CheckCircle2, Clock, ArrowRight, Smartphone, Monitor, ShoppingCart, Navigation, MessageSquare, Send, CreditCard, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'all', name: 'All Tutorials' },
  { id: 'communication', name: 'Communication' },
  { id: 'basics', name: 'Device Basics' },
  { id: 'online-services', name: 'Online Services' },
  { id: 'safety', name: 'Safety & Privacy' },
  { id: 'social-media', name: 'Social Media' }
];

const difficulty = [
  { id: 'all', name: 'All Levels' },
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' }
];

const tutorials = [
  {
    id: 'whatsapp-basics',
    title: 'WhatsApp Basics',
    description: 'Learn how to send messages, make calls, and create groups on WhatsApp.',
    category: 'communication',
    difficulty: 'beginner',
    duration: '15 min',
    icon: MessageSquare,
    image: 'https://images.pexels.com/photos/4132538/pexels-photo-4132538.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
  },
  {
    id: 'paytm-payments',
    title: 'Paytm Payments',
    description: 'Make secure digital payments and money transfers with Paytm.',
    category: 'online-services',
    difficulty: 'beginner',
    duration: '20 min',
    icon: CreditCard,
    image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
  },
  {
    id: 'google-maps',
    title: 'Google Maps Navigation',
    description: 'Find directions, explore places, and navigate with confidence.',
    category: 'online-services',
    difficulty: 'beginner',
    duration: '25 min',
    icon: Navigation,
    image: 'https://images.pexels.com/photos/4116218/pexels-photo-4116218.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
  },
  {
    id: 'smartphone-basics',
    title: 'Smartphone Basics',
    description: 'Master essential functions on your Android or iPhone device.',
    category: 'basics',
    difficulty: 'beginner',
    duration: '30 min',
    icon: Smartphone,
    image: 'https://images.pexels.com/photos/5082576/pexels-photo-5082576.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
  },
  {
    id: 'email-setup',
    title: 'Email Setup & Usage',
    description: 'Create an email account and learn to send, receive, and organize emails.',
    category: 'communication',
    difficulty: 'beginner',
    duration: '20 min',
    icon: Send,
    image: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
  },
  {
    id: 'online-shopping',
    title: 'Online Shopping Guide',
    description: 'Shop safely and confidently on popular e-commerce platforms.',
    category: 'online-services',
    difficulty: 'intermediate',
    duration: '35 min',
    icon: ShoppingCart,
    image: 'https://images.pexels.com/photos/6169659/pexels-photo-6169659.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
  },
  {
    id: 'password-security',
    title: 'Password Security',
    description: 'Create strong passwords and keep your accounts secure.',
    category: 'safety',
    difficulty: 'beginner',
    duration: '15 min',
    icon: ShieldCheck,
    image: 'https://images.pexels.com/photos/60504/security-protection-privacy-policy-60504.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
  },
  {
    id: 'video-calls',
    title: 'Making Video Calls',
    description: 'Connect with family and friends through video calling apps.',
    category: 'communication',
    difficulty: 'beginner',
    duration: '25 min',
    icon: Monitor,
    image: 'https://images.pexels.com/photos/7256460/pexels-photo-7256460.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
  }
];

interface FilterOption {
  id: string;
  name: string;
}

const TutorialCard = ({ tutorial }: { tutorial: typeof tutorials[0] }) => {
  const Icon = tutorial.icon;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      layout
      className="futuristic-card group h-full"
    >
      <div className="relative h-48 rounded-t-xl overflow-hidden">
        <img 
          src={tutorial.image} 
          alt={tutorial.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 text-xs font-medium flex items-center">
          <Clock className="h-3 w-3 mr-1 text-primary" />
          {tutorial.duration}
        </div>
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center mb-3">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
            tutorial.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
            tutorial.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
          }`}>
            {tutorial.difficulty.charAt(0).toUpperCase() + tutorial.difficulty.slice(1)}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">{tutorial.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{tutorial.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{tutorial.description}</p>
        <Link 
          to={`/tutorials/${tutorial.id}`}
          className="inline-flex items-center text-primary font-medium hover:underline"
        >
          Start Learning <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

const FilterMenu = ({ 
  title, 
  options, 
  selected, 
  onChange 
}: { 
  title: string, 
  options: FilterOption[], 
  selected: string, 
  onChange: (id: string) => void 
}) => {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
              selected === option.id
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {selected === option.id && (
              <CheckCircle2 className="h-4 w-4 mr-2 flex-shrink-0" />
            )}
            <span className={selected !== option.id ? "ml-6" : ""}>{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const TutorialsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredTutorials = tutorials.filter(tutorial => {
    // Filter by search query
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    
    // Filter by difficulty
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  const handleSearchFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Tutorials
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Step-by-step guides to help you master digital tools with confidence
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
            className="hidden md:block w-64 flex-shrink-0"
          >
            <div className="glass-panel p-5 sticky top-24">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Filters</h2>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Reset filters
                </button>
              </div>
              
              <div className="space-y-6">
                <FilterMenu
                  title="Categories"
                  options={categories}
                  selected={selectedCategory}
                  onChange={setSelectedCategory}
                />
                
                <FilterMenu
                  title="Difficulty"
                  options={difficulty}
                  selected={selectedDifficulty}
                  onChange={setSelectedDifficulty}
                />
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tutorials..."
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  <Search className="h-5 w-5" />
                </div>
                
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Toggle filters"
                >
                  <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </motion.div>
            
            {/* Mobile Filters Panel */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden glass-panel mb-6 overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h2>
                      <button 
                        onClick={resetFilters}
                        className="text-sm text-primary hover:underline"
                      >
                        Reset
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      <FilterMenu
                        title="Categories"
                        options={categories}
                        selected={selectedCategory}
                        onChange={setSelectedCategory}
                      />
                      
                      <FilterMenu
                        title="Difficulty"
                        options={difficulty}
                        selected={selectedDifficulty}
                        onChange={setSelectedDifficulty}
                      />
                    </div>
                    
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="w-full mt-4 py-2 bg-primary text-white rounded-lg"
                    >
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                {filteredTutorials.length} {filteredTutorials.length === 1 ? 'tutorial' : 'tutorials'} found
              </p>
            </div>
            
            {/* Tutorials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredTutorials.length > 0 ? (
                  filteredTutorials.map(tutorial => (
                    <TutorialCard key={tutorial.id} tutorial={tutorial} />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full glass-panel p-8 text-center"
                  >
                    <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No tutorials found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filters</p>
                    <button
                      onClick={resetFilters}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialsPage;