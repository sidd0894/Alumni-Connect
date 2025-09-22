import React, { useState } from 'react'
import { X, Mail, Lock, Eye, EyeOff, User, GraduationCap } from 'lucide-react'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    graduationYear: '',
    university: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.graduationYear) {
      newErrors.graduationYear = 'Graduation year is required'
    }

    if (!formData.university.trim()) {
      newErrors.university = 'University is required'
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
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For demo purposes, accept any valid form
      console.log('Signup successful:', formData)
      alert('Account created successfully! Welcome to Alumni Connect!')
      onClose()
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        graduationYear: '',
        university: ''
      })
    } catch (error) {
      console.error('Signup error:', error)
      alert('Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-black border border-gray-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Join Alumni Connect</h2>
          <p className="text-gray-400">Create your account to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8">
          <div className="space-y-4">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.firstName 
                        ? 'border-white focus:ring-white/20' 
                        : 'border-gray-700 focus:ring-white/20 focus:border-white'
                    }`}
                    placeholder="First name"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-white/80">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.lastName 
                        ? 'border-white focus:ring-white/20' 
                        : 'border-gray-700 focus:ring-white/20 focus:border-white'
                    }`}
                    placeholder="Last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-white/80">{errors.lastName}</p>
                )}
              </div>
            </div>

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

            {/* University field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                University
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.university 
                      ? 'border-white focus:ring-white/20' 
                      : 'border-gray-700 focus:ring-white/20 focus:border-white'
                  }`}
                  placeholder="Your university name"
                />
              </div>
              {errors.university && (
                <p className="mt-1 text-sm text-white/80">{errors.university}</p>
              )}
            </div>

            {/* Graduation year */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Graduation Year
              </label>
              <select
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                  errors.graduationYear 
                    ? 'border-white focus:ring-white/20' 
                    : 'border-gray-700 focus:ring-white/20 focus:border-white'
                }`}
              >
                <option value="">Select graduation year</option>
                {Array.from({ length: 20 }, (_, i) => {
                  const year = new Date().getFullYear() - i
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                })}
              </select>
              {errors.graduationYear && (
                <p className="mt-1 text-sm text-white/80">{errors.graduationYear}</p>
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
                  placeholder="Create a password"
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

            {/* Confirm Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.confirmPassword 
                      ? 'border-white focus:ring-white/20' 
                      : 'border-gray-700 focus:ring-white/20 focus:border-white'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-white/80">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Switch to login */}
            <div className="text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-white hover:text-gray-200 transition-colors font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
