import React, { useState } from 'react'
import { Lock, LogIn, UserRound, ArrowLeft, ChartNoAxesCombined, X } from 'lucide-react'
import { useNavigate, NavLink } from 'react-router-dom'

const Login = ({ isModal }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    detail: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { detail, password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/user/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ detail, password }),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Please enter valid credentials.')
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      localStorage.setItem('email', data.email)
      localStorage.setItem('mobileNo', data.mobileNo || '')
      localStorage.setItem('monthlyIncome', data.monthlyIncome)
      localStorage.setItem('userId', data.userId)
      setFormData({ detail: '', password: '' })
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    navigate('/')
  }

  if (isModal) {
    return (
      <div className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl text-left w-full max-w-md mx-auto">
        {/* Close Button overlay */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-650 hover:bg-slate-50 transition"
          aria-label="Close modal"
        >
          <X className="size-4.5" />
        </button>

        <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-slate-450">
          SECURE ACCESS
        </p>
        <h1 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
          Sign in to FinSight
        </h1>
        <p className="mt-1.5 text-xs text-slate-500 leading-normal">
          Access your automated financial advisor, cards, and categories.
        </p>

        <form onSubmit={submitHandler} className="mt-5 space-y-3.5">
          {error && (
            <p className="rounded-xl bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 text-xs font-medium text-red-650">
              {error}
            </p>
          )}

          {/* Email / Username Input */}
          <label className="block">
            <span className="mb-1 block text-[0.68rem] font-bold text-slate-500">
              Email, username, or phone
            </span>
            <span className="flex h-10 items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-200 px-3 transition focus-within:border-indigo-400/80">
              <UserRound className="size-3.5 text-indigo-600 shrink-0" />
              <input
                className="h-full min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 font-medium font-mono"
                type="text"
                name="detail"
                value={detail}
                onChange={onChange}
                placeholder="Enter your details"
                required
              />
            </span>
          </label>

          {/* Password Input */}
          <label className="block">
            <span className="mb-1 block text-[0.68rem] font-bold text-slate-500">
              Password
            </span>
            <span className="flex h-10 items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-200 px-3 transition focus-within:border-indigo-400/80">
              <Lock className="size-3.5 text-indigo-600 shrink-0" />
              <input
                className="h-full min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 font-medium font-mono"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter password"
                required
              />
            </span>
          </label>

          {/* Submit Button */}
          <button
            className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white border border-indigo-500 hover:bg-indigo-700 hover:border-indigo-600 px-7 py-2.5 text-xs font-bold transition duration-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 shadow-[0_4px_20px_rgba(99,102,241,0.15)]"
            type="submit"
            disabled={loading}
          >
            <LogIn className="size-3.5" />
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Registration Helper Link */}
        <p className="mt-4 text-center text-[0.68rem] text-slate-500">
          New to FinSight?{' '}
          <NavLink to="/register" className="font-bold text-indigo-650 hover:text-indigo-700 transition">
            Create a free account
          </NavLink>
        </p>
      </div>
    )
  }

  // Full Screen Fallback Layout
  return (
    <main className="min-h-screen bg-[#faf9f5] bg-subtle-glow flex flex-col justify-between px-4 py-8 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[50%] -translate-x-[50%] h-[30rem] w-[45rem] rounded-full bg-indigo-55/15 blur-[150px] pointer-events-none" />

      {/* Top Bar Navigation */}
      <div className="relative z-10 mx-auto w-full max-w-5xl flex items-center justify-between">
        <NavLink 
          to="/" 
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-250 hover:bg-indigo-50 text-xs font-bold text-slate-700 hover:text-indigo-650 transition duration-200 shadow-sm"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Home</span>
        </NavLink>
        
        <NavLink to="/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-650 shadow-sm">
            <ChartNoAxesCombined className="size-4" strokeWidth={2} />
          </span>
          <span className="text-base font-black tracking-tight text-slate-900 font-display">
            FinSight
          </span>
        </NavLink>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto w-full max-w-md my-auto">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-7 shadow-xl shadow-indigo-950/5 backdrop-blur-xl text-left">
          
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
            SECURE ACCESS
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
            Sign in to FinSight
          </h1>
          <p className="mt-2 text-xs text-slate-500 leading-normal">
            Access your automated financial advisor, cards, and categories.
          </p>

          <form onSubmit={submitHandler} className="mt-6 space-y-4">
            {error && (
              <p className="rounded-xl bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 text-xs font-medium text-red-650">
                {error}
              </p>
            )}

            {/* Email / Username Input */}
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                Email, username, or phone
              </span>
              <span className="flex h-11 items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-3.5 transition focus-within:border-indigo-400/80">
                <UserRound className="size-4 text-indigo-600 shrink-0" />
                <input
                  className="h-full min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 font-medium font-mono"
                  type="text"
                  name="detail"
                  value={detail}
                  onChange={onChange}
                  placeholder="Enter your details"
                  required
                />
              </span>
            </label>

            {/* Password Input */}
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                Password
              </span>
              <span className="flex h-11 items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-3.5 transition focus-within:border-indigo-400/80">
                <Lock className="size-4 text-indigo-600 shrink-0" />
                <input
                  className="h-full min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 font-medium font-mono"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Enter password"
                  required
                />
              </span>
            </label>

            {/* Submit Button */}
            <button
              className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white border border-indigo-500 hover:bg-indigo-700 hover:border-indigo-600 px-7 py-3 text-xs font-bold transition duration-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 shadow-[0_4px_20px_rgba(99,102,241,0.2)]"
              type="submit"
              disabled={loading}
            >
              <LogIn className="size-4" />
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Registration Helper Link */}
          <p className="mt-5 text-center text-xs text-slate-500">
            New to FinSight?{' '}
            <NavLink to="/register" className="font-bold text-indigo-600 hover:text-indigo-700 transition">
              Create a free account
            </NavLink>
          </p>

        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 text-center text-[0.62rem] text-slate-400 font-mono">
        © FinSight 2026. Secure SSL Encryption Enabled.
      </div>
    </main>
  )
}

export default Login
