import React, { useState, useEffect } from 'react';

// Minimal SVG Icons
const ChatIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path>
  </svg>
);

const WellnessIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
  </svg>
);

const ProfileIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
  </svg>
);

const CrisisIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
  </svg>
);

const CollapseIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
  </svg>
);

const ExpandIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
  </svg>
);

// Minimal Sidebar Component
const Sidebar = ({ isOpen, setIsOpen, activeSection, setActiveSection, isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { id: 'chat', label: 'Circle Chat', icon: <ChatIcon /> },
    { id: 'wellness', label: 'Wellness', icon: <WellnessIcon /> },
    { id: 'profile', label: 'Profile', icon: <ProfileIcon /> }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className={`fixed left-0 top-0 h-full bg-white shadow-lg border-r border-gray-200 z-50 transform transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-murmr-cream">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-murmr-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">M</span>
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Murmr</h1>
                  <p className="text-xs text-murmr-primary">Support Platform</p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <button 
                onClick={() => setIsCollapsed(true)}
                className="hidden lg:block p-1 rounded hover:bg-murmr-light transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </button>
            )}
            {isCollapsed && (
              <button 
                onClick={() => setIsCollapsed(false)}
                className="hidden lg:block absolute top-6 right-2 p-1 rounded hover:bg-murmr-light transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* User Info */}
        {!isCollapsed && (
          <div className="p-6 bg-murmr-light border-b border-gray-200 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">CL</span>
              </div>
              <div className="transition-opacity duration-200">
                <h3 className="font-semibold text-gray-900 text-sm">CalmLion</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600">Online</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed User Indicator */}
        {isCollapsed && (
          <div className="p-3 border-b border-gray-200 flex justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm relative">
              <span className="text-white font-bold text-xs">CL</span>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 py-4">
          <nav className={`space-y-1 ${isCollapsed ? 'px-2' : 'px-4'} transition-all duration-300`}>
            {menuItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center px-3' : 'space-x-3 px-4'} py-3 rounded-xl font-medium transition-all duration-200 group ${
                    activeSection === item.id
                      ? 'bg-murmr-primary text-white shadow-sm'
                      : 'text-gray-700 hover:bg-murmr-light hover:text-murmr-primary'
                  }`}
                >
                  <div className={`transition-transform duration-200 ${activeSection === item.id ? 'scale-110' : 'group-hover:scale-105'}`}>
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <span className="transition-opacity duration-200">{item.label}</span>
                  )}
                </button>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900"></div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Crisis Support */}
        <div className="border-t border-gray-200 p-4">
          <div className={`bg-red-50 border border-red-200 rounded-lg p-3 ${isCollapsed ? 'text-center' : ''}`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'} mb-2`}>
              <CrisisIcon />
              {!isCollapsed && <span className="font-medium text-red-700 text-sm">Need Help?</span>}
            </div>
            <button 
              title={isCollapsed ? 'Crisis Support' : ''}
              className={`w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 ${isCollapsed ? 'px-2' : 'px-3'} rounded text-sm transition-colors`}
            >
              {isCollapsed ? '!' : 'Crisis Support'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Main MVP Dashboard Component
const MurmrMVPDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('chat');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const circleMembers = [
    { name: 'QuietRose', avatar: 'QR', status: 'online' },
    { name: 'BraveOak', avatar: 'BO', status: 'online' },
    { name: 'WiseOwl', avatar: 'WO', status: 'away' },
    { name: 'SteadyStream', avatar: 'SS', status: 'offline' }
  ];

  const recentMessages = [
    { user: 'QuietRose', message: 'Thanks for sharing that breathing technique!', time: '2m ago' },
    { user: 'BraveOak', message: 'Had a breakthrough in therapy today. Feeling hopeful!', time: '15m ago' },
    { user: 'WiseOwl', message: 'The mindfulness exercise was exactly what I needed.', time: '1h ago' }
  ];

  return (
    <div className="w-screen min-h-screen bg-gray-50">
      <style jsx>{`
        .bg-murmr-primary { background-color: #A7727D; }
        .text-murmr-primary { color: #A7727D; }
        .border-murmr-primary { border-color: #A7727D; }
        .hover\\:bg-murmr-primary:hover { background-color: #A7727D; }
        
        .bg-murmr-secondary { background-color: #EDDBC7; }
        .bg-murmr-light { background-color: #F8EAD8; }
        .bg-murmr-cream { background-color: #F9F5E7; }
        
        .status-online { @apply bg-green-500; }
        .status-away { @apply bg-yellow-500; }
        .status-offline { @apply bg-gray-400; }
      `}</style>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                >
                  <MenuIcon />
                </button>
                <h1 className="text-xl font-bold text-gray-900">
                  Hello, <span className="text-murmr-primary">CalmLion!</span>
                </h1>
              </div>
              
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                Crisis Support
              </button>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6 space-y-6">
            {/* Support Circle */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="bg-murmr-cream p-4 border-b border-gray-200 rounded-t-xl">
                <h2 className="text-lg font-bold text-gray-900">Your Support Circle</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {circleMembers.map((member, index) => (
                    <div key={index} className="text-center">
                      <div className="relative inline-block">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-2">
                          <span className="text-white font-bold text-sm">{member.avatar}</span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-white rounded-full status-${member.status}`}></div>
                      </div>
                      <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-murmr-primary hover:bg-opacity-90 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Join Circle Chat
                </button>
              </div>
            </div>

            {/* Today's Focus & Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Today's Focus */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="bg-murmr-light p-4 border-b border-gray-200 rounded-t-xl">
                  <h3 className="text-lg font-bold text-gray-900">Today's Focus</h3>
                </div>
                <div className="p-4">
                  <div className="bg-murmr-cream rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">💭 Reflection Prompt</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      "What's one small act of kindness you showed yourself this week?"
                    </p>
                  </div>
                  <button className="w-full bg-murmr-primary hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Share with Circle
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="bg-murmr-secondary p-4 border-b border-gray-200 rounded-t-xl">
                  <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {recentMessages.map((msg, index) => (
                      <div key={index} className="p-3 rounded-lg bg-gray-50">
                        <div className="flex items-start justify-between mb-1">
                          <span className="font-medium text-murmr-primary text-sm">{msg.user}</span>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 border border-murmr-primary text-murmr-primary hover:bg-murmr-primary hover:text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    View All Messages
                  </button>
                </div>
              </div>
            </div>

            {/* Wellness Tools */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="bg-murmr-light p-4 border-b border-gray-200 rounded-t-xl">
                <h3 className="text-lg font-bold text-gray-900">Quick Wellness Tools</h3>
              </div>
              <div className="p-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-murmr-cream rounded-lg p-4 text-center hover:bg-murmr-secondary transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">🌬️</div>
                    <h4 className="font-medium text-gray-900 mb-1">5-Min Breathing</h4>
                    <p className="text-sm text-gray-600">Guided breathing</p>
                  </div>
                  
                  <div className="bg-murmr-cream rounded-lg p-4 text-center hover:bg-murmr-secondary transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">✨</div>
                    <h4 className="font-medium text-gray-900 mb-1">Gratitude</h4>
                    <p className="text-sm text-gray-600">Quick practice</p>
                  </div>
                  
                  <div className="bg-murmr-cream rounded-lg p-4 text-center hover:bg-murmr-secondary transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">🧘</div>
                    <h4 className="font-medium text-gray-900 mb-1">Check-in</h4>
                    <p className="text-sm text-gray-600">Mindful awareness</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="bg-murmr-secondary p-4 border-b border-gray-200 rounded-t-xl">
                <h3 className="text-lg font-bold text-gray-900">Your Progress</h3>
              </div>
              <div className="p-4">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-murmr-primary mb-1">5</div>
                    <p className="text-gray-700 font-medium">Days Active</p>
                    <div className="mt-2 flex justify-center space-x-1">
                      {[1,2,3,4,5,6,7].map((day) => (
                        <div key={day} className={`w-2 h-2 rounded-full ${
                          day <= 5 ? 'bg-murmr-primary' : 'bg-gray-300'
                        }`}></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-murmr-primary mb-1">12</div>
                    <p className="text-gray-700 font-medium">Messages Sent</p>
                    <p className="text-sm text-gray-500 mt-1">This week</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-murmr-primary mb-1">3</div>
                    <p className="text-gray-700 font-medium">Exercises Done</p>
                    <p className="text-sm text-gray-500 mt-1">Today</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Resources */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CrisisIcon />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-red-800 mb-1">Crisis Support Available 24/7</h3>
                  <p className="text-red-700 text-sm mb-3">
                    Immediate professional help is available. Your privacy is protected.
                  </p>
                  <div className="flex space-x-3">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors">
                      Call 988
                    </button>
                    <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors">
                      Chat Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MurmrMVPDashboard;