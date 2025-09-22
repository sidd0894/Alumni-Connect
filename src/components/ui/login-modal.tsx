import React, { useState } from 'react'
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignup: () => void
}

export function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, accept any valid email/password
      console.log('Login successful:', formData)
      alert('Login successful! Welcome back!')
      onClose()
      setFormData({ email: '', password: '' })
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-black border border-gray-800 rounded-2xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8">
          <div className="space-y-6">
            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.email 
                      ? 'border-white focus:ring-white/20' 
                      : 'border-gray-700 focus:ring-white/20 focus:border-white'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-white/80">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.password 
                      ? 'border-white focus:ring-white/20' 
                      : 'border-gray-700 focus:ring-white/20 focus:border-white'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-white/80">{errors.password}</p>
              )}
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Switch to signup */}
            <div className="text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="text-white hover:text-gray-200 transition-colors font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
