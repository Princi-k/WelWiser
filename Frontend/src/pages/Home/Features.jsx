import React from 'react'
import { Sparkles, PieChart, Lock, Smartphone } from 'lucide-react'

const Features = () => {
  return (
    <section id="features" className="scroll-mt-20 bg-transparent pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200/50 relative">
      <div className="mx-auto max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center mb-6">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-slate-400">
            PLATFORM FEATURES
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Four systems working as <span className="bg-gradient-to-r from-slate-900 to-indigo-655 bg-clip-text text-transparent font-black">one financial command layer.</span>
          </h2>
        </div>

        {/* Compact Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* 1. Multi-Format Natural Language Parser (Col-Span 2) */}
          <div className="md:col-span-2 rounded-xl glass-panel p-4 flex flex-col justify-between hover:border-indigo-500/30 hover:shadow-[0_8px_30px_rgba(99,102,241,0.04)] transition duration-300">
            <div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <Sparkles className="size-3.5 text-indigo-600" />
                <h3 className="text-xs font-bold">Natural Language Parser</h3>
              </div>
              <p className="mt-1 text-[0.68rem] text-slate-505 leading-relaxed">
                Instantly parses unstructured statements (spending notes, fragmented text logs) into valid, lowercased MERN-compatible schema payloads using low-temperature system prompts.
              </p>
            </div>

            {/* Visual: Simulated Console */}
            <div className="mt-3 rounded-lg bg-slate-55 border border-slate-200 p-2.5 text-left font-mono text-[0.58rem]">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5 text-[0.52rem] text-slate-400 font-bold">
                <span>unstructured_log_parser.py</span>
                <span>determinism: 0.1</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 bg-slate-100/50 border border-slate-200 rounded px-2.5 py-1 text-slate-655">
                  "team breakfast Bakery Hub 18.40"
                </div>
                <div className="flex-1 bg-indigo-50/20 border border-indigo-100 rounded px-2.5 py-1 text-indigo-900 font-semibold">
                  {`{ "amount": 18.40, "merchant": "Bakery Hub" }`}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Real-Time AI Chat Streaming (Col-Span 1) */}
          <div className="rounded-xl glass-panel p-4 flex flex-col justify-between hover:border-indigo-500/30 hover:shadow-[0_8px_30px_rgba(99,102,241,0.04)] transition duration-300">
            <div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <PieChart className="size-3.5 text-indigo-600" />
                <h3 className="text-xs font-bold">Real-Time AI Streaming</h3>
              </div>
              <p className="mt-1 text-[0.68rem] text-slate-505 leading-relaxed">
                Delivers immediate budgeting advice in plain language via SSE streams and optimized asynchronous execution loops.
              </p>
            </div>

            {/* Visual: Action grid mockup */}
            <div className="mt-3 rounded-lg bg-slate-55 border border-slate-200 p-2.5 text-left font-mono text-[0.58rem]">
              <span className="text-[0.52rem] uppercase tracking-wider text-slate-400 block font-bold">SSE STREAM</span>
              <p className="mt-1 text-slate-750 leading-normal border-l-2 border-indigo-500 pl-1.5">
                "Your dining spend is 18% above last month..."
              </p>
            </div>
          </div>

          {/* 3. Bank-Grade Rate Limiting & Protection (Col-Span 1) */}
          <div className="rounded-xl glass-panel p-4 flex flex-col justify-between hover:border-indigo-500/30 hover:shadow-[0_8px_30px_rgba(99,102,241,0.04)] transition duration-300">
            <div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <Lock className="size-3.5 text-indigo-600" />
                <h3 className="text-xs font-bold">Rate Limiting Protection</h3>
              </div>
              <p className="mt-1 text-[0.68rem] text-slate-505 leading-relaxed">
                Mitigates API token abuse and accidental backend loops with an automated 15-request fallback gate per 15 minutes.
              </p>
            </div>

            {/* Visual: Gate status widget */}
            <div className="mt-3 rounded-lg bg-slate-55 border border-slate-200 p-2 text-left flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[0.52rem] uppercase tracking-wider text-slate-400 block font-mono">REQUEST FALLBACK</span>
                <span className="text-[0.58rem] font-bold text-indigo-650 font-mono mt-0.5 block">3 of 15 requests used</span>
              </div>
              <span className="text-indigo-600 font-bold bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded text-[0.52rem]">SECURE</span>
            </div>
          </div>

          {/* 4. Complete Ecosystem Aggregation (Col-Span 2) */}
          <div className="md:col-span-2 rounded-xl glass-panel p-4 flex flex-col justify-between hover:border-indigo-500/30 hover:shadow-[0_8px_30px_rgba(99,102,241,0.04)] transition duration-300">
            <div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <Smartphone className="size-3.5 text-indigo-600" />
                <h3 className="text-xs font-bold">Ecosystem Aggregation</h3>
              </div>
              <p className="mt-1 text-[0.68rem] text-slate-505 leading-relaxed">
                Queries your historical 30-day ledger context arrays. Synchronized across username, email, and phone logins.
              </p>
            </div>

            {/* Visual: Mini transaction table */}
            <div className="mt-3 rounded-lg bg-slate-55 border border-slate-200 p-2 text-left">
              <div className="flex items-center justify-between text-xs border border-slate-200/50 rounded p-1 bg-white/70">
                <div className="flex items-center gap-1.5">
                  <span className="grid size-4 place-items-center rounded bg-indigo-50 border border-indigo-100 text-[0.45rem] font-bold text-indigo-600">F</span>
                  <span className="text-[0.58rem] font-bold text-slate-800">Gourmet Grill Dinner</span>
                  <span className="text-[0.48rem] text-slate-400">• Food & Dining</span>
                </div>
                <span className="text-[0.58rem] font-mono font-bold text-slate-700">-$45.50</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Features
