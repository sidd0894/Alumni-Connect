"use client";

import React, { useState, useEffect, useRef } from 'react';

export function Navbar({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <div className="relative w-5 h-5 flex items-center justify-center">
      <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 top-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 left-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 right-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 bottom-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
    </div>
  );

  const navLinksData = [
    { label: 'Manifesto', href: '#1', onClick: () => onNavigate ? onNavigate('manifesto') : window.open('/dashboard.html', '_blank') },
    { label: 'Careers', href: '#2', onClick: () => onNavigate ? onNavigate('careers') : window.open('/dashboard.html', '_blank') },
    { label: 'Discover', href: '#3', onClick: () => onNavigate ? onNavigate('discover') : window.open('/dashboard.html', '_blank') },
  ];

  return (
    <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20
                       flex flex-col items-center
                       pl-6 pr-6 py-3 backdrop-blur-sm
                       ${headerShapeClass}
                       border border-[#333] bg-[#1f1f1f57]
                       w-[calc(100%-2rem)] sm:w-auto
                       transition-[border-radius] duration-300 ease-in-out`}>

      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <div className="flex items-center">
           {logoElement}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
          {navLinksData.map((link) => (
            <NavLink key={link.href} onClick={link.onClick}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          <button className="px-4 py-2 sm:px-3 text-xs sm:text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white hover:text-white transition-all duration-300 w-full sm:w-auto hover:bg-white/10 hover:shadow-lg hover:shadow-white/10">
            LogIn
          </button>
          <div className="relative group w-full sm:w-auto">
            <div className="absolute inset-0 -m-2 rounded-full
                          hidden sm:block
                          bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500
                          opacity-30 filter blur-lg pointer-events-none
                          transition-all duration-500 ease-out
                          group-hover:opacity-80 group-hover:blur-xl group-hover:-m-4 group-hover:scale-110"></div>
            <button className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-white hover:to-gray-200 transition-all duration-300 w-full sm:w-auto hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25">
              Signup
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none" onClick={toggleMenu} aria-label={isOpen ? 'Close Menu' : 'Open Menu'}>
          {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? 'max-h-[1000px] opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinksData.map((link, index) => (
            <button 
              key={link.href} 
              className="text-gray-300 hover:text-white transition-all duration-300 w-full text-center cursor-pointer py-2 px-4 rounded-lg hover:bg-white/5 hover:scale-105" 
              onClick={link.onClick}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-4 w-full">
          <button className="px-4 py-2 text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white hover:text-white transition-all duration-300 w-full hover:bg-white/10 hover:shadow-lg hover:shadow-white/10">
            LogIn
          </button>
          <div className="relative group w-full">
            <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-30 filter blur-lg pointer-events-none transition-all duration-500 ease-out group-hover:opacity-80 group-hover:blur-xl group-hover:-m-4 group-hover:scale-110"></div>
            <button className="relative z-10 px-4 py-2 text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-white hover:to-gray-200 transition-all duration-300 w-full hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25">
              Signup
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Separate NavLink component with proper hover animations
const NavLink = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      className="group relative inline-block overflow-hidden px-3 py-2 text-sm cursor-pointer rounded-lg transition-all duration-200 hover:bg-white/5"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        height: '32px',
        overflow: 'hidden'
      }}
    >
      <div 
        className="flex flex-col transition-transform duration-300 ease-out"
        style={{
          transform: isHovered ? 'translateY(-32px)' : 'translateY(0px)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <span 
          style={{
            color: '#9ca3af',
            height: '32px',
            lineHeight: '32px',
            display: 'block',
            fontWeight: '400'
          }}
        >
          {children}
        </span>
        <span 
          style={{
            color: 'white',
            height: '32px',
            lineHeight: '32px',
            display: 'block',
            fontWeight: '500'
          }}
        >
          {children}
        </span>
      </div>
    </button>
  );
};