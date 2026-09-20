import { useState } from 'react'
import { useStore } from '../store/useStore.js'
import { useUI } from '../store/useUI.js'
import { t } from '../lib/i18n.js'
import Icon from './Icon.jsx'
import './LoginAuthSheet.css'

export default function LoginAuthSheet({ close, isRegister = false }) {
  const [tab, setTab] = useState('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { supabaseSignUp, supabaseSignIn } = useStore()
  const toast = useUI(s => s.toast)

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
  const validatePassword = (p) => p.length >= 8

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) {
      setError(t('Invalid email'))
      return
    }

    if (!validatePassword(password)) {
      setError(t('Password must be 8+ characters'))
      return
    }

    if (isRegister) {
      if (!name.trim()) {
        setError(t('Enter your name'))
        return
      }
      if (password !== confirmPwd) {
        setError(t('Passwords do not match'))
        return
      }
    }

    setLoading(true)
    try {
      if (isRegister) {
        await supabaseSignUp(email, password, name)
        toast(t('Welcome to Grit, {0}!', name))
      } else {
        await supabaseSignIn(email, password)
        toast(t('Welcome back'))
      }
      close()
    } catch (err) {
      setError(err.message || t('Authentication failed'))
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    // TODO: Open password reset sheet
    setError(t('Password reset coming soon'))
  }

  return (
    <div className="login-auth-sheet">
      <div className="sheet-header">
        <img src="/grit-isotipo.svg" alt="Grit" className="sheet-logo" />
        <h1>{isRegister ? t('Get Started') : t('Sign In')}</h1>
        <p className="sheet-subtitle">
          {isRegister
            ? t('Join Grit and start your journey')
            : t('Welcome back to your strength')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">{t('Email')}</label>
          <div className="input-wrapper">
            <Icon name="mail" className="input-icon" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder="you@example.com"
              disabled={loading}
              autoComplete="email"
            />
          </div>
        </div>

        {/* Name Field (Register only) */}
        {isRegister && (
          <div className="form-group">
            <label htmlFor="name">{t('Full Name')}</label>
            <div className="input-wrapper">
              <Icon name="person" className="input-icon" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError('')
                }}
                placeholder={t('Your name')}
                disabled={loading}
                autoComplete="name"
              />
            </div>
          </div>
        )}

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">{t('Password')}</label>
          <div className="input-wrapper">
            <Icon name="lock" className="input-icon" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder={isRegister ? t('Min 8 characters') : t('Your password')}
              disabled={loading}
              autoComplete={isRegister ? 'new-password' : 'current-password'}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              aria-label={showPassword ? t('Hide password') : t('Show password')}
            >
              <Icon name={showPassword ? 'eye-off' : 'eye'} />
            </button>
          </div>
          {isRegister && password && (
            <div className="password-strength">
              <div className="strength-bar" data-length={password.length >= 12 ? 'strong' : password.length >= 8 ? 'medium' : 'weak'} />
              <span className="strength-text">
                {password.length < 8 ? t('Too short') : password.length < 12 ? t('Good') : t('Strong')}
              </span>
            </div>
          )}
        </div>

        {/* Confirm Password (Register only) */}
        {isRegister && (
          <div className="form-group">
            <label htmlFor="confirmPwd">{t('Confirm Password')}</label>
            <div className="input-wrapper">
              <Icon name="check" className="input-icon" />
              <input
                id="confirmPwd"
                type={showPassword ? 'text' : 'password'}
                value={confirmPwd}
                onChange={(e) => {
                  setConfirmPwd(e.target.value)
                  setError('')
                }}
                placeholder={t('Confirm password')}
                disabled={loading}
                autoComplete="new-password"
              />
              {confirmPwd && password === confirmPwd && (
                <Icon name="check-circle" className="input-icon success" />
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <Icon name="alert-circle" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-submit"
          disabled={loading || !email || !password || (isRegister && (!name || !confirmPwd))}
        >
          {loading ? (
            <>
              <span className="loader" />
              {t('Loading...')}
            </>
          ) : isRegister ? (
            t('Create Account')
          ) : (
            t('Sign In')
          )}
        </button>

        {/* Forgot Password Link */}
        {!isRegister && (
          <button
            type="button"
            className="btn-forgot"
            onClick={handleForgotPassword}
            disabled={loading}
          >
            {t('Forgot password?')}
          </button>
        )}
      </form>

      <div className="sheet-footer">
        <p className="terms-text">
          {isRegister ? t('By signing up, you agree to our Terms') : t('Secure & encrypted')}
        </p>
      </div>
    </div>
  )
}
