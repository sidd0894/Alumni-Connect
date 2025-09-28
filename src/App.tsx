import { useState, useEffect } from 'react'
import { SplashCursor } from './components/ui/splash-cursor'
import { RainbowButton } from './components/ui/rainbow-button'
import { NavBarDemo } from './components/ui/navbar-demo'
import { LoginModal } from './components/ui/login-modal'
import { SignupModal } from './components/ui/signup-modal'
import { AlumniSignupModal } from './components/ui/alumni-signup-modal'
import { RoleSelectionModal } from './components/ui/role-selection-modal'
import { GlowingCardsDemo } from './components/ui/glowing-cards-demo'
import { StickyFooter } from './components/ui/sticky-footer'
import Dashboard from './pages/Dashboard'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isAlumniSignupModalOpen, setIsAlumniSignupModalOpen] = useState(false)
  const [isRoleSelectionModalOpen, setIsRoleSelectionModalOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('view') === 'dashboard') {
      setCurrentPage('dashboard')
      console.log('Dashboard view requested via URL parameter.')
    }
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const originalTitle = document.title
    if (currentPage === 'dashboard') {
      document.title = 'Dashboard'
    } else {
      document.title = originalTitle
    }
    return () => {
      document.title = originalTitle
    }
  }, [currentPage])

  const handleGetStarted = () => {
    // Add a brief delay for smooth transition
    setTimeout(() => {
      setCurrentPage('dashboard')
    }, 200)
  }

  const handleNavigation = (page: string) => {
    // Add a brief delay for smooth transition
    setTimeout(() => {
      setCurrentPage(page)
    }, 200)
  }

  const handleLoginClick = () => {
    setIsLoginModalOpen(true)
  }

  const handleSignupClick = () => {
    setIsRoleSelectionModalOpen(true)
  }

  const handleCloseModals = () => {
    setIsLoginModalOpen(false)
    setIsSignupModalOpen(false)
    setIsAlumniSignupModalOpen(false)
    setIsRoleSelectionModalOpen(false)
  }

  const handleSwitchToSignup = () => {
    setIsLoginModalOpen(false)
    setIsRoleSelectionModalOpen(true)
  }

  const handleSwitchToLogin = () => {
    setIsSignupModalOpen(false)
    setIsAlumniSignupModalOpen(false)
    setIsRoleSelectionModalOpen(false)
    setIsLoginModalOpen(true)
  }

  const handleSelectStudent = () => {
    setIsRoleSelectionModalOpen(false)
    setIsSignupModalOpen(true)
  }

  const handleSelectAlumni = () => {
    setIsRoleSelectionModalOpen(false)
    setIsAlumniSignupModalOpen(true)
  }

  if (currentPage === 'dashboard') {
    return (
      <div className="animate-fadeIn">
        <Dashboard />
      </div>
    )
  }


  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Tubelight Navbar */}
      <NavBarDemo 
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />
      
      {/* Hero Section with Splash Effect */}
      <main className="relative z-20 flex flex-col items-center justify-center h-screen text-center px-4">
        {/* Splash effect as background - only in hero section */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <SplashCursor />
        </div>
        <div className="relative z-30 flex flex-col items-center justify-center">
          <h1 
            className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ fontFamily: 'MedievalSharp, cursive' }}
          >
            Where Today's Students Meet Tomorrow's Trailblazers.
          </h1>
          <p 
            className={`text-base md:text-lg text-white font-light max-w-2xl mb-8 transition-all duration-1000 ease-out delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            finding alumni now become easy - Alumni connect
          </p>
          <div 
            className={`transition-all duration-1000 ease-out delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <RainbowButton 
              className="text-lg font-semibold relative z-40"
              onClick={handleGetStarted}
            >
              Get Started
            </RainbowButton>
          </div>
        </div>
      </main>

      {/* Glowing Cards Section */}
      <section className="relative z-20 py-16 bg-black">
        <GlowingCardsDemo />
      </section>

      {/* Sticky Footer */}
      <StickyFooter />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseModals}
        onSwitchToSignup={handleSwitchToSignup}
      />
      <RoleSelectionModal
        isOpen={isRoleSelectionModalOpen}
        onClose={handleCloseModals}
        onSelectStudent={handleSelectStudent}
        onSelectAlumni={handleSelectAlumni}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={handleCloseModals}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <AlumniSignupModal
        isOpen={isAlumniSignupModalOpen}
        onClose={handleCloseModals}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  )
}

export default App
