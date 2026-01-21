import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { label: 'Active Traders', value: '50,000+', icon: '👥' },
    { label: 'Daily Volume', value: '$2.5B', icon: '💰' },
    { label: 'Success Rate', value: '94.7%', icon: '📈' },
    { label: 'Countries', value: '180+', icon: '🌍' }
  ];

  const features = [
    'Real-time Market Analysis',
    'AI-Powered Trading Signals',
    'Risk Management Tools',
    'Portfolio Optimization'
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-24">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        
        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="rgb(6, 182, 212)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            d="M0,300 Q400,100 800,200 T1600,150"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M0,500 Q600,300 1200,400 T2400,350"
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Enhanced Content */}
          <div className={`space-y-8 ${isVisible ? 'slide-in-left' : 'opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full glass-card border border-cyan-500/30 hover-lift">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-medium text-cyan-400">
                🚀 #1 Trading Platform 2024
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                <span className="block gradient-text text-balance">
                  Trade Smarter
                </span>
                <span className="block text-white text-balance">
                  with AI-Powered
                </span>
                <span className="block gradient-text text-balance">
                  Insights
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-2xl text-balance leading-relaxed">
                Join <span className="text-cyan-400 font-semibold">50,000+ traders</span> using our 
                advanced platform to maximize profits and minimize risks with real-time analytics.
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={feature}
                  className={`flex items-center space-x-3 ${isVisible ? 'fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
                  <span className="text-slate-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Enhanced CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 glow-intense">
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Start Trading Now</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>

              <button className="group px-8 py-4 glass-card border border-cyan-500/30 text-cyan-400 font-semibold text-lg rounded-2xl hover-lift transition-all duration-300">
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>Watch Demo</span>
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-6 border-t border-slate-700/50">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 border-2 border-slate-900"></div>
                  ))}
                </div>
                <span className="text-sm text-slate-400">Trusted by 50K+ traders</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
                <span className="text-sm text-slate-400 ml-2">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Enhanced Dashboard Preview */}
          <div className={`relative ${isVisible ? 'slide-in-right' : 'opacity-0'}`}>
            <div className="relative">
              {/* Main Dashboard */}
              <div className="glass-strong rounded-3xl p-6 lg:p-8 border border-cyan-500/20 hover-lift">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Portfolio Overview</h3>
                    <p className="text-slate-400">Real-time performance</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-emerald-400 font-medium">Live</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {stats.map((stat, index) => (
                    <div 
                      key={stat.label}
                      className={`glass-card p-4 rounded-xl border border-cyan-500/10 transition-all duration-500 hover-lift ${
                        currentStat === index ? 'border-cyan-500/40 glow' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{stat.icon}</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                          <div className="text-xs text-slate-400">{stat.label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Chart */}
                <div className="relative h-48 glass-card rounded-xl p-4 border border-cyan-500/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-300">Performance Chart</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-emerald-400 text-sm">+24.7%</span>
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Animated Chart Lines */}
                  <svg className="w-full h-32" viewBox="0 0 300 100">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    
                    {/* Chart Area */}
                    <path
                      d="M0,80 Q75,20 150,40 T300,30"
                      fill="url(#chartGradient)"
                      stroke="none"
                    />
                    
                    {/* Chart Line */}
                    <path
                      d="M0,80 Q75,20 150,40 T300,30"
                      fill="none"
                      stroke="rgb(6, 182, 212)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                    
                    {/* Data Points */}
                    {[0, 75, 150, 225, 300].map((x, i) => (
                      <circle
                        key={i}
                        cx={x}
                        cy={[80, 20, 40, 25, 30][i]}
                        r="4"
                        fill="rgb(6, 182, 212)"
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </svg>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <button className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-300">
                    Buy
                  </button>
                  <button className="flex-1 py-3 glass-card border border-red-500/30 text-red-400 font-semibold rounded-xl hover:scale-105 transition-transform duration-300">
                    Sell
                  </button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Floating Notification */}
            <div className="absolute top-4 -left-4 glass-card p-3 rounded-xl border border-emerald-500/30 animate-bounce-gentle">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-emerald-400 font-medium">+$2,847 profit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;