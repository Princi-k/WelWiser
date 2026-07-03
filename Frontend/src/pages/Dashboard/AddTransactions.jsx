import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, PlusCircle, CheckCircle2 } from "lucide-react";
import { useTransactions } from "../../context/TransactionContext";

const CATEGORIES = ["Food", "Travel", "Shopping", "Medical", "Entertainment", "Others"];

const CATEGORY_STYLES = {
  Food: { ring: "border-emerald-500/30", bg: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
  Travel: { ring: "border-violet-500/30", bg: "bg-violet-500/15 text-violet-400", dot: "bg-violet-400" },
  Shopping: { ring: "border-sky-500/30", bg: "bg-sky-500/15 text-sky-400", dot: "bg-sky-400" },
  Entertainment: { ring: "border-fuchsia-500/30", bg: "bg-fuchsia-500/15 text-fuchsia-400", dot: "bg-fuchsia-400" },
  Medical: { ring: "border-teal-500/30", bg: "bg-teal-500/15 text-teal-400", dot: "bg-teal-400" },
  Others: { ring: "border-amber-500/30", bg: "bg-amber-500/15 text-amber-400", dot: "bg-amber-400" },
};

const QUICK_PICKS = [
  { label: "☕ Coffee", category: "Food", amount: "80" },
  { label: "🍕 Pizza", category: "Food", amount: "450" },
  { label: "🚕 Cab ride", category: "Travel", amount: "200" },
  { label: "🛒 Groceries", category: "Food", amount: "1500" },
  { label: "🎬 Movie ticket", category: "Entertainment", amount: "350" },
  { label: "👕 Clothes", category: "Shopping", amount: "999" },
];

const AddTransactionPage = () => {
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "Food",
    amount: "",
    date: new Date().toISOString().split('T')[0],
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (key, val) => {
    setError("");
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError("Please enter a title."); return; }
    const amt = parseFloat(form.amount);
    if (!form.amount || isNaN(amt) || amt <= 0) { setError("Please enter a valid amount."); return; }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:3000/user/userexpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        credentials: "include",
        body: JSON.stringify({
          title: form.title.trim(),
          category: form.category.toLowerCase(),
          amount: amt,
          dateAndTime: new Date(form.date)
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save transaction.");
      }

      addTransaction({ ...form, amount: -Math.abs(amt) });
      setSuccess(true);

      setTimeout(() => {
        navigate("/dashboard/transactions");
      }, 1400);
    } catch (err) {
      setError(err.message);
    }
  };

  const applyQuick = (pick) => {
    setForm((f) => ({ ...f, title: pick.label, category: pick.category, amount: pick.amount }));
    setError("");
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-80 gap-4 text-center">
        <CheckCircle2 className="size-12 text-emerald-400 animate-bounce" />
        <h3 className="text-lg font-extrabold text-white font-display">Transaction Added!</h3>
        <p className="text-slate-400 font-mono text-[0.62rem] font-bold uppercase tracking-wider animate-pulse">Redirecting to ledger...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-5 text-left">
      {/* Back */}
      <button
        onClick={() => navigate("/dashboard/transactions")}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="size-3.5" /> 
        <span>Back to Ledger</span>
      </button>

      <div>
        <h2 className="text-xl font-extrabold text-white font-display">Add Transaction</h2>
        <p className="text-[0.62rem] uppercase tracking-wider text-slate-400 font-mono font-bold mt-1">Log a new expense to your ledger</p>
      </div>

      {/* Quick picks */}
      <div className="bg-[#131523] rounded-2xl border border-slate-800/80 p-4 space-y-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
        <p className="text-[0.58rem] uppercase tracking-wider text-slate-400 font-mono font-bold">Quick picks</p>
        <div className="grid grid-cols-3 gap-2">
          {QUICK_PICKS.map((pick) => (
            <button
              key={pick.label}
              type="button"
              onClick={() => applyQuick(pick)}
              className="text-xs font-semibold text-slate-200 bg-[#0c0e17] hover:bg-slate-800/40 hover:border-slate-700 border border-slate-800 rounded-xl p-2 text-left transition-colors"
            >
              <span className="block truncate">{pick.label}</span>
              <span className="text-[0.58rem] text-slate-450 font-mono mt-0.5 block">₹{pick.amount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[#131523] rounded-2xl border border-slate-800/80 p-5 space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
        
        {/* title */}
        <div className="space-y-1">
          <label className="text-[0.68rem] font-bold text-slate-400 font-mono uppercase tracking-wider">Title</label>
          <input
            type="text"
            placeholder="e.g. Dinner with friends"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-800 bg-[#0c0e17] text-white rounded-xl focus:outline-none focus:border-indigo-500/50 transition placeholder-slate-500"
          />
        </div>

        {/* Amount */}
        <div className="space-y-1">
          <label className="text-[0.68rem] font-bold text-slate-400 font-mono uppercase tracking-wider">Amount (₹)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
            <input
              type="number"
              min="1"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
              className="w-full pl-7.5 pr-4 py-2 text-xs border border-slate-800 bg-[#0c0e17] text-white rounded-xl focus:outline-none focus:border-indigo-500/50 transition placeholder-slate-500"
            />
          </div>
        </div>

        {/* Date */}
        <div className="space-y-1">
          <label className="text-[0.68rem] font-bold text-slate-400 font-mono uppercase tracking-wider">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-800 bg-[#0c0e17] text-white rounded-xl focus:outline-none focus:border-indigo-500/50 transition"
          />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-[0.68rem] font-bold text-slate-400 font-mono uppercase tracking-wider">Category</label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => {
              const s = CATEGORY_STYLES[cat];
              const active = form.category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => set("category", cat)}
                  className={`flex flex-col items-center gap-1 py-1.5 rounded-xl border text-[0.68rem] font-bold transition-all ${
                    active
                      ? `${s.bg} border ${s.ring} shadow-sm`
                      : "border-slate-800 text-slate-400 bg-[#0c0e17] hover:bg-slate-800/50"
                  }`}
                >
                  <div className={`size-1.5 rounded-full ${s.dot}`} />
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <p className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl border border-indigo-500/40 transition shadow-sm"
        >
          <PlusCircle className="size-3.5" />
          <span>Add to Ledger</span>
        </button>
      </form>
    </div>
  );
}

export default AddTransactionPage;