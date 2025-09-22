import React, { useState } from 'react'
import { X, Mail, Lock, Eye, EyeOff, User, GraduationCap, Briefcase, MapPin, Calendar } from 'lucide-react'

interface AlumniSignupModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export function AlumniSignupModal({ isOpen, onClose, onSwitchToLogin }: AlumniSignupModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    graduationYear: '',
    university: '',
    degree: '',
    currentJob: '',
    company: '',
    industry: '',
    experience: '',
    location: '',
    linkedinProfile: '',
    bio: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

    if (!formData.degree.trim()) {
      newErrors.degree = 'Degree is required'
    }

    if (!formData.currentJob.trim()) {
      newErrors.currentJob = 'Current job title is required'
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }

    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required'
    }

    if (!formData.experience) {
      newErrors.experience = 'Years of experience is required'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
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
      console.log('Alumni signup successful:', formData)
      alert('Alumni account created successfully! Welcome to Alumni Connect!')
      onClose()
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        graduationYear: '',
        university: '',
        degree: '',
        currentJob: '',
        company: '',
        industry: '',
        experience: '',
        location: '',
        linkedinProfile: '',
        bio: ''
      })
    } catch (error) {
      console.error('Alumni signup error:', error)
      alert('Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Join as Alumni</h2>
          <p className="text-gray-400">Share your experience and mentor the next generation</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                        errors.firstName 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                      }`}
                      placeholder="First name"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                        errors.lastName 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                      }`}
                      placeholder="Last name"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
            </div>

            {/* Education Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    University *
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                        errors.university 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                      }`}
                      placeholder="University name"
                    />
                  </div>
                  {errors.university && (
                    <p className="mt-1 text-sm text-red-400">{errors.university}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Degree *
                  </label>
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.degree 
                        ? 'border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                    placeholder="e.g., B.Tech, MBA"
                  />
                  {errors.degree && (
                    <p className="mt-1 text-sm text-red-400">{errors.degree}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Graduation Year *
                  </label>
                  <select
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                      errors.graduationYear 
                        ? 'border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  >
                    <option value="">Select year</option>
                    {Array.from({ length: 30 }, (_, i) => {
                      const year = new Date().getFullYear() - i
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      )
                    })}
                  </select>
                  {errors.graduationYear && (
                    <p className="mt-1 text-sm text-red-400">{errors.graduationYear}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Job Title *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="currentJob"
                      value={formData.currentJob}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                        errors.currentJob 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                      }`}
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                  {errors.currentJob && (
                    <p className="mt-1 text-sm text-red-400">{errors.currentJob}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.company 
                        ? 'border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                    placeholder="Company name"
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-400">{errors.company}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                      errors.industry 
                        ? 'border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  >
                    <option value="">Select industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Media">Media</option>
                    <option value="Government">Government</option>
                    <option value="Non-profit">Non-profit</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.industry && (
                    <p className="mt-1 text-sm text-red-400">{errors.industry}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                      errors.experience 
                        ? 'border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-3">2-3 years</option>
                    <option value="4-5">4-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-15">11-15 years</option>
                    <option value="16-20">16-20 years</option>
                    <option value="20+">20+ years</option>
                  </select>
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-400">{errors.experience}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.location 
                        ? 'border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                    placeholder="City, Country"
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-400">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
                placeholder="Tell us about yourself, your journey, and how you'd like to help students..."
              />
            </div>

            {/* Password Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Account Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                        errors.password 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
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
                    <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                        errors.confirmPassword 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
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
                    <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? 'Creating Alumni Account...' : 'Create Alumni Account'}
            </button>

            {/* Switch to login */}
            <div className="text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-white hover:text-blue-400 transition-colors font-medium"
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
