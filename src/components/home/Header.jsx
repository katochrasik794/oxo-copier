import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', href: '/', isRoute: true },
    { id: 'features', label: 'Features', href: '#features', isRoute: false },
    { id: 'analytics', label: 'Analytics', href: '#analytics', isRoute: false },
    { id: 'social', label: 'Social Trading', href: '/social/leaderboard', isRoute: true },
    { id: 'pricing', label: 'Pricing', href: '#pricing', isRoute: false },
    { id: 'contact', label: 'Contact', href: '#contact', isRoute: false }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-strong backdrop-blur-2xl border-b border-cyan-500/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 p-0.5 group-hover:scale-110 transition-all duration-300 glow-intense">
                  <div className="w-full h-full rounded-lg bg-slate-900 flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl lg:text-2xl font-black gradient-text group-hover:scale-105 transition-transform duration-300">
                  Nexa Trader
                </span>
                <span className="text-xs text-cyan-400/70 font-medium tracking-wider hidden sm:block">
                  ELITE TRADING
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => {
                const isActive = link.isRoute 
                  ? location.pathname === link.href || (link.id === 'social' && location.pathname.startsWith('/social'))
                  : activeLink === link.id;
                
                const Component = link.isRoute ? Link : 'a';
                const linkProps = link.isRoute 
                  ? { to: link.href }
                  : { href: link.href, onClick: () => setActiveLink(link.id) };

                return (
                  <Component
                    key={link.id}
                    {...linkProps}
                    className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group hover-lift ${
                      isActive
                        ? 'text-cyan-400 bg-cyan-500/10'
                        : 'text-slate-300 hover:text-cyan-400'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Animated underline */}
                    <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 ${
                      isActive ? 'w-8' : 'w-0 group-hover:w-8'
                    }`}></div>
                    
                    {/* Hover background */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </Component>
                );
              })}
            </div>

            {/* Enhanced CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="px-6 py-2 text-slate-300 hover:text-cyan-400 font-medium transition-colors duration-300 hover-lift">
                Sign In
              </button>
              <button className="relative group px-8 py-3 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 glow-intense">
                <span className="relative z-10">Get Started</span>
                
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                
                {/* Border glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-lg glass-card hover-lift focus:outline-none group"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                  <span className={`block h-0.5 w-6 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}></span>
                  <span className={`block h-0.5 w-6 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}></span>
                  <span className={`block h-0.5 w-6 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}></span>
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </nav>

          {/* Enhanced Animated Border */}
          <div className={`h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transition-opacity duration-500 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}></div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Menu Content */}
        <div className={`absolute top-16 sm:top-20 left-4 right-4 glass-strong rounded-2xl p-4 sm:p-6 transform transition-all duration-500 ${
          isMobileMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-10 scale-95'
        }`}>
          <div className="space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-6 py-4 rounded-xl font-medium transition-all duration-300 hover-lift ${
                  activeLink === link.id
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/5'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="flex items-center justify-between">
                  {link.label}
                  <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            ))}
            
            <div className="pt-4 border-t border-cyan-500/20 space-y-3">
              <button className="w-full px-6 py-3 text-slate-300 hover:text-cyan-400 font-medium transition-colors duration-300 text-left hover-lift">
                Sign In
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 glow">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default Header;