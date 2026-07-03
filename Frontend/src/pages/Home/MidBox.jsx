import React from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowRight, Play, ArrowUpRight, ArrowDownLeft, RefreshCcw } from 'lucide-react'

const MidBox = () => {
  const badgeGuides = [
    { text: 'Deterministic AI parsing' },
    { text: 'Real-time SSE advisor' },
    { text: 'Protected request limits' },
    { text: '30-day ledger context' },
  ]

  const recentTransactions = [
    { name: 'Gourmet Grill', category: 'Food & Dining', amount: '-$45.50', time: '10:42 AM', isExpense: true },
    { name: 'Bakery Hub', category: 'Food & Dining', amount: '-$18.40', time: 'Yesterday', isExpense: true },
  ]

  return (
    <section className="relative overflow-hidden bg-transparent bg-subtle-glow pt-8 pb-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200/50">
      {/* Background soft ambient lights */}
      <div className="absolute top-[-20%] left-[50%] -translate-x-[50%] h-[25rem] w-[40rem] rounded-full bg-indigo-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headings, Badges, CTAs */}
          <div className="lg:col-span-6 text-left flex flex-col justify-center">
            
            {/* Small Brand Tag */}
            <span className="w-fit inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-55 px-3 py-1 text-[0.62rem] text-indigo-600 font-bold uppercase tracking-wider mb-4">
              <span className="size-1.2 rounded-full bg-indigo-500 animate-pulse" />
              Real-time financial intelligence
            </span>

            {/* Main Header */}
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] leading-[1.12] font-display">
              Take control of your <br />
              <span className="bg-gradient-to-r from-slate-900 to-indigo-650 bg-clip-text text-transparent font-black">financial story.</span>
            </h1>

            {/* Subtitle description */}
            <p className="mt-4 max-w-md text-xs sm:text-sm leading-6 text-slate-550">
              FinSight turns messy spending notes, cash logs, and card activity into calm, useful financial insight with a clear dashboard and a real-time AI advisor.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <NavLink
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 text-white border border-indigo-500 hover:bg-indigo-700 hover:border-indigo-600 px-5.5 py-2.5 text-xs font-bold uppercase tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.15)]"
              >
                <span>Get Started for Free</span>
                <ArrowRight className="size-3.5 ml-1.5" />
              </NavLink>
              <NavLink
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5.5 py-2.5 text-xs font-bold uppercase tracking-wide text-slate-705 hover:text-slate-900 hover:bg-slate-50 transition-all duration-300 shadow-sm"
              >
               
                <span>Sign In</span>
              </NavLink>
            </div>

            {/* Monochrome Badges Column */}
            <div className="mt-8 grid grid-cols-2 gap-2.5 max-w-sm">
              {badgeGuides.map((guide, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-[0.68rem] font-semibold text-slate-500"
                >
                  <span className="text-indigo-600">✦</span>
                  <span>{guide.text}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: High Fidelity Mockups inspired by payUp screens */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-indigo-500/[0.01] blur-3xl rounded-full pointer-events-none -z-10" />

            <div className="relative w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Screen Card A: Card, Balance & Activity (Left mock) */}
              <div className="rounded-2xl border border-slate-200/80 bg-white/60 backdrop-blur-xl p-3.5 shadow-md flex flex-col justify-between min-h-[290px]">
                
                {/* User Greeting Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <div>
                    <p className="text-[0.58rem] text-slate-400 font-mono">Welcome back</p>
                    <h3 className="text-[0.68rem] font-bold text-slate-800 mt-0.5">Hello User</h3>
                  </div>
                  <div className="size-6.5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                    <img className="size-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&auto=format&q=80" alt="Profile" />
                  </div>
                </div>

                {/* Mastercard Glassmorphic Widget */}
                <div className="rounded-xl border border-indigo-500 bg-gradient-to-br from-indigo-600 to-indigo-800 p-3 relative overflow-hidden mb-3 shadow-md shadow-indigo-600/5">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.05] rounded-full blur-xl pointer-events-none" />
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[0.52rem] text-indigo-100 font-mono">FinSight Card</p>
                      <h4 className="text-sm font-extrabold text-white mt-1">$12,500</h4>
                    </div>
                    {/* Simplified Mastercard Logo */}
                    <div className="flex -space-x-1">
                      <span className="size-3 rounded-full bg-white/30" />
                      <span className="size-3 rounded-full bg-white/15" />
                    </div>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <span className="text-[0.62rem] text-indigo-200 font-mono tracking-wider font-semibold">•••• •••• 5678</span>
                    <span className="text-[0.52rem] text-indigo-200 font-mono">05/26</span>
                  </div>
                </div>

                {/* Send, Receive, Swap Actions */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: 'Send', icon: ArrowUpRight },
                    { label: 'Receive', icon: ArrowDownLeft },
                    { label: 'Swap', icon: RefreshCcw }
                  ].map((act) => {
                    const Icon = act.icon
                    return (
                      <button key={act.label} className="flex flex-col items-center justify-center rounded-xl bg-indigo-55 border border-indigo-100/60 p-1.5 hover:bg-indigo-100/50 hover:border-indigo-300 transition-all duration-300">
                        <Icon className="size-3 text-indigo-605" />
                        <span className="text-[0.52rem] font-bold text-slate-500 mt-0.5">{act.label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Recent Activity Mini List */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[0.55rem] uppercase tracking-wider text-slate-400 font-mono font-bold">Ledger Feed</span>
                    <span className="text-[0.52rem] text-indigo-600 hover:text-indigo-700 transition cursor-pointer font-bold">See All</span>
                  </div>
                  <div className="space-y-1">
                    {recentTransactions.map((tx) => (
                      <div key={tx.name} className="flex items-center justify-between text-xs border border-slate-200/50 rounded-lg p-1 bg-slate-50/50">
                        <div className="flex items-center gap-1">
                          <span className="grid size-4.5 place-items-center rounded bg-indigo-50 border border-indigo-100 text-[0.5rem] font-black text-indigo-600">F</span>
                          <div className="leading-tight">
                            <p className="text-[0.58rem] font-bold text-slate-800">{tx.name}</p>
                            <p className="text-[0.45rem] text-slate-400">{tx.category}</p>
                          </div>
                        </div>
                        <span className="text-[0.58rem] font-mono font-bold text-slate-700">{tx.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Screen Card B: Chart, Balance & Logs (Right mock) */}
              <div className="rounded-2xl border border-slate-200/80 bg-white/60 backdrop-blur-xl p-3.5 shadow-md flex flex-col justify-between min-h-[290px] sm:mt-4">
                
                {/* Secondary Balance Display */}
                <div>
                  <span className="text-[0.55rem] uppercase tracking-wider text-slate-400 font-mono font-bold">Active Wallet</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <h3 className="text-base font-black text-slate-800">$10,290</h3>
                    <span className="text-[0.55rem] text-emerald-600 font-semibold">+1.8%</span>
                  </div>
                </div>

                {/* Asset Line Graph widget */}
                <div className="h-14 w-full my-3">
                  <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0,35 Q20,25 40,28 T70,12 T100,8" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
                    <path d="M0,35 Q20,25 40,28 T70,12 T100,8 L100,40 L0,40 Z" fill="none" />
                    <circle cx="100" cy="8" r="1.5" fill="#4f46e5" />
                  </svg>
                </div>

                {/* Monthly Bar Widget: February */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-2.5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[0.55rem] text-slate-550 font-bold">February</span>
                    <span className="text-[0.5rem] uppercase tracking-wider bg-indigo-55 border border-indigo-100/60 px-1 py-0.5 rounded text-indigo-650 font-mono font-bold">View</span>
                  </div>
                  
                  {/* Miniature Bar Graph */}
                  <div className="flex items-end justify-between gap-1 h-12 pt-1.5">
                    {[
                      { h: 'h-6' },
                      { h: 'h-8' },
                      { h: 'h-11' },
                      { h: 'h-5' },
                      { h: 'h-9' },
                      { h: 'h-7' }
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div className={`w-full ${bar.h} rounded-t bg-indigo-600/10 hover:bg-indigo-600/40 transition duration-300`} />
                        <span className="text-[0.4rem] text-slate-400 font-mono mt-0.5">w{i+1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System details */}
                <div className="mt-3 flex items-center justify-between text-[0.52rem] text-slate-400 font-mono">
                  <span>SSL SECURE MODULE</span>
                  <span>v1.09</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default MidBox
