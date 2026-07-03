import React from 'react'
import { Bot, Cpu, MessageSquareText, ShieldAlert, Send } from 'lucide-react'

const Aiadvisor = () => {
  const messages = [
    'Your dining spend is 18% above last month.',
    'Set a weekly cap of 2,400 to stay balanced.',
    'Savings room detected in subscription logs.',
  ]

  const indicators = [
    { title: 'Live Stream', desc: 'Asynchronous updates', icon: Cpu },
    { title: 'Plain English', desc: 'No complex tables', icon: MessageSquareText },
    { title: 'Budget Nudges', desc: 'Smart threshold alerts', icon: ShieldAlert }
  ]

  return (
    <section id="ai-advisor" className="scroll-mt-20 bg-transparent py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/50 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-[10%] left-[-15%] h-[25rem] w-[25rem] rounded-full bg-indigo-500/[0.01] blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Description & Feature Grid */}
          <div className="lg:col-span-6 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-450">
              AI-POWERED ASSISTANT
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Guidance that feels <span className="bg-gradient-to-r from-slate-900 to-indigo-650 bg-clip-text text-transparent font-black">immediate and practical.</span>
            </h2>
            <p className="mt-3 max-w-lg text-xs sm:text-[0.78rem] leading-relaxed text-slate-500">
              The advisor parses your transaction logs to deliver key wealth recommendations in plain language. Stay ahead of category caps and find savings rooms instantly.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {indicators.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="rounded-xl border border-slate-200/60 bg-slate-50 p-3.5 shadow-sm">
                    <Icon className="size-4 text-indigo-600 mb-2" />
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">{item.title}</h4>
                    <p className="text-[0.58rem] text-slate-450 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: High Fidelity Chat Console */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200/80 bg-white/60 backdrop-blur-xl p-4 shadow-md relative text-left">
              
              {/* Advisor Info Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-sm">
                    <Bot className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">WelWiser Advisor</h3>
                    <p className="text-[0.52rem] text-slate-400 font-mono mt-0.5">Real-time Stream Engine</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-indigo-55 border border-indigo-100/60 px-2 py-0.5 text-[0.52rem] text-indigo-600 font-mono font-bold">
                  <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </div>
              </div>

              {/* Chat bubble list */}
              <div className="space-y-2 mb-3 min-h-[130px] flex flex-col justify-end">
                {messages.map((message, i) => (
                  <div 
                    key={i} 
                    className="max-w-[90%] rounded-xl border border-slate-200/60 bg-slate-100/50 px-3.5 py-2 text-[0.68rem] text-slate-700 leading-relaxed shadow-sm"
                  >
                    {message}
                  </div>
                ))}
              </div>

              {/* Message Input block */}
              <div className="flex h-9.5 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-3 transition focus-within:border-indigo-500/40">
                <input
                  className="h-full min-w-0 flex-1 bg-transparent text-[0.68rem] text-slate-800 outline-none placeholder:text-slate-400 font-medium font-mono"
                  type="text"
                  placeholder="Ask about this month's budget..."
                  disabled
                />
                <button className="grid size-6.5 place-items-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shrink-0 shadow-[0_2px_8px_rgba(99,102,241,0.2)]">
                  <Send className="size-2.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Aiadvisor
