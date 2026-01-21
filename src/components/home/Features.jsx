import React, { useState, useEffect, useRef } from 'react';

const Features = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  const features = [
    {
      id: 1,
      icon: '🤖',
      title: 'AI-Powered Trading',
      description: 'Advanced machine learning algorithms analyze market patterns and execute trades with 94.7% accuracy.',
      stats: '94.7% Success Rate',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-500/10 to-teal-600/10',
      borderColor: 'border-emerald-500/30',
      glowColor: 'shadow-emerald-500/25'
    },
    {
      id: 2,
      icon: '⚡',
      title: 'Lightning Fast Execution',
      description: 'Execute trades in milliseconds with our ultra-low latency infrastructure and real-time market data.',
      stats: '<1ms Latency',
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'from-cyan-500/10 to-blue-600/10',
      borderColor: 'border-cyan-500/30',
      glowColor: 'shadow-cyan-500/25'
    },
    {
      id: 3,
      icon: '🛡️',
      title: 'Advanced Risk Management',
      description: 'Sophisticated risk controls and portfolio protection mechanisms to safeguard your investments.',
      stats: '99.9% Uptime',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'from-purple-500/10 to-indigo-600/10',
      borderColor: 'border-purple-500/30',
      glowColor: 'shadow-purple-500/25'
    },
    {
      id: 4,
      icon: '📊',
      title: 'Real-Time Analytics',
      description: 'Comprehensive market analysis with live charts, indicators, and predictive insights.',
      stats: '50+ Indicators',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-500/10 to-red-600/10',
      borderColor: 'border-orange-500/30',
      glowColor: 'shadow-orange-500/25'
    },
    {
      id: 5,
      icon: '🌐',
      title: 'Global Markets Access',
      description: 'Trade across 180+ countries with access to stocks, forex, crypto, and commodities.',
      stats: '180+ Markets',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-500/10 to-rose-600/10',
      borderColor: 'border-pink-500/30',
      glowColor: 'shadow-pink-500/25'
    },
    {
      id: 6,
      icon: '🔒',
      title: 'Bank-Grade Security',
      description: 'Military-grade encryption and multi-layer security protocols protect your assets 24/7.',
      stats: '256-bit Encryption',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-500/10 to-emerald-600/10',
      borderColor: 'border-green-500/30',
      glowColor: 'shadow-green-500/25'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.dataset.cardId);
            setVisibleCards(prev => new Set([...prev, cardId]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-card-id]');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-500/15 to-indigo-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
            <span className="text-sm font-medium text-emerald-400">✨ Advanced Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-emerald-400 bg-clip-text text-transparent">
              Powerful Tools for
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Smart Trading
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of trading with our cutting-edge platform designed for 
            <span className="text-cyan-400 font-semibold"> professional traders</span> and 
            <span className="text-emerald-400 font-semibold"> ambitious beginners</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              data-card-id={feature.id}
              className={`group relative transform transition-all duration-700 ${
                visibleCards.has(feature.id) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container */}
              <div className={`relative h-full p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500 ${feature.borderColor} ${
                hoveredCard === feature.id 
                  ? `bg-gradient-to-br ${feature.bgColor} shadow-2xl ${feature.glowColor} scale-105 -translate-y-2` 
                  : 'bg-slate-900/50 shadow-xl'
              }`}>
                
                {/* Animated Background */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 transform transition-transform duration-500 ${
                  hoveredCard === feature.id ? 'scale-110 rotate-6' : ''
                }`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-relaxed mb-6 group-hover:text-slate-200 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Stats Badge */}
                  <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${feature.color} bg-opacity-20 border ${feature.borderColor}`}>
                    <span className="text-sm font-semibold text-white">{feature.stats}</span>
                  </div>
                </div>

                {/* Hover Effects */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className={`absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000`}></div>
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-3xl rounded-tr-3xl`}></div>
              </div>

              {/* Floating Elements */}
              {hoveredCard === feature.id && (
                <>
                  <div className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r ${feature.color} rounded-full animate-ping`}></div>
                  <div className={`absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r ${feature.color} rounded-full animate-pulse`}></div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-2xl shadow-cyan-500/25">
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Explore All Features</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>

            <button className="px-8 py-4 bg-slate-800/50 backdrop-blur-xl border border-cyan-500/30 text-cyan-400 font-semibold text-lg rounded-2xl hover:bg-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>Watch Demo</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="rgb(6, 182, 212)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M0,200 Q400,50 800,150 T1600,100"
          stroke="url(#lineGradient2)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M0,600 Q600,400 1200,500 T2400,450"
          stroke="url(#lineGradient2)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </svg>
    </section>
  );
};

export default Features;