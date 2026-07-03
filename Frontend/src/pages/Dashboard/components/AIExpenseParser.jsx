import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIExpenseParser = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch("http://localhost:3000/user/expenseParser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt }),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Failed to parse the expense. Please try again.");
      }

      const result = await response.json();

      if (result) {
        alert('Transaction Added successfully.');
      }
      setPrompt('');
      navigate('/dashboard/transactions')
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#131523] rounded-2xl border border-slate-800/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex flex-col gap-3.5 text-left">
      <div className="space-y-1">
        <h3 className="text-sm font-extrabold text-white font-display flex items-center gap-1.5">
          <Sparkles className="size-4 text-indigo-400" />
          <span>AI Smart Expense Parser</span>
        </h3>
        <p className="text-[0.62rem] uppercase tracking-wider text-slate-400 font-mono font-bold mt-0.5">
          Type your expense naturally, our LLM engine will map it to your ledger automatically.
        </p>
      </div>

      <div className="space-y-3">
        {error && (
          <p className="rounded-xl bg-rose-500/10 border border-rose-500/20 px-3 py-2 text-xs font-semibold text-rose-450">
            {error}
          </p>
        )}

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Spent 500 rupees on dinner with friends tonight..."
          className="w-full min-h-24 px-3.5 py-2.5 rounded-xl border border-slate-800 bg-[#0c0e17] focus:border-indigo-500/50 focus:outline-none resize-none text-xs font-medium text-white placeholder-slate-500"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading || !prompt.trim()}
            className="inline-flex items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 bg-indigo-650 text-white border border-indigo-500/40 hover:bg-indigo-600 hover:border-indigo-500 h-9.5 px-4.5 gap-1.5 shadow-sm shadow-indigo-600/10"
          >
            <Sparkles className="size-3.5" />
            <span>{loading ? 'Tracking expense...' : 'Track Expense with AI'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIExpenseParser;