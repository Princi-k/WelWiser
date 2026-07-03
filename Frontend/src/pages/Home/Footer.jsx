import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ChartNoAxesCombined } from 'lucide-react'

const GithubSvg = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const TwitterSvg = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const LinkedinSvg = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const Footer = () => {
  const links = [
    { label: 'Features', href: '/#features' },
    { label: 'AI Advisor', href: '/#ai-advisor' },
    { label: 'Analytics', href: '/#analytics' },
    { label: 'Dashboard', href: '/dashboard' },
  ]

  return (
    <footer className="bg-transparent border-t border-slate-200/50 py-5 relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Brand Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
            <NavLink to="/" className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-sm">
                <ChartNoAxesCombined className="size-4" strokeWidth={2} />
              </span>
              <span className="text-sm font-bold tracking-tight text-slate-900 font-display">
                WelWiser
              </span>
            </NavLink>
            <span className="hidden sm:inline text-slate-300">|</span>
            <p className="text-[0.68rem] text-slate-400 font-mono">
              © 2026 WelWiser. All rights reserved.
            </p>
          </div>

          {/* Right: Links & Social Icons */}
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="flex items-center gap-4.5">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-[0.68rem] text-slate-505 hover:text-slate-900 font-semibold transition duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {[
                { icon: GithubSvg, href: '#' },
                { icon: TwitterSvg, href: '#' },
                { icon: LinkedinSvg, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="grid size-7.5 place-items-center rounded-lg border border-slate-205 bg-white text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition duration-300 shadow-sm"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
