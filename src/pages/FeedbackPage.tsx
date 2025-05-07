import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, MessageSquare, Star, HelpCircle, User, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(0);
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
          className="p-1 focus:outline-none"
          aria-label={`Rate ${star} stars`}
        >
          <Star
            className={`h-7 w-7 ${
              (hoverValue || value) >= star
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
      >
        <span className="font-medium text-gray-900 dark:text-white">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pb-4 text-gray-600 dark:text-gray-400">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

const FeedbackPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('general');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !feedback || rating === 0) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    // In a real app, this would send the feedback to a server
    console.log({ name, email, feedback, rating, category });
    
    // Show success state
    setIsSubmitted(true);
    toast.success('Thank you for your feedback!');
  };
  
  const resetForm = () => {
    setName('');
    setEmail('');
    setFeedback('');
    setRating(0);
    setCategory('general');
    setIsSubmitted(false);
  };
  
  const faqs = [
    {
      question: "How can I get additional help with a tutorial?",
      answer: "You can use our AI Chat feature to ask specific questions, or you can contact our support team using the feedback form on this page. We're always happy to help!"
    },
    {
      question: "Can I suggest a new tutorial topic?",
      answer: "Absolutely! We welcome suggestions for new tutorials. Please use the feedback form and select 'Suggestion' as the category. We regularly review user suggestions when planning new content."
    },
    {
      question: "How frequently are new tutorials added?",
      answer: "We add new tutorials every month based on user feedback and emerging digital trends. You can subscribe to our newsletter to be notified when new content is published."
    },
    {
      question: "Are there any in-person digital literacy classes available?",
      answer: "While our platform is primarily online, we do partner with community centers and libraries to offer in-person workshops in select locations. Check the 'Events' section of our website for upcoming workshops near you."
    },
    {
      question: "Can I access the tutorials offline?",
      answer: "Yes, many of our tutorials can be downloaded as PDF guides for offline use. Look for the 'Download PDF' button at the bottom of tutorial pages."
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Feedback & Support
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Your feedback helps us improve the learning experience for everyone
          </motion.p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-panel p-6 md:p-8">
              {!isSubmitted ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Share Your Thoughts
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Feedback Category
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      >
                        <option value="general">General Feedback</option>
                        <option value="tutorial">Tutorial Feedback</option>
                        <option value="suggestion">Suggestion</option>
                        <option value="bug">Report an Issue</option>
                        <option value="question">Question</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Rate Your Experience <span className="text-red-500">*</span>
                      </label>
                      <Rating value={rating} onChange={setRating} />
                    </div>
                    
                    <div>
                      <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Feedback <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={5}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Please share your thoughts, suggestions, or questions..."
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full primary-button flex items-center justify-center"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Submit Feedback
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Thank You!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Your feedback has been submitted successfully. We appreciate your input and will use it to improve our platform.
                  </p>
                  <button
                    onClick={resetForm}
                    className="primary-button"
                  >
                    Submit Another Response
                  </button>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* FAQ and Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* FAQ */}
            <div className="glass-panel p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <HelpCircle className="h-6 w-6 mr-2 text-primary" />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-1">
                {faqs.map((faq, index) => (
                  <FaqItem 
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="glass-panel p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-primary" />
                Get in Touch
              </h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Need additional help? Our support team is available to assist you.
                </p>
                
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email:</p>
                  <p>eugenemathenge4@gmail.com</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Phone:</p>
                  <p>+254 700 581 615</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Hours:</p>
                  <p>Monday - Friday: 9am - 5pm EST</p>
                </div>
                
                <div className="pt-4">
                  <a href="#" className="primary-button inline-flex items-center justify-center">
                    Start Live Chat
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;