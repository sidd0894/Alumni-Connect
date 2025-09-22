import React, { useState, useEffect } from 'react'
import { NavBarDemo } from '../components/ui/navbar-demo'
import { DashboardSideMenu } from '../components/ui/dashboard-side-menu'

function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen)
  }

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Tubelight Navbar */}
      <NavBarDemo />

      {/* Dashboard Content */}
      <main className="relative z-20 flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 
          className={`text-4xl md:text-6xl font-bold text-white mb-8 transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontFamily: 'MedievalSharp, cursive' }}
        >
          Welcome to Dashboard
        </h1>
        <p 
          className={`text-lg md:text-xl text-gray-300 max-w-2xl mb-8 transition-all duration-1000 ease-out delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          This is your alumni connect dashboard. Here you can manage your connections and explore opportunities.
        </p>
        <div 
          className={`flex gap-4 transition-all duration-1000 ease-out delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            className="group px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
            onClick={() => window.open('/alumni.html', '_blank')}
          >
            <span className="relative z-10">Explore Alumni</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button className="group px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20 relative overflow-hidden">
            <span className="relative z-10">My Network</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <span className="absolute inset-0 flex items-center justify-center text-black font-semibold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right">
              My Network
            </span>
          </button>
        </div>
      </main>

      {/* Side Menu */}
      {/* Set isAdmin={true} for college admin, isAdmin={false} for student */}
      <DashboardSideMenu isOpen={isSideMenuOpen} onToggle={toggleSideMenu} isAdmin={false} />
    </div>
  )
}

export default Dashboard
