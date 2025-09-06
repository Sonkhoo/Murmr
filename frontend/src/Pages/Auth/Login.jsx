import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../services/auth';
import { createAnonProfile } from '../../services/auth';

// SVG Icons
const EmailIcon = () => (
  <svg className="w-5 h-5 text-A7727D" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>
);

const PasswordIcon = () => (
  <svg className="w-5 h-5 text-A7727D" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5 text-A7727D" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const CrisisIcon = () => (
  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const MurmrLogin = () => {
    const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle(); // Firebase popup
      console.log('Google user:', user);
  
      // Optional: create anonymous profile in Firestore
      await createAnonProfile(user);
  
      // Redirect to onboarding or dashboard
      navigate('/onboarding');
    } catch (err) {
      console.error('Google sign-in failed:', err);
      alert('Google sign-in failed. Check console for details.');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempted with:', credentials);
    navigate('/onboarding');
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-[#F9F5E7] to-[#F8EAD8] overflow-hidden">
      <style jsx>{`
        .text-A7727D { color: #A7727D; }
        .bg-A7727D { background-color: #A7727D; }
        .border-A7727D { border-color: #A7727D; }
        .focus\\:ring-A7727D:focus { --tw-ring-color: #A7727D; }
        .focus\\:border-A7727D:focus { border-color: #A7727D; }
        .hover\\:text-96616C:hover { color: #96616C; }
        
        .bg-EDDBC7 { background-color: #EDDBC7; }
        .text-EDDBC7 { color: #EDDBC7; }
        
        .bg-F8EAD8 { background-color: #F8EAD8; }
        .text-F8EAD8 { color: #F8EAD8; }
        
        .bg-F9F5E7 { background-color: #F9F5E7; }
        .text-F9F5E7 { color: #F9F5E7; }
        
        .shiny-button {
          background: linear-gradient(135deg, #A7727D 0%, #C28A95 50%, #A7727D 100%);
          background-size: 200% 200%;
          transition: all 0.3s ease;
        }
        
        .shiny-button:hover {
          background-position: right center;
          box-shadow: 0 8px 25px rgba(167, 114, 125, 0.3);
          transform: translateY(-1px);
        }
        
        .input-focus:focus {
          outline: none;
          border-color: #A7727D;
          box-shadow: 0 0 0 3px rgba(167, 114, 125, 0.1);
        }
      `}</style>
      
      <Navbar />
      
      {/* Main container with proper centering */}
      <div className="flex items-center justify-center min-h-screen px-4 py-8 pt-30">
        <div className="w-full max-w-md">
          {/* Crisis support banner - outside the card for better visibility */}
          <div className="text-center mb-6">
            <a href="#" className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-200">
              <CrisisIcon />
              Need help right now? Get Crisis Support →
            </a>
          </div>
          
          {/* Main card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="!text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
                <p className="text-gray-600">Log in to return to your circle</p>
              </div>
              
              {/* Login form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email input */}
                <div>
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EmailIcon />
                    </div>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="input-focus block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 transition-colors duration-200"
                      placeholder="Enter your email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {/* Password input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PasswordIcon />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="input-focus block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 transition-colors duration-200"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {/* Login button */}
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white shiny-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-A7727D"
                >
                  Log In
                </button>
              </form>
              
              {/* Divider */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or continue with</span>
                  </div>
                </div>
              </div>
              
              {/* Google login */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="mt-6 w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm !bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-A7727D"
              >
                <GoogleIcon />
                Continue with Google
              </button>
              
              {/* Sign up link */}
              <div className="text-center mt-8">
                <Link 
                  to="/signup" 
                  className="font-medium text-A7727D hover:text-96616C transition-colors duration-200"
                >
                  New here? Sign up →
                </Link>
              </div>
            </div>
            
            {/* Privacy footer */}
            <div className="bg-F8EAD8 px-8 py-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckIcon />
                  <span className="text-sm text-gray-700">Your identity stays completely anonymous</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon />
                  <span className="text-sm text-gray-700">No personal data is shared in circles</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon />
                  <span className="text-sm text-gray-700">Safe & secure conversations guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MurmrSignup = () => {
    const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle(); // Firebase popup
      console.log('Google user:', user);
  
      // Optional: create anonymous profile in Firestore
      await createAnonProfile(user);
  
      // Redirect to onboarding or dashboard
      navigate('/onboarding');
    } catch (err) {
      console.error('Google sign-in failed:', err);
      alert('Google sign-in failed. Check console for details.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup attempted with:', credentials);
    navigate('/onboarding');
  };

  return (
    <div className="overflow-hidden w-screen min-h-screen bg-gradient-to-br from-[#F9F5E7] to-[#F8EAD8]">
      <style jsx>{`
        .text-A7727D { color: #A7727D; }
        .bg-A7727D { background-color: #A7727D; }
        .border-A7727D { border-color: #A7727D; }
        .focus\\:ring-A7727D:focus { --tw-ring-color: #A7727D; }
        .focus\\:border-A7727D:focus { border-color: #A7727D; }
        .hover\\:text-96616C:hover { color: #96616C; }
        
        .bg-EDDBC7 { background-color: #EDDBC7; }
        .text-EDDBC7 { color: #EDDBC7; }
        
        .bg-F8EAD8 { background-color: #F8EAD8; }
        .text-F8EAD8 { color: #F8EAD8; }
        
        .bg-F9F5E7 { background-color: #F9F5E7; }
        .text-F9F5E7 { color: #F9F5E7; }
        
        .shiny-button {
          background: linear-gradient(135deg, #A7727D 0%, #C28A95 50%, #A7727D 100%);
          background-size: 200% 200%;
          transition: all 0.3s ease;
        }
        
        .shiny-button:hover {
          background-position: right center;
          box-shadow: 0 8px 25px rgba(167, 114, 125, 0.3);
          transform: translateY(-1px);
        }
        
        .input-focus:focus {
          outline: none;
          border-color: #A7727D;
          box-shadow: 0 0 0 3px rgba(167, 114, 125, 0.1);
        }
      `}</style>
      
      <Navbar />
      
      {/* Main container with proper centering */}
      <div className="flex items-center justify-center min-h-screen px-4 py-8 pt-30">
        <div className="w-full max-w-md">
          {/* Crisis support banner - outside the card for better visibility */}
          <div className="text-center mb-6">
            <a href="#" className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-200">
              <CrisisIcon />
              Need help right now? Get Crisis Support →
            </a>
          </div>
          
          {/* Main card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="!text-2xl font-bold text-gray-900 mb-2">Join Murmr</h1>
                <p className="text-gray-600">Your safe, anonymous space awaits</p>
              </div>
              
              {/* Signup form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EmailIcon />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="input-focus block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 transition-colors duration-200"
                      placeholder="Enter your email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {/* Username input */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Display name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="input-focus block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 transition-colors duration-200"
                      placeholder="Choose a display name"
                      value={credentials.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {/* Password input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PasswordIcon />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="input-focus block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 transition-colors duration-200"
                      placeholder="Create a strong password"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {/* Sign up button */}
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white shiny-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-A7727D"
                >
                  Create Account
                </button>
              </form>
              
              {/* Divider */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or continue with</span>
                  </div>
                </div>
              </div>
              
              {/* Google signup */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="mt-6 w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm !bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-A7727D"
              >
                <GoogleIcon />
                Continue with Google
              </button>
              
              {/* Login link */}
              <div className="text-center mt-8">
                <Link 
                  to="/login" 
                  className="font-medium text-A7727D hover:text-96616C transition-colors duration-200"
                >
                  Already have an account? Log in →
                </Link>
              </div>
            </div>
            
            {/* Privacy footer */}
            <div className="bg-F8EAD8 px-8 py-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckIcon />
                  <span className="text-sm text-gray-700">Your identity stays completely anonymous</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon />
                  <span className="text-sm text-gray-700">No personal data is shared in circles</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon />
                  <span className="text-sm text-gray-700">Safe & secure conversations guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MurmrLogin, MurmrSignup };