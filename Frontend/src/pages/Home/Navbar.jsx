import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChartNoAxesCombined, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const isHome = pathname === '/'
  const navItems = [
    { label: 'Features', route: '/features', hash: '#features' },
    { label: 'AI Advisor', route: '/ai-advisor', hash: '#ai-advisor' },
    { label: 'Analytics', route: '/insights', hash: '#analytics' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-[#faf9f5]/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
          <span className="grid size-9 place-items-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-sm">
            <ChartNoAxesCombined className="size-4.5" strokeWidth={2} />
          </span>
          <span className="leading-none">
            <span className="block text-lg font-black tracking-tight text-slate-900 font-display">
             WelWiser
            </span>
            <span className="mt-0.5 block text-[0.58rem] font-bold uppercase tracking-[0.2em] text-slate-450">
              Wealth Clarity
            </span>
          </span>
        </NavLink>

        {/* Navigation Tabs */}
        <div className="hidden items-center gap-1 rounded-full border border-slate-200/50 bg-slate-100/70 p-1 md:flex">
          {navItems.map((item) => {
            const isActive = isHome ? hash === item.hash : pathname === item.route
            return (
              <Link
                key={item.route}
                to={isHome ? `/${item.hash}` : item.route}
                className={`rounded-full px-4.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 border ${
                  isActive
                    ? 'bg-white text-indigo-600 border-slate-200/80 shadow-sm'
                    : 'text-slate-500 border-transparent hover:text-slate-950'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Auth Actions */}
        <div className="hidden items-center gap-5 md:flex">
          <NavLink
            to="/login"
            className="text-xs font-bold text-slate-500 hover:text-slate-950 transition duration-200"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/register"
            className="rounded-full bg-indigo-600 text-white border border-indigo-500 hover:bg-indigo-700 hover:border-indigo-600 px-5 py-2.5 text-xs font-bold tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.15)]"
          >
            Get Started
          </NavLink>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-all md:hidden shadow-sm"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="border-t border-slate-200/50 bg-[#faf9f5]/95 backdrop-blur-2xl px-4 py-5 shadow-2xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.route}
                to={isHome ? `/${item.hash}` : item.route}
                onClick={() => setIsOpen(false)}
                className={`rounded-xl px-4 py-3.5 text-sm font-semibold transition-all ${
                  (isHome ? hash === item.hash : pathname === item.route)
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="mt-4 grid grid-cols-2 gap-3 pt-4 border-t border-slate-200/50">
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-3.5 text-center text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-55 transition"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-indigo-600 px-4 py-3.5 text-center text-xs font-bold text-white hover:bg-indigo-700 transition"
              >
                Get Started
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
