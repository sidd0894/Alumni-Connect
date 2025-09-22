import { Home, Users, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

interface NavBarDemoProps {
  onLoginClick?: () => void
  onSignupClick?: () => void
}

export function NavBarDemo({ onLoginClick, onSignupClick }: NavBarDemoProps) {
  const navItems = [
    { 
      name: 'Home', 
      url: '#', 
      icon: Home,
      onClick: () => console.log('Home clicked')
    },
    { 
      name: 'Alumni', 
      url: '/alumni.html', 
      icon: Users,
      onClick: () => window.open('/alumni.html', '_blank')
    },
    { 
      name: 'Dashboard', 
      url: '/dashboard.html', 
      icon: Briefcase,
      onClick: () => window.open('/dashboard.html', '_blank')
    },
    { 
      name: 'Profile', 
      url: '#', 
      icon: FileText,
      onClick: () => console.log('Profile clicked')
    }
  ]

  return (
    <div className="w-full flex justify-center mt-6">
      <NavBar 
        items={navItems} 
        onLoginClick={onLoginClick}
        onSignupClick={onSignupClick}
      />
    </div>
  )
}

