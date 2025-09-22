import React from "react"

interface NavBarProps {
  items: Array<{ name: string, url: string, icon: any, onClick?: () => void }>
  onLoginClick?: () => void
  onSignupClick?: () => void
}

export function NavBar({ items, onLoginClick, onSignupClick }: NavBarProps) {
	return (
		<nav
			className="relative z-20 bg-black border-white border-[1.5px] rounded-full shadow-lg px-4 py-2 flex items-center justify-between w-full max-w-4xl mx-auto gap-x-2"
			style={{ boxShadow: '0 2px 16px 0 rgba(255,255,255,0.08)' }}
		>
			{/* Left side - Navigation items */}
			<div className="flex items-center gap-x-2">
				{items.map((item) => (
					<button
						key={item.name}
						onClick={item.onClick}
						className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 transition-colors duration-200 text-white font-medium focus:outline-none min-w-0"
					>
						<item.icon className="w-5 h-5" />
						<span className="hidden sm:inline">{item.name}</span>
					</button>
				))}
			</div>

			{/* Right side - Login and Signup buttons */}
			<div className="flex items-center gap-2">
				<button
					onClick={onLoginClick}
					className="px-4 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
				>
					Login
				</button>
				<button
					onClick={onSignupClick}
					className="px-4 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
				>
					Sign Up
				</button>
			</div>
		</nav>
	)
}
