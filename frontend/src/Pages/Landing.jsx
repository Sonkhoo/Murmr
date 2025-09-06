import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

// SVG Icons
const GroupsIcon = () => (
  <svg className="w-12 h-12 text-A7727D" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
  </svg>
);

const PsychologyIcon = () => (
  <svg className="w-12 h-12 text-A7727D" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd"></path>
  </svg>
);

const SecurityIcon = () => (
  <svg className="w-12 h-12 text-A7727D" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
  </svg>
);

const FavoriteIcon = () => (
  <svg className="w-12 h-12 text-A7727D" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
  </svg>
);

const ArrowForwardIcon = () => (
  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-6 h-6 text-green-500 mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
  </svg>
);

const ExpandMoreIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
  </svg>
);



const MurmrLanding = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [typewriterText, setTypewriterText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [stepsVisible, setStepsVisible] = useState(false);
  const [safetyVisible, setSafetyVisible] = useState(false);
  
  const featuresRef = useRef(null);
  const stepsRef = useRef(null);
  const safetyRef = useRef(null);

  const words = ['Support', 'Understanding', 'Connection', 'Wellness', 'Growth'];
  
  // Typewriter effect
  useEffect(() => {
    const typewriterEffect = () => {
      const currentWord = words[currentWordIndex];
      
      if (typewriterText.length < currentWord.length) {
        setTimeout(() => {
          setTypewriterText(currentWord.substring(0, typewriterText.length + 1));
        }, 120);
      } else {
        setTimeout(() => {
          setTypewriterText('');
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2500);
      }
    };
    
    const timer = setTimeout(typewriterEffect, 100);
    return () => clearTimeout(timer);
  }, [typewriterText, currentWordIndex, words]);

  // Intersection observers for animations
  useEffect(() => {
    const createObserver = (ref, setVisible) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        },
        { threshold: 0.2 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    };

    const cleanupFeatures = createObserver(featuresRef, setFeaturesVisible);
    const cleanupSteps = createObserver(stepsRef, setStepsVisible);
    const cleanupSafety = createObserver(safetyRef, setSafetyVisible);

    return () => {
      cleanupFeatures();
      cleanupSteps();
      cleanupSafety();
    };
  }, []);

  const features = [
    {
      icon: <GroupsIcon />,
      title: "Anonymous Peer Circles",
      description: "Connect with 4-5 carefully matched peers facing similar challenges in a secure, judgment-free environment.",
      highlight: "Peer Matching"
    },
    {
      icon: <PsychologyIcon />,
      title: "AI-Powered Insights",
      description: "Advanced algorithms provide intelligent matching, personalized prompts, and real-time crisis detection.",
      highlight: "Smart Technology"
    },
    {
      icon: <SecurityIcon />,
      title: "Enterprise-Grade Security",
      description: "Complete anonymity with AI-generated identities, end-to-end encryption, and 24/7 content moderation.",
      highlight: "Privacy First"
    },
    {
      icon: <FavoriteIcon />,
      title: "Evidence-Based Resources",
      description: "Access curated wellness practices, micro-interventions, and professional resources tailored to your needs.",
      highlight: "Proven Methods"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Secure Registration",
      description: "Create your AI-generated identity with complete anonymity. No personal information required—ever.",
      detail: "Our advanced privacy system ensures your real identity remains protected throughout your journey."
    },
    {
      number: "02", 
      title: "Intelligent Matching",
      description: "Our AI analyzes wellness needs, communication styles, and availability to create optimal peer groups.",
      detail: "Sophisticated algorithms ensure meaningful connections with peers facing similar challenges."
    },
    {
      number: "03",
      title: "Guided Support Sessions",
      description: "Participate in structured conversations with AI-generated prompts and professional oversight.",
      detail: "Evidence-based conversation frameworks designed to promote healing and personal growth."
    }
  ];

  const safetyFeatures = [
    "Real-time AI content moderation with crisis detection",
    "24/7 access to professional crisis intervention resources", 
    "Zero personal data collection or storage",
    "Advanced encryption protecting all communications",
    "Professional oversight and emergency response protocols",
    "Age-appropriate content filtering and safety measures"
  ];

  const faqs = [
    {
      question: "How does Murmr ensure complete anonymity?",
      answer: "Murmr uses advanced AI to generate unique identities, avatars, and communication patterns. We never collect, store, or request any personal information. All interactions are encrypted and anonymized at the protocol level."
    },
    {
      question: "What makes Murmr's AI matching superior?",
      answer: "Our proprietary algorithm analyzes multiple dimensions including wellness focus areas, communication preferences, time zones, and personality indicators to create highly compatible peer groups that maximize therapeutic benefit."
    },
    {
      question: "How does crisis intervention work?",
      answer: "Our AI continuously monitors conversations for crisis indicators. When detected, immediate private intervention occurs with direct access to professional helplines, emergency services, and trained crisis counselors."
    },
    {
      question: "Is Murmr validated by mental health professionals?",
      answer: "Yes, Murmr is developed in collaboration with licensed therapists, psychologists, and youth mental health specialists. Our approach is grounded in evidence-based peer support methodologies."
    },
    {
      question: "What age groups does Murmr serve?",
      answer: "Murmr is specifically designed for youth ages 16-24, with age-appropriate content, moderation, and safety protocols tailored to this demographic's unique mental health needs."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-screen min-h-screen bg-white">
      <style jsx>{`
        .text-A7727D { color: #A7727D; }
        .bg-A7727D { background-color: #A7727D; }
        .border-A7727D { border-color: #A7727D; }
        .hover\\:bg-A7727D:hover { background-color: #96616C; }
        
        .bg-EDDBC7 { background-color: #EDDBC7; }
        .text-EDDBC7 { color: #EDDBC7; }
        
        .bg-F8EAD8 { background-color: #F8EAD8; }
        .text-F8EAD8 { color: #F8EAD8; }
        
        .bg-F9F5E7 { background-color: #F9F5E7; }
        .text-F9F5E7 { color: #F9F5E7; }

        .typewriter-cursor {
          display: inline-block;
          width: 3px;
          height: 1.2em;
          background: linear-gradient(to bottom, #A7727D, #96616C);
          margin-left: 4px;
          animation: blink 1.2s infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(1deg); }
          66% { transform: translateY(4px) rotate(-1deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .float-animation {
          animation: float 8s ease-in-out infinite;
        }
        
        .pulse-animation {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .feature-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }
        
        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px -10px rgba(167, 114, 125, 0.3);
        }
        
        .step-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px -5px rgba(167, 114, 125, 0.2);
        }
        
        .primary-button {
          background: linear-gradient(135deg, #A7727D 0%, #96616C 50%, #A7727D 100%);
          background-size: 200% 200%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .primary-button:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(167, 114, 125, 0.4);
        }
        
        .primary-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.7s;
        }
        
        .primary-button:hover::before {
          left: 100%;
        }
        
        .secondary-button {
          border: 2px solid #A7727D;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .secondary-button:hover {
          background-color: #A7727D;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(167, 114, 125, 0.3);
        }
        
        .section-divider {
          position: relative;
          overflow: hidden;
        }
        
        .section-divider::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, #A7727D, transparent);
        }
        
        .chat-bubble {
          animation: fadeInUp 0.8s ease-out;
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #A7727D, #96616C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <Navbar />

      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-to-br from-F9F5E7 via-white to-F8EAD8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-A7727D/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="mb-6">
                <span className="inline-block bg-EDDBC7/50 text-A7727D px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
                  Mental Wellness Platform
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find Your Circle of
              </h1>
              <div className="h-16 md:h-20 flex items-center justify-center lg:justify-start">
                <span className="gradient-text text-4xl md:text-5xl lg:text-6xl font-bold">
                  {typewriterText}
                  <span className="typewriter-cursor"></span>
                </span>
              </div>
              <p className="mt-6 text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Professional-grade peer support platform designed specifically for youth mental wellness through anonymous, AI-facilitated support circles.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <button className="primary-button text-white font-semibold py-4 px-8 rounded-xl text-lg inline-flex items-center justify-center">
                  Start Your Journey <ArrowForwardIcon />
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="secondary-button !bg-white text-A7727D font-semibold py-4 px-8 rounded-xl text-lg"
                >
                  Explore Features
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircleIcon />
                  <span>100% Anonymous</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon />
                  <span>Always Free</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon />
                  <span>Professional Support</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-A7727D/20 to-EDDBC7/20 rounded-3xl blur-xl transform rotate-6"></div>
                <div className="relative bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 float-animation max-w-md">
                  <div className="bg-gradient-to-br from-F8EAD8 to-EDDBC7 rounded-2xl p-6">
                    <div className="flex space-x-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400 pulse-animation"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 pulse-animation" style={{animationDelay: '0.5s'}}></div>
                      <div className="w-3 h-3 rounded-full bg-green-400 pulse-animation" style={{animationDelay: '1s'}}></div>
                    </div>
                    <div className="space-y-4">
                      <div className="chat-bubble flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                          <span className="font-bold text-white text-sm">A</span>
                        </div>
                        <div className="bg-white p-3 rounded-2xl shadow-sm max-w-xs">
                          <p className="text-sm text-gray-800">I've been struggling with anxiety before presentations...</p>
                        </div>
                      </div>
                      <div className="chat-bubble flex items-start space-x-3 flex-row-reverse" style={{animationDelay: '0.6s'}}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-A7727D to-96616C flex items-center justify-center shadow-lg">
                          <span className="font-bold text-white text-sm">B</span>
                        </div>
                        <div className="bg-EDDBC7 p-3 rounded-2xl shadow-sm max-w-xs">
                          <p className="text-sm text-gray-800">I use breathing exercises before speaking. Would you like me to share what works?</p>
                        </div>
                      </div>
                      <div className="chat-bubble text-center py-2" style={{animationDelay: '1.2s'}}>
                        <div className="inline-block bg-A7727D/10 px-3 py-1 rounded-full">
                          <p className="text-xs text-A7727D font-medium">AI Prompt: What's one coping strategy you'd like to try?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Divider */}
      <div className="section-divider h-px bg-gradient-to-r from-transparent via-A7727D/30 to-transparent"></div>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-F9F5E7" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Professional-Grade <span className="gradient-text">Support Platform</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Advanced AI technology meets evidence-based mental health practices to create the most effective peer support experience for young adults.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card bg-white p-8 rounded-2xl border border-gray-100 transition-all duration-500 ${
                  featuresVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${featuresVisible ? index * 200 : 0}ms`,
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-EDDBC7/20 rounded-2xl blur-lg transform rotate-3"></div>
                  <div className="relative bg-F9F5E7 p-4 rounded-2xl flex justify-center">
                    {feature.icon}
                  </div>
                </div>
                <div className="mt-6">
                  <div className="inline-block bg-A7727D/10 px-3 py-1 rounded-full mb-3">
                    <span className="text-A7727D text-xs font-semibold tracking-wide uppercase">{feature.highlight}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Divider */}
      <div className="section-divider h-px bg-gradient-to-r from-transparent via-A7727D/30 to-transparent"></div>

      {/* Enhanced How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-F8EAD8 to-EDDBC7/30" ref={stepsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Streamlined <span className="gradient-text">Onboarding Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our carefully designed three-step process ensures you find meaningful peer connections while maintaining complete privacy and security.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`step-card relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-500 ${
                  stepsVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${stepsVisible ? index * 300 : 0}ms`,
                }}
              >
                <div className="absolute -top-6 left-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-A7727D to-96616C rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">{step.description}</p>
                  <p className="text-A7727D text-sm font-medium italic">{step.detail}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-A7727D to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Divider */}
      <div className="section-divider h-px bg-gradient-to-r from-transparent via-A7727D/30 to-transparent"></div>

      {/* Enhanced Safety Section */}
      <section id="safety" className="py-20 bg-gradient-to-b from-white to-F9F5E7" ref={safetyRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className={`lg:w-1/2 transition-all duration-800 ${
              safetyVisible ? 'animate-fadeInLeft opacity-100' : 'opacity-0'
            }`}>
              <div className="mb-6">
                <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
                  Enterprise Security
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Safety Is Our <span className="gradient-text">Foundation</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Built with enterprise-grade security protocols and professional mental health oversight to ensure the highest standards of user safety and privacy.
              </p>
              
              <div className="space-y-4">
                {safetyFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-start transition-all duration-500 ${
                      safetyVisible ? 'animate-fadeInLeft opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      animationDelay: `${safetyVisible ? (index + 1) * 150 : 0}ms`,
                    }}
                  >
                    <CheckCircleIcon />
                    <span className="text-gray-700 text-lg font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <button className="primary-button text-white font-semibold py-3 px-6 rounded-xl inline-flex items-center">
                  View Security Details <ArrowForwardIcon />
                </button>
              </div>
            </div>
            
            <div className={`lg:w-1/2 transition-all duration-800 ${
              safetyVisible ? 'animate-fadeInRight opacity-100' : 'opacity-0'
            }`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-A7727D/20 to-EDDBC7/20 rounded-3xl blur-2xl transform -rotate-6"></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                  <div className="bg-gradient-to-br from-EDDBC7 to-F8EAD8 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-A7727D text-lg flex items-center">
                        <SecurityIcon />
                        <span className="ml-3">Crisis Support Protocol</span>
                      </h3>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/80 p-4 rounded-xl">
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 bg-A7727D rounded-full mr-3"></div>
                          <span className="text-sm font-semibold text-gray-800">AI Detection Active</span>
                        </div>
                        <p className="text-sm text-gray-600">Continuous monitoring for crisis indicators</p>
                      </div>
                      <div className="bg-white/80 p-4 rounded-xl">
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-sm font-semibold text-gray-800">Professional Response</span>
                        </div>
                        <p className="text-sm text-gray-600">Immediate access to trained crisis counselors</p>
                      </div>
                      <div className="bg-white/80 p-4 rounded-xl">
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-sm font-semibold text-gray-800">Privacy Maintained</span>
                        </div>
                        <p className="text-sm text-gray-600">Complete anonymity preserved during intervention</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Divider */}
      <div className="section-divider h-px bg-gradient-to-r from-transparent via-A7727D/30 to-transparent"></div>

      
      {/* Professional Divider */}
      <div className="section-divider h-px bg-gradient-to-r from-transparent via-A7727D/30 to-transparent"></div>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-A7727D via-96616C to-A7727D relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-A7727D mb-6 leading-tight">
              Find Your <span className="text-EDDBC7">Support Circle</span>
            </h2>
            <p className="text-xl text-A7727D/90 mb-12 leading-relaxed max-w-2xl mx-auto">
              Connect with peers who understand, in a safe, anonymous space designed for young adults.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="bg-white text-A7727D font-semibold py-3 px-8 rounded-lg text-base hover:bg-gray-50 transition-all duration-200 shadow-md inline-flex items-center justify-center">
                Start Free Today <ArrowForwardIcon />
              </button>
              <button className="border-2 border-white/70 text-white font-semibold py-3 px-8 rounded-lg text-base hover:bg-white/10 transition-all duration-200">
                Learn More
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
              <div className="text-sm text-white/80">✓ 100% Anonymous</div>
              <div className="text-sm text-white/80">✓ Always Free</div>
              <div className="text-sm text-white/80">✓ 24/7 Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-2xl font-bold text-white mb-2">Murmr</div>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Supporting youth mental wellness through anonymous peer connections.
            </p>
            <div className="flex justify-center space-x-4 mb-8">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Safety</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Murmr. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              If you're in crisis, please contact your local emergency services or crisis helpline.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MurmrLanding;