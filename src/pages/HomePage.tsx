import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ArrowRight, Users, Heart, Award, Smartphone, Laptop, CalendarClock } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className="futuristic-card p-6"
    >
      <div className="bg-primary/10 dark:bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
};

const HomePage: React.FC = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  const features = [
    {
      icon: Smartphone,
      title: "Smartphone Basics",
      description: "Learn essential functions like calls, messaging, and app navigation with step-by-step tutorials."
    },
    {
      icon: Laptop,
      title: "Internet Navigation",
      description: "Discover how to browse safely, use search engines, and access important online services."
    },
    {
      icon: CalendarClock,
      title: "At Your Own Pace",
      description: "Take your time with lessons designed for beginners with no pressure to rush through content."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with others on the same learning journey and share experiences and tips."
    },
    {
      icon: Award,
      title: "Practical Skills",
      description: "Focus on relevant, everyday digital tasks that make a real difference in daily life."
    },
    {
      icon: Heart,
      title: "Designed For You",
      description: "User-friendly interface with accessibility features for all abilities and preferences."
    }
  ];

  const testimonialsRef = useRef(null);
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px 0px" });
  const testimonialControls = useAnimation();

  useEffect(() => {
    if (isTestimonialsInView) {
      testimonialControls.start("visible");
    }
  }, [isTestimonialsInView, testimonialControls]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 px-4">
        {/* Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl opacity-70"></div>
        
        <div className="container mx-auto">
          <div ref={heroRef} className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Empowering Digital Literacy
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Helping parents and elderly users navigate the digital world with confidence. Learn at your own pace with our easy-to-follow tutorials and friendly AI assistant.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/tutorials" className="primary-button flex items-center justify-center">
                Explore Tutorials
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/chat" className="secondary-button flex items-center justify-center">
                Chat with DigiBuddy
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Designed for Everyone
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform makes digital learning accessible with features that address the unique needs of parents and elderly users.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Get started in just three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Choose a Tutorial",
                description: "Browse our collection of tutorials designed for beginners.",
                delay: 0.1
              },
              {
                step: "02",
                title: "Learn at Your Pace",
                description: "Follow the step-by-step instructions at your own comfortable speed.",
                delay: 0.3
              },
              {
                step: "03",
                title: "Practice & Master",
                description: "Apply what you've learned with guided practice exercises.",
                delay: 0.5
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
                viewport={{ once: true, margin: "-100px 0px" }}
                className="relative"
              >
                <div className="futuristic-card p-6 text-center h-full flex flex-col items-center">
                  <span className="absolute -top-5 bg-gradient-to-r from-primary to-accent text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold mb-3 mt-4 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Hear from people who have transformed their digital confidence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Margaret J.",
                age: "68",
                testimonial: "I never thought I'd be able to video call my grandchildren on my own. Now I do it every weekend!",
                delay: 0.1
              },
              {
                name: "Robert K.",
                age: "72",
                testimonial: "The tutorials on online banking saved me so many trips to the bank. I feel much more independent now.",
                delay: 0.3
              },
              {
                name: "Sarah M.",
                age: "55",
                testimonial: "As a parent, I wanted to understand what my kids were doing online. These tutorials helped me catch up quickly.",
                delay: 0.5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={testimonialControls}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.5, delay: testimonial.delay } 
                  }
                }}
                className="glass-panel p-6"
              >
                <div className="mb-4 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.testimonial}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Age {testimonial.age}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl opacity-70"></div>
        
        <div className="container mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            className="glass-panel p-8 md:p-12 max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Start Your Digital Journey?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Join thousands of users who have boosted their digital confidence with our easy-to-follow tutorials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tutorials" className="primary-button flex items-center justify-center">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/chat" className="secondary-button flex items-center justify-center">
                Ask DigiBuddy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;