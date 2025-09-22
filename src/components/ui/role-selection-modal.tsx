import React from 'react'
import { X, GraduationCap, Users, ArrowRight } from 'lucide-react'

interface RoleSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectStudent: () => void
  onSelectAlumni: () => void
}

export function RoleSelectionModal({ isOpen, onClose, onSelectStudent, onSelectAlumni }: RoleSelectionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Choose Your Role</h2>
          <p className="text-gray-400">Select how you'd like to join Alumni Connect</p>
        </div>

        {/* Role Selection */}
        <div className="px-8 pb-8">
          <div className="space-y-4">
            {/* Student Option */}
            <button
              onClick={onSelectStudent}
              className="w-full p-6 bg-gray-800 border border-gray-600 rounded-xl hover:border-blue-500 hover:bg-gray-700 transition-all duration-200 group text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <GraduationCap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Sign up as Student</h3>
                    <p className="text-sm text-gray-400">Currently studying and looking to connect with alumni</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </div>
            </button>

            {/* Alumni Option */}
            <button
              onClick={onSelectAlumni}
              className="w-full p-6 bg-gray-800 border border-gray-600 rounded-xl hover:border-purple-500 hover:bg-gray-700 transition-all duration-200 group text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Sign up as Alumni</h3>
                    <p className="text-sm text-gray-400">Graduated and ready to mentor current students</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <button
                onClick={onClose}
                className="text-white hover:text-blue-400 transition-colors font-medium"
              >
                Sign in instead
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
