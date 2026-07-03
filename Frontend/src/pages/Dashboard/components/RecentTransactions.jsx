import React from 'react'
import { useTransactions } from '../../../context/TransactionContext'

const RecentTransactions = () => {
  const { allTransactions } = useTransactions();
  
  // Take top 5 most recent transactions
  const sorted = [...allTransactions]
    .sort((a, b) => new Date(b.dateAndTime) - new Date(a.dateAndTime))
    .slice(0, 5);

  const CATEGORY_STYLES = {
    food: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    travel: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    shopping: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    others: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    bills: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    entertainment: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
    medical: "bg-teal-500/10 text-teal-400 border-teal-500/20"
  };

  return (
    <div className="bg-[#131523] rounded-2xl border border-slate-800/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] text-left">
      <h3 className="text-sm font-extrabold text-white font-display mb-4">
        Recent Transactions Overview
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-2.5 px-3 text-[0.62rem] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Date
              </th>
              <th className="text-left py-2.5 px-3 text-[0.62rem] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Description
              </th>
              <th className="text-left py-2.5 px-3 text-[0.62rem] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Category
              </th>
              <th className="text-right py-2.5 px-3 text-[0.62rem] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length > 0 ? (
              sorted.map((t, index) => {
                const cat = (t.category || "others").toLowerCase();
                const style = CATEGORY_STYLES[cat] || "bg-amber-500/10 text-amber-400 border-amber-500/20";
                return (
                  <tr
                    key={t._id || index}
                    className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3 px-3 text-[0.72rem] text-slate-400 font-medium whitespace-nowrap">
                      {t.dateAndTime ? new Date(t.dateAndTime).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}
                    </td>
                    <td className="py-3 px-3 text-[0.72rem] text-slate-250 font-medium">
                      {t.title}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[0.62rem] font-bold transition-colors capitalize ${style}`}
                      >
                        {cat}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[0.72rem] font-bold text-white text-right font-mono whitespace-nowrap">
                      - ₹{parseFloat(t.amount || 0).toLocaleString()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-xs text-slate-500">
                  No transaction records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransactions;
