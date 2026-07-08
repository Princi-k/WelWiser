import React from "react";
import { Sparkles, MessageSquareText, Zap, ChevronRight, Lightbulb, AlertCircle } from "lucide-react";

const EXAMPLES = [
  {
    input: "Spent 500 on dinner with friends tonight",
    parsed: { description: "Dinner with friends", category: "Food", amount: "₹500", date: "Today" },
    color: "emerald",
  },
  {
    input: "Paid 1200 for train tickets to Pune last Friday",
    parsed: { description: "Train tickets to Pune", category: "Travel", amount: "₹1,200", date: "Last Friday" },
    color: "violet",
  },
  {
    input: "Bought wireless keyboard from Amazon for 1299 rupees",
    parsed: { description: "Wireless keyboard – Amazon", category: "Shopping", amount: "₹1,299", date: "Today" },
    color: "sky",
  },
  {
    input: "Netflix subscription 649 yesterday",
    parsed: { description: "Netflix subscription", category: "Others", amount: "₹649", date: "Yesterday" },
    color: "amber",
  },
];

const TIPS = [
  { icon: "💬", tip: "Always include the amount — it's the one field the AI requires." },
  { icon: "📅", tip: 'Use natural dates: "yesterday", "last Monday", "3 days ago" all work.' },
  { icon: "🏷️", tip: "Mention context words like food, cab, shopping — they improve category accuracy." },
  { icon: "🔁", tip: "You can edit the parsed result before saving if anything looks off." },
];

const STEPS = [
  { step: "01", title: "Type naturally", desc: "Write your expense the way you'd text a friend. No special format needed." },
  { step: "02", title: "AI parses it", desc: "Our LLM engine extracts description, category, amount and date automatically." },
  { step: "03", title: "Review & confirm", desc: "Check the parsed fields — edit anything you want, then hit Track." },
  { step: "04", title: "Saved to ledger", desc: "The transaction appears instantly in your Transactions Ledger." },
];

const ParserGuidePage = () => {
  return (
    <div className="space-y-8 max-w-3xl text-left">
      
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-650 to-indigo-850 rounded-3xl p-6 text-white relative overflow-hidden shadow-md shadow-indigo-650/10">
        <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full -translate-y-8 translate-x-8 blur-lg pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-6 -translate-x-6 blur-lg pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="size-8.5 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 shadow-sm">
              <Sparkles className="size-4.5 text-indigo-100" />
            </div>
            <span className="text-indigo-200 text-xs font-bold uppercase tracking-wider font-mono">AI-Powered</span>
          </div>
          <h2 className="text-2xl font-black mb-2 font-display">AI Smart Expense Parser</h2>
          <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed max-w-lg">
            Skip the forms. Just describe your expense in plain English and our AI will extract everything — amount, category, date, and description — automatically.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div>
        <h3 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2 font-display">
          <Zap className="size-4 text-indigo-600" /> 
          <span>How it works</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STEPS.map((s) => (
            <div key={s.step} className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 flex gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <span className="text-xl font-black text-slate-300 leading-none select-none font-mono">{s.step}</span>
              <div>
                <p className="text-xs font-extrabold text-slate-800 mb-1 font-display">{s.title}</p>
                <p className="text-[0.68rem] text-slate-500 leading-relaxed font-semibold">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Examples */}
      <div>
        <h3 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2 font-display">
          <MessageSquareText className="size-4 text-indigo-600" /> 
          <span>Example inputs</span>
        </h3>
        <div className="space-y-4">
          {EXAMPLES.map((ex, i) => {
            return (
              <div key={i} className="bg-white/80 border border-slate-200/80 rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                {/* Input bubble */}
                <div className="flex items-start gap-2.5 mb-3">
                  <div className="size-6 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <span className="text-[0.58rem] font-bold text-slate-450">You</span>
                  </div>
                  <p className="text-xs text-slate-700 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 italic font-medium">
                    "{ex.input}"
                  </p>
                </div>

                {/* Parsed arrow */}
                <div className="flex items-center gap-1.5 mb-2 ml-8">
                  <ChevronRight className="size-3.5 text-slate-400" />
                  <span className="text-[0.58rem] text-slate-500 font-bold uppercase tracking-wider font-mono">Parsed as</span>
                </div>

                {/* Parsed fields */}
                <div className="ml-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {Object.entries(ex.parsed).map(([key, val]) => (
                    <div key={key} className="bg-slate-50 border border-slate-150 rounded-xl px-3 py-1.5 text-left">
                      <p className="text-[0.52rem] text-slate-500 capitalize font-mono font-bold mb-0.5">{key}</p>
                      <p className="text-xs font-bold text-slate-850">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      <div>
        <h3 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2 font-display">
          <Lightbulb className="size-4 text-amber-500" /> 
          <span>Pro tips</span>
        </h3>
        <div className="bg-white/80 border border-slate-200/80 rounded-2xl divide-y divide-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          {TIPS.map((tip, i) => (
            <div key={i} className="flex items-start gap-3.5 px-4.5 py-3.5">
              <span className="text-lg leading-none mt-0.5">{tip.icon}</span>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 flex gap-2.5 shadow-sm">
        <AlertCircle className="size-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed font-semibold">
          The AI parser uses an LLM to interpret your text. Results may occasionally need minor corrections — always review the parsed fields before saving.
        </p>
      </div>
    </div>
  );
}

export default ParserGuidePage;