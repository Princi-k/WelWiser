import React from 'react'

const Insights = () => {
  const stats = [
    { label: 'Income tracked', value: '82%', desc: 'Mapped categories' },
    { label: 'Spend clarity', value: '30d', desc: 'Rolling audit history' },
    { label: 'Trend alerts', value: 'Live', desc: 'Immediate push signals' },
  ]

  const users = [
    { initial: 'JC', name: 'Jane Cooper' },
    { initial: 'RF', name: 'Robert Fox' },
    { initial: 'CW', name: 'Cameron W.' },
  ]

  return (
    <section id="analytics" className="scroll-mt-20 bg-transparent py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/50 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-[10%] right-[-10%] h-[25rem] w-[25rem] rounded-full bg-indigo-500/[0.01] blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Dashboard Widgets inspired by payUp */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* Widget 1: Wallet Balance Card */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-55 to-transparent p-4 text-left flex flex-col justify-between min-h-[130px] shadow-sm">
              <div>
                <span className="text-[0.58rem] uppercase tracking-wider text-indigo-650 font-mono font-bold block">Your Wallet</span>
                <h4 className="text-lg font-black text-slate-800 mt-1">$12,500</h4>
                <p className="text-[0.55rem] text-slate-400 mt-0.5 font-mono">•••• •••• 5678</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[0.52rem] text-slate-500 font-mono">WelWiser Card</span>
                <span className="text-[0.52rem] text-slate-500 font-mono">05/26</span>
              </div>
            </div>

            {/* Widget 2: Select Persons */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-55 to-transparent p-4 text-left flex flex-col justify-between min-h-[130px] shadow-sm">
              <div>
                <span className="text-[0.58rem] uppercase tracking-wider text-slate-500 font-mono font-bold block">Select Persons</span>
                <p className="text-[0.52rem] text-slate-400 mt-0.5">Quick account assignees</p>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                {users.map((u) => (
                  <div key={u.name} className="group relative">
                    <div className="size-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[0.58rem] font-bold text-indigo-600 hover:border-indigo-500 transition-colors cursor-pointer">
                      {u.initial}
                    </div>
                    <span className="absolute bottom-0 right-0 size-1.5 rounded-full bg-emerald-500 border border-[#faf9f5]" />
                  </div>
                ))}
                <div className="size-7 rounded-full bg-white border border-dashed border-slate-350 flex items-center justify-center text-[0.68rem] text-slate-400 hover:text-slate-650 hover:border-slate-450 transition-colors cursor-pointer">
                  +
                </div>
              </div>
            </div>

            {/* Widget 3: February Bar Graph (Wide spanning) */}
            <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-55 to-transparent p-4 text-left shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Monthly Transaction Stats</h4>
                  <p className="text-[0.55rem] text-slate-400 mt-0.5">February Weekly Breakdown</p>
                </div>
                <div className="flex items-center gap-1 bg-indigo-55 border border-indigo-100/60 rounded-lg px-2 py-0.5 text-[0.52rem] text-indigo-600 font-mono font-bold">
                  <span>Weekly</span>
                </div>
              </div>
              
              <div className="flex items-end justify-between gap-2 h-20 pt-1.5">
                {[
                  { label: 'Week 1', height: 'h-8' },
                  { label: 'Week 2', height: 'h-11' },
                  { label: 'Week 3', height: 'h-16' },
                  { label: 'Week 4', height: 'h-6' },
                  { label: 'Week 5', height: 'h-12' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className={`w-full ${bar.height} rounded-t bg-indigo-600/10 hover:bg-indigo-600/30 transition duration-300`} />
                    <span className="text-[0.45rem] text-slate-400 font-mono mt-1">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Text & Metrics */}
          <div className="lg:col-span-6 text-left flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
              LEDGER INSIGHTS
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              See the month clearly without <span className="bg-gradient-to-r from-slate-900 to-indigo-655 bg-clip-text text-transparent font-black">fighting the numbers.</span>
            </h2>
            <p className="mt-3 max-w-lg text-xs sm:text-[0.78rem] leading-relaxed text-slate-505">
              Clean visual graphs and automatic categorizations help you compare accounts, balances, and trends. No complex tables or unreadable spreadsheets.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200/60 bg-slate-50 p-3.5 text-left shadow-sm">
                  <span className="text-[0.58rem] text-slate-400 font-mono font-bold">{item.label}</span>
                  <h4 className="text-lg font-extrabold text-slate-800 mt-1">{item.value}</h4>
                  <p className="text-[0.52rem] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Insights
