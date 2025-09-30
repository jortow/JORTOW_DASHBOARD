import React, { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { useAuth } from '../../contexts/AuthContext'

// Define UserRole locally
type UserRole = 'basic' | 'pro' | 'exclusive'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'signin' | 'signup'
  selectedPlan?: UserRole
}

export function AuthModal({ isOpen, onClose, mode, selectedPlan }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentMode, setCurrentMode] = useState(mode)

  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (currentMode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          return
        }
        
        const role = selectedPlan || 'basic'
        const { error } = await signUp(email, password, role)
        
        if (error) {
          setError(error.message)
        } else {
          onClose()
          // Show success message or redirect
        }
      } else {
        const { error } = await signIn(email, password)
        
        if (error) {
          setError(error.message)
        } else {
          onClose()
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setError('')
  }

  const switchMode = (newMode: 'signin' | 'signup') => {
    setCurrentMode(newMode)
    resetForm()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={currentMode === 'signup' ? 'Create Account' : 'Sign In'}
      className="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {selectedPlan && currentMode === 'signup' && (
          <div className="bg-primary-50 border border-primary-200 rounded-md p-3 mb-4">
            <p className="text-sm text-primary-700">
              Creating account for <span className="font-semibold capitalize">{selectedPlan}</span> plan
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {currentMode === 'signup' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Loading...' : (currentMode === 'signup' ? 'Create Account' : 'Sign In')}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => switchMode(currentMode === 'signup' ? 'signin' : 'signup')}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            {currentMode === 'signup' 
              ? 'Already have an account? Sign in' 
              : "Don't have an account? Sign up"
            }
          </button>
        </div>

        {currentMode === 'signin' && (
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Forgot your password?
            </button>
          </div>
        )}
      </form>
    </Modal>
  )
}