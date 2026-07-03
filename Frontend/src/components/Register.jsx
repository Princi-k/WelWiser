import React, { useState } from 'react'
import { BadgeDollarSign, Lock, Mail, Phone, User, ArrowLeft, ChartNoAxesCombined, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

const fields = [
  { label: 'Username', name: 'username', type: 'text', placeholder: 'Your username', Icon: User },
  { label: 'Email', name: 'email', type: 'email', placeholder: 'name@example.com', Icon: Mail },
  { label: 'Password', name: 'password', type: 'password', placeholder: 'Minimum 6 characters', Icon: Lock },
  { label: 'Mobile', name: 'mobileNo', type: 'tel', placeholder: 'Optional', Icon: Phone },
  { label: 'Monthly income', name: 'monthlyIncome', type: 'number', placeholder: 'Enter income', Icon: BadgeDollarSign },
]

const Register = ({ isModal }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobileNo: '',
    monthlyIncome: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          mobileNo: formData.mobileNo,
          monthlyIncome: formData.monthlyIncome,
        }),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.')
      }

      navigate('/login')
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
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-650 hover:bg-slate-55 transition"
          aria-label="Close modal"
        >
          <X className="size-4.5" />
        </button>

        <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-slate-450">
          GET STARTED
        </p>
        <h1 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
          Join FinSight today
        </h1>
        <p className="mt-1 text-xs text-slate-500 leading-normal">
          Configure your wealth command profile to automate budgeting.
        </p>

        <form onSubmit={submitHandler} className="mt-4 space-y-3">
          {error && (
            <p className="rounded-xl bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 text-xs font-medium text-red-650">
              {error}
            </p>
          )}

          {/* Render form fields dynamically */}
          {fields.map(({ label, name, type, placeholder, Icon }) => (
            <label key={name} className="block">
              <span className="mb-0.5 block text-[0.68rem] font-bold text-slate-505">
                {label}
              </span>
              <span className="flex h-9.5 items-center gap-2.5 rounded-xl bg-slate-55 border border-slate-200 px-3 transition focus-within:border-indigo-400/80">
                <Icon className="size-3.5 text-indigo-600 shrink-0" />
                <input
                  onChange={onChanges}
                  className="h-full min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 font-medium font-mono"
                  type={type}
                  name={name}
                  value={formData[name]}
                  placeholder={placeholder}
                />
              </span>
            </label>
          ))}

          {/* Submit Button */}
          <button
            className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white border border-indigo-500 hover:bg-indigo-700 hover:border-indigo-600 px-7 py-2.5 text-xs font-bold transition duration-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 shadow-[0_4px_20px_rgba(99,102,241,0.15)]"
            type="submit"
            disabled={loading}
          >
            <span>{loading ? 'Creating account...' : 'Create Account'}</span>
          </button>
        </form>

        {/* Login Helper Link */}
        <p className="mt-4 text-center text-[0.68rem] text-slate-500">
          Already registered?{' '}
          <NavLink to="/login" className="font-bold text-indigo-650 hover:text-indigo-700 transition">
            Sign in
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
          <span className="grid size-8 place-items-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-655 shadow-sm">
            <ChartNoAxesCombined className="size-4 text-white" strokeWidth={2} />
          </span>
          <span className="text-base font-black tracking-tight text-slate-900 font-display">
            FinSight
          </span>
        </NavLink>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto w-full max-w-md my-6">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-7 shadow-xl shadow-indigo-950/5 backdrop-blur-xl text-left">
          
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
            GET STARTED
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
            Join FinSight today
          </h1>
          <p className="mt-2 text-xs text-slate-500 leading-normal">
            Configure your wealth command profile to automate budgeting.
          </p>

          <form onSubmit={submitHandler} className="mt-6 space-y-4">
            {error && (
              <p className="rounded-xl bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 text-xs font-medium text-red-650">
                {error}
              </p>
            )}

            {/* Render form fields dynamically */}
            {fields.map(({ label, name, type, placeholder, Icon }) => (
              <label key={name} className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-550">
                  {label}
                </span>
                <span className="flex h-11 items-center gap-3 rounded-xl bg-slate-55 border border-slate-200 px-3.5 transition focus-within:border-indigo-400/80">
                  <Icon className="size-4 text-indigo-600 shrink-0" />
                  <input
                    onChange={onChanges}
                    className="h-full min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 font-medium font-mono"
                    type={type}
                    name={name}
                    value={formData[name]}
                    placeholder={placeholder}
                  />
                </span>
              </label>
            ))}

            {/* Submit Button */}
            <button
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white border border-indigo-500 hover:bg-indigo-700 hover:border-indigo-600 px-7 py-3 text-xs font-bold transition duration-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 shadow-[0_4px_20px_rgba(99,102,241,0.2)]"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? 'Creating account...' : 'Create Account'}</span>
            </button>
          </form>

          {/* Registration Helper Link */}
          <p className="mt-5 text-center text-xs text-slate-500">
            Already registered?  {' '}
            <NavLink to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 transition">
              Sign in
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

export default Register
