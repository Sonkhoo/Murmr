import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

// SVG Icons
const ArrowForwardIcon = () => (
  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-A7727D"></div>
  </div>
);

const UploadIcon = () => (
  <svg className="w-8 h-8 text-A7727D" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
  </svg>
);

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    identity: { name: '', avatar: '' },
    focusAreas: [],
    preferences: { time: '', language: 'en' }
  });
  const [isMatching, setIsMatching] = useState(false);
  const [avatarAnimation, setAvatarAnimation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('animals');
  const navigate = useNavigate();

  // Enhanced avatar options with categories
  const avatarCategories = {
    animals: {
      label: 'Animals',
      icon: '🦁',
      avatars: ['🦁', '🐯', '🐻', '🐼', '🦊', '🐺', '🐨', '🐸', '🦋', '🐧', '🦉', '🐙', '🦄', '🐲', '🦅', '🐢']
    },
    nature: {
      label: 'Nature',
      icon: '🌳',
      avatars: ['🌳', '🌲', '🌿', '🍃', '🌸', '🌺', '🌻', '🌹', '🌷', '⭐', '🌙', '☀️', '🌈', '🔥', '💧', '❄️']
    },
    symbols: {
      label: 'Symbols',
      icon: '💎',
      avatars: ['💎', '⚡', '🌟', '✨', '💫', '🔮', '🎭', '🎨', '🎵', '📚', '🔥', '💪', '❤️', '🧠', '🌀', '🎯']
    },
    objects: {
      label: 'Objects',
      icon: '🎈',
      avatars: ['🎈', '🎪', '🎨', '🎯', '🎲', '🎸', '🎧', '📱', '💻', '📷', '✏️', '📝', '🔍', '🛡️', '⚖️', '🏆']
    }
  };

  const focusOptions = [
    { id: 'stress', label: 'Stress Management', icon: '🌪️' },
    { id: 'anxiety', label: 'Anxiety', icon: '🌀' },
    { id: 'confidence', label: 'Confidence Building', icon: '💪' },
    { id: 'sleep', label: 'Sleep Issues', icon: '🌙' },
    { id: 'exam_anxiety', label: 'Exam Anxiety', icon: '📚' },
    { id: 'relationships', label: 'Relationships', icon: '👥' },
    { id: 'motivation', label: 'Motivation', icon: '🔥' },
    { id: 'self_esteem', label: 'Self-Esteem', icon: '⭐' }
  ];

  const timeOptions = [
    { id: 'morning', label: 'Morning Person', icon: '🌅', description: '6AM - 12PM' },
    { id: 'afternoon', label: 'Afternoon', icon: '☀️', description: '12PM - 6PM' },
    { id: 'evening', label: 'Evening', icon: '🌇', description: '6PM - 12AM' },
    { id: 'flexible', label: 'Flexible', icon: '🕒', description: 'Any time works' }
  ];

  const languageOptions = [
    { id: 'en', label: 'English', flag: '🇺🇸' },
    { id: 'hi', label: 'Hindi', flag: '🇮🇳' },
    { id: 'bn', label: 'Bengali', flag: '🇧🇩' },
    { id: 'ta', label: 'Tamil', flag: '🇮🇳' }
  ];

  const steps = [
    {
      title: "Welcome to Your Safe Space",
      description: "Murmr connects you with supportive peers who understand what you're going through. Everything is anonymous and secure.",
      illustration: "✨",
      button: "Begin Your Journey"
    },
    {
      title: "Choose Your Avatar",
      description: "Select an avatar that represents you in your circle. Your identity stays completely anonymous.",
      illustration: "🎭",
      button: "Continue"
    },
    {
      title: "What Would You Like Support With?",
      description: "Select topics that resonate with you (choose 2-3)",
      illustration: "💬",
      button: "Continue"
    },
    {
      title: "When Are You Most Active?",
      description: "This helps us match you with peers who have similar availability",
      illustration: "⏰",
      button: "Continue"
    },
    {
      title: "Preferred Language",
      description: "Choose the language you're most comfortable communicating in",
      illustration: "🌎",
      button: "Find My Circle"
    },
    {
      title: "Finding Your Perfect Circle",
      description: "Our AI is matching you with peers who share similar experiences and availability",
      illustration: "🔍",
      button: "Continue"
    },
    {
      title: "Welcome to Your Circle!",
      description: "Meet your supportive peers (all identities are AI-generated for privacy)",
      illustration: "👥",
      button: "Enter Your Circle"
    }
  ];

  // Trigger avatar animation when step 1 loads
  useEffect(() => {
    if (currentStep === 1) {
      setTimeout(() => setAvatarAnimation(true), 500);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep === steps.length - 2) {
      setIsMatching(true);
      setTimeout(() => {
        setIsMatching(false);
        setCurrentStep(currentStep + 1);
      }, 3000);
    } else if (currentStep === steps.length - 1) {
      navigate('/dashboard');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAvatarSelect = (avatar) => {
    setUserData({
      ...userData,
      identity: { ...userData.identity, avatar }
    });
  };

  const handleCustomAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData({
          ...userData,
          identity: { ...userData.identity, avatar: e.target.result }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFocusToggle = (focusId) => {
    const updatedFocusAreas = userData.focusAreas.includes(focusId)
      ? userData.focusAreas.filter(id => id !== focusId)
      : [...userData.focusAreas, focusId];
    
    setUserData({
      ...userData,
      focusAreas: updatedFocusAreas
    });
  };

  const handleTimeSelect = (timeId) => {
    setUserData({
      ...userData,
      preferences: { ...userData.preferences, time: timeId }
    });
  };

  const handleLanguageSelect = (languageId) => {
    setUserData({
      ...userData,
      preferences: { ...userData.preferences, language: languageId }
    });
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return userData.identity.avatar !== '';
      case 2:
        return userData.focusAreas.length >= 2 && userData.focusAreas.length <= 3;
      case 3:
        return userData.preferences.time !== '';
      case 4:
        return userData.preferences.language !== '';
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <div className="text-6xl mb-6 animate-bounce">{steps[0].illustration}</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{steps[0].title}</h2>
            <p className="text-xl text-gray-600 mb-8">{steps[0].description}</p>
          </div>
        );
      
      case 1:
        return (
          <div className="text-center pt-4">
            <div className={`text-4xl mb-6 transition-all duration-1000 ${avatarAnimation ? 'animate-pulse' : ''}`}>
              {steps[1].illustration}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{steps[1].title}</h2>
            <p className="text-lg text-gray-600 mb-8">{steps[1].description}</p>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {Object.entries(avatarCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === key
                      ? 'bg-A7727D text-white transform scale-105'
                      : 'bg-F8EAD8 text-A7727D hover:bg-A7727D hover:text-white'
                  }`}
                >
                  {category.icon} {category.label}
                </button>
              ))}
            </div>
            
            {/* Avatar Grid */}
            <div className={`grid grid-cols-4 md:grid-cols-8 gap-3 mb-6 transition-all duration-500 ${
              avatarAnimation ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>
              {avatarCategories[selectedCategory].avatars.map((avatar, index) => (
                <div
                  key={avatar}
                  className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-300 hover:scale-110 ${
                    userData.identity.avatar === avatar
                      ? 'border-A7727D bg-F8EAD8 transform scale-105 shadow-lg'
                      : 'border-gray-200 hover:border-A7727D hover:bg-F9F5E7 hover:shadow-md'
                  }`}
                  onClick={() => handleAvatarSelect(avatar)}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: avatarAnimation ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                  }}
                >
                  <div className="text-2xl">{avatar}</div>
                </div>
              ))}
            </div>
            
            {/* Custom Upload Option */}
            <div className="border-2 border-dashed border-A7727D rounded-lg p-6 mb-6 bg-F9F5E7/50">
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomAvatarUpload}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="cursor-pointer flex flex-col items-center space-y-2 hover:text-A7727D transition-colors"
              >
                <UploadIcon />
                <span className="font-medium text-black">Upload Custom Avatar</span>
                <span className="text-sm text-gray-500">JPG, PNG up to 5MB</span>
              </label>
            </div>
            
            {/* Selected Avatar Preview */}
            {userData.identity.avatar && (
              <div className="bg-F8EAD8 p-6 rounded-xl mb-6 animate-fadeIn">
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-4xl animate-bounce">
                    {userData.identity.avatar.startsWith('data:') ? (
                      <img 
                        src={userData.identity.avatar} 
                        alt="Custom avatar" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      userData.identity.avatar
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-A7727D">Perfect choice!</p>
                    <p className="text-sm text-gray-600">This will be your anonymous identity</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 2:
        return (
          <div className="text-center">
            <div className="text-4xl mb-6">{steps[2].illustration}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{steps[2].title}</h2>
            <p className="text-lg text-gray-600 mb-8">{steps[2].description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {focusOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                    userData.focusAreas.includes(option.id)
                      ? 'border-A7727D bg-F8EAD8 transform scale-105 shadow-lg'
                      : 'border-gray-200 hover:border-A7727D hover:bg-F9F5E7'
                  }`}
                  onClick={() => handleFocusToggle(option.id)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl mb-2 text-black">{option.icon}</div>
                  <div className="font-medium text-sm text-black">{option.label}</div>
                </div>
              ))}
            </div>
            
            {userData.focusAreas.length > 0 && (
              <div className="bg-F8EAD8 p-4 rounded-lg mb-6 animate-slideIn">
                <p className="font-medium text-black">
                  Selected: {userData.focusAreas.length}/3 •{' '}
                  {userData.focusAreas.map(id => {
                    const option = focusOptions.find(o => o.id === id);
                    return option ? option.label : '';
                  }).join(', ')}
                </p>
                {userData.focusAreas.length < 2 && (
                  <p className="text-sm text-A7727D mt-1">Please select at least 2 focus areas</p>
                )}
              </div>
            )}
          </div>
        );
      
      case 3:
        return (
          <div className="text-center">
            <div className="text-4xl mb-6">{steps[3].illustration}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{steps[3].title}</h2>
            <p className="text-lg text-gray-600 mb-8">{steps[3].description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {timeOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                    userData.preferences.time === option.id
                      ? 'border-A7727D bg-F8EAD8 transform scale-105 shadow-lg'
                      : 'border-gray-200 hover:border-A7727D hover:bg-F9F5E7'
                  }`}
                  onClick={() => handleTimeSelect(option.id)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl mb-2 text-black  ">{option.icon}</div>
                  <div className="font-medium text-sm text-black">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </div>
              ))}
            </div>
            
            {userData.preferences.time && (
              <div className="bg-F8EAD8 p-4 rounded-lg mb-6 animate-slideIn">
                <p className="font-medium text-black">
                  Preferred time: {timeOptions.find(t => t.id === userData.preferences.time)?.label}
                </p>
              </div>
            )}
          </div>
        );
      
      case 4:
        return (
          <div className="text-center">
            <div className="text-4xl mb-6 pt-2">{steps[4].illustration}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{steps[4].title}</h2>
            <p className="text-lg text-gray-600 mb-8">{steps[4].description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {languageOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                    userData.preferences.language === option.id
                      ? 'border-A7727D bg-F8EAD8 transform scale-105 shadow-lg'
                      : 'border-gray-200 hover:border-A7727D hover:bg-F9F5E7'
                  }`}
                  onClick={() => handleLanguageSelect(option.id)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl mb-2 text-black">{option.flag}</div>
                  <div className="font-medium text-sm text-black">{option.label}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-F8EAD8 p-4 rounded-lg mb-6 animate-slideIn">
              <p className="text-black font-medium">
                Selected language: {languageOptions.find(l => l.id === userData.preferences.language)?.label}
              </p>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="text-center">
            <div className="text-4xl mb-6">{steps[5].illustration}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{steps[5].title}</h2>
            <p className="text-lg text-gray-600 mb-8">{steps[5].description}</p>
            
            {isMatching ? (
              <div className="py-8">
                <LoadingSpinner />
                <p className="mt-4 text-A7727D font-medium animate-pulse">Analyzing your preferences...</p>
              </div>
            ) : (
              <div className="bg-F8EAD8 p-6 rounded-lg mb-6 animate-slideIn">
                <div className="flex items-center justify-center mb-4">
                  <CheckIcon className="w-8 h-8 text-green-500 mr-2" />
                  <h3 className="text-xl font-bold text-A7727D">Circle Found!</h3>
                </div>
                <p className="mb-4">We've found the perfect circle for you based on your preferences.</p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-medium text-black">Your circle focuses on:</p>
                  <ul className="mt-2 text-black">
                    {userData.focusAreas.slice(0, 3).map(id => {
                      const option = focusOptions.find(o => o.id === id);
                      return <li key={id}>• {option?.label}</li>;
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
      
      case 6:
        return (
          <div className="text-center">
            <div className="text-4xl mb-6">{steps[6].illustration}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{steps[6].title}</h2>
            <p className="text-lg text-gray-600 mb-8">{steps[6].description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { name: 'GentleWave', avatar: '🌊', focus: 'Stress, Sleep' },
                { name: 'ResilientOak', avatar: '🌳', focus: 'Anxiety, Confidence' },
                { name: 'QuietStream', avatar: '💧', focus: 'Exam Anxiety, Motivation' }
              ].map((member, index) => (
                <div key={index} className="bg-F8EAD8 p-6 rounded-lg border-2 border-EDDBC7 animate-fadeIn" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="text-4xl mb-3">{member.avatar}</div>
                  <h3 className="font-bold text-A7727D text-lg">{member.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{member.focus}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-6 rounded-lg border-2 border-A7727D mb-6 animate-slideIn">
              <h3 className="font-bold text-A7727D text-lg mb-2">Your Circle's Focus</h3>
              <p className="text-gray-700">
                {userData.focusAreas.slice(0, 3).map(id => {
                  const option = focusOptions.find(o => o.id === id);
                  return option?.label;
                }).join(', ')}
              </p>
              <p className="text-sm text-gray-500 mt-3">
                You'll receive daily prompts and can chat with your circle anytime
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
    <div className="w-screen min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #EDDBC7 0%, #EDDBC7 50%, #F8EAD8 100%)' }}>
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 pt-24">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
          <style>{`
        .text-A7727D { color: #A7727D; }
        .bg-A7727D { background-color: #A7727D; }
        .border-A7727D { border-color: #A7727D; }
        
        .bg-EDDBC7 { background-color: #EDDBC7; }
        .text-EDDBC7 { color: #EDDBC7; }
        
        .bg-F8EAD8 { background-color: #F8EAD8; }
        .text-F8EAD8 { color: #F8EAD8; }
        
        .bg-F9F5E7 { background-color: #F9F5E7; }
        .text-F9F5E7 { color: #F9F5E7; }
        
        .shiny-button {
          background: linear-gradient(45deg, #A7727D, #D69CA5, #A7727D);
          background-size: 200% 200%;
          transition: all 0.5s ease;
        }
        
        .shiny-button:hover {
          background-position: right center;
          box-shadow: 0 5px 15px rgba(167, 114, 125, 0.4);
          transform: translateY(-2px);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>

          <div className="w-full bg-white p-6 md:p-8">
        {/* Progress Bar */}
        <div className="bg-F8EAD8 rounded-t-2xl px-6 py-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-A7727D">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-xs text-A7727D">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-A7727D h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-6 pt-4 pb-8 md:px-10 md:pt-6 md:pb-12">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="bg-white px-6 py-5 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                currentStep === 0
                  ? 'text-gray-400 !bg-gray-100 cursor-not-allowed'
                  : 'text-A7727D hover:text-white hover:bg-A7727D'
              }`}
          >
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={!isStepComplete() || isMatching}
            className={`px-6 py-2 rounded-md font-medium text-white shiny-button flex items-center transition-all duration-300 ${
              (!isStepComplete() || isMatching) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
            }`}
          >
            {steps[currentStep].button}
            {currentStep !== steps.length - 1 && <ArrowForwardIcon />}
          </button>
          </div>
        </div>
      </div>

      {/* Crisis Support Button (always visible) */}
      <div className="fixed bottom-6 right-6">
        <button className="!bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-full shadow-md transition-all duration-300 flex items-center hover:shadow-lg hover:scale-105">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          Crisis Support
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Onboarding;