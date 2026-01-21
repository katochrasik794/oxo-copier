import React, { useState, useEffect, useRef } from 'react';

const Analytics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);
  const [chartData, setChartData] = useState([]);
  const sectionRef = useRef(null);

  const metrics = [
    {
      id: 1,
      title: 'Portfolio Value',
      value: '$124,567.89',
      change: '+$2,456.78',
      percentage: '+2.01%',
      trend: 'up',
      icon: '💰',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-500/10 to-teal-600/10',
      borderColor: 'border-emerald-500/30'
    },
    {
      id: 2,
      title: "Today's P&L",
      value: '+$2,456.78',
      change: '+$456.78',
      percentage: '+1.89%',
      trend: 'up',
      icon: '📈',
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'from-cyan-500/10 to-blue-600/10',
      borderColor: 'border-cyan-500/30'
    },
    {
      id: 3,
      title: 'Active Positions',
      value: '24',
      change: '+3',
      percentage: '+14.3%',
      trend: 'up',
      icon: '⚡',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'from-purple-500/10 to-indigo-600/10',
      borderColor: 'border-purple-500/30'
    },
    {
      id: 4,
      title: 'Win Rate',
      value: '78.5%',
      change: '+2.1%',
      percentage: '+2.75%',
      trend: 'up',
      icon: '🎯',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-500/10 to-red-600/10',
      borderColor: 'border-orange-500/30'
    }
  ];

  const riskMetrics = [
    { label: 'Risk Analysis', value: 'Low Risk', score: '3.3/10', color: 'text-emerald-400' },
    { label: 'Portfolio Risk Score', value: '3.3/10', score: 'Conservative', color: 'text-emerald-400' },
    { label: 'Avg. Return', value: '14.2%', score: 'Monthly average return', color: 'text-cyan-400' },
    { label: 'Quick Links', value: 'Features', score: 'Pricing', color: 'text-purple-400' }
  ];

  const quickActions = [
    { icon: '🔍', label: 'AI Reference', action: 'Analyze' },
    { icon: '📊', label: 'Reports', action: 'Generate' },
    { icon: '💬', label: 'Connect', action: 'Chat' },
    { icon: '🛠️', label: 'Support', action: 'Help' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Generate chart data
    const data = Array.from({ length: 30 }, (_, i) => ({
      x: i,
      y: Math.sin(i * 0.2) * 20 + 50 + Math.random() * 10
    }));
    setChartData(data);

    // Auto-cycle through metrics
    const interval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % metrics.length);
    }, 3000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 sm:mr-3 animate-pulse"></span>
            <span className="text-xs sm:text-sm font-medium text-emerald-400">📊 Advanced Analytics</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-emerald-400 bg-clip-text text-transparent">
              Real-Time
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Market Intelligence
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed px-4">
            Harness the power of <span className="text-cyan-400 font-semibold">advanced analytics</span> and 
            <span className="text-emerald-400 font-semibold"> AI-driven insights</span> to make informed trading decisions
          </p>
        </div>

        {/* Main Analytics Dashboard */}
        <div className={`grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16 lg:mb-20 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } transition-all duration-1000`}>
          
          {/* Performance Dashboard - Takes 2 columns on xl screens */}
          <div className="xl:col-span-2 space-y-6 sm:space-y-8">
            {/* Dashboard Header */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-cyan-500/20 p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">Performance Dashboard</h3>
                  <p className="text-slate-400 text-sm sm:text-base">Real-time portfolio analytics and insights</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-emerald-400 font-medium">Live Data</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {metrics.map((metric, index) => (
                  <div 
                    key={metric.id}
                    className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border backdrop-blur-xl transition-all duration-500 hover:scale-105 ${
                      activeMetric === index 
                        ? `bg-gradient-to-br ${metric.bgColor} ${metric.borderColor} shadow-2xl shadow-emerald-500/10` 
                        : 'bg-slate-800/30 border-slate-700/30 hover:border-slate-600/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-lg sm:text-xl`}>
                        {metric.icon}
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                        metric.trend === 'up' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        <svg className={`w-3 h-3 ${metric.trend === 'up' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                        <span>{metric.percentage}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs sm:text-sm text-slate-400 mb-1 sm:mb-2">{metric.title}</h4>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">{metric.value}</p>
                      <p className="text-xs sm:text-sm text-emerald-400">{metric.change}</p>
                    </div>

                    {/* Hover Effect */}
                    <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${metric.color} opacity-0 hover:opacity-5 transition-opacity duration-300`}></div>
                  </div>
                ))}
              </div>

              {/* Chart Section */}
              <div className="relative bg-slate-800/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/30">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                  <h4 className="text-base sm:text-lg font-semibold text-white">Portfolio Performance</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-400 text-sm sm:text-base font-medium">+24.7%</span>
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </div>
                </div>
                
                {/* Enhanced Chart */}
                <div className="relative h-48 sm:h-56 lg:h-64">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0.1" />
                      </linearGradient>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(16, 185, 129)" />
                        <stop offset="50%" stopColor="rgb(6, 182, 212)" />
                        <stop offset="100%" stopColor="rgb(59, 130, 246)" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid Lines */}
                    {[0, 1, 2, 3, 4].map(i => (
                      <line key={i} x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="rgb(71, 85, 105)" strokeWidth="0.5" opacity="0.3" />
                    ))}
                    
                    {/* Chart Area */}
                    <path
                      d="M0,160 Q100,40 200,80 T400,60 L400,200 L0,200 Z"
                      fill="url(#chartGradient)"
                    />
                    
                    {/* Chart Line */}
                    <path
                      d="M0,160 Q100,40 200,80 T400,60"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                    
                    {/* Data Points */}
                    {[0, 100, 200, 300, 400].map((x, i) => (
                      <circle
                        key={i}
                        cx={x}
                        cy={[160, 40, 80, 50, 60][i]}
                        r="4"
                        fill="rgb(6, 182, 212)"
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel - Risk Analysis & Quick Actions */}
          <div className="space-y-6 sm:space-y-8">
            {/* Risk Analysis */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-purple-500/20 p-4 sm:p-6 lg:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-lg sm:text-xl">
                  🛡️
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Risk Analysis</h3>
                  <p className="text-xs sm:text-sm text-slate-400">Portfolio risk assessment</p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {riskMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300">
                    <div>
                      <p className="text-xs sm:text-sm text-slate-400 mb-1">{metric.label}</p>
                      <p className={`text-sm sm:text-base font-semibold ${metric.color}`}>{metric.value}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">{metric.score}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-cyan-500/20 p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Quick Links</h3>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="group p-3 sm:p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-cyan-500/50 hover:bg-slate-700/30 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-center">
                      <div className="text-lg sm:text-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {action.icon}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 font-medium mb-1">{action.label}</p>
                      <p className="text-xs text-cyan-400">{action.action}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-2xl shadow-cyan-500/25">
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>View Full Analytics</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>

            <button className="px-6 py-3 sm:px-8 sm:py-4 bg-slate-800/50 backdrop-blur-xl border border-cyan-500/30 text-cyan-400 font-semibold text-base sm:text-lg rounded-xl sm:rounded-2xl hover:bg-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>Demo Analytics</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Animated Background Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="rgb(6, 182, 212)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M0,100 Q200,50 400,100 T800,80"
          stroke="url(#lineGradient3)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M0,300 Q300,200 600,250 T1200,230"
          stroke="url(#lineGradient3)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </svg>
    </section>
  );
};

export default Analytics;