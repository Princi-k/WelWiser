import React from 'react'
import { useTransactions } from '../../../context/TransactionContext'

const RecentTransactions = () => {
  const { allTransactions } = useTransactions();
  
  // Take top 5 most recent transactions
  const sorted = [...allTransactions]
    .sort((a, b) => new Date(b.dateAndTime) - new Date(a.dateAndTime))
    .slice(0, 5);

  const CATEGORY_STYLES = {
    food: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    travel: "bg-violet-50 text-violet-700 border-violet-200/60",
    shopping: "bg-sky-50 text-sky-700 border-sky-200/60",
    others: "bg-amber-50 text-amber-700 border-amber-200/60",
    bills: "bg-rose-50 text-rose-700 border-rose-200/60",
    entertainment: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/60",
    medical: "bg-teal-50 text-teal-700 border-teal-200/60"
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] text-left">
      <h3 className="text-sm font-extrabold text-slate-800 font-display mb-4">
        Recent Transactions Overview
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-2.5 px-3 text-[0.62rem] font-bold uppercase tracking-wider text-slate-500 font-mono">
                Date
              </th>
              <th className="text-left py-2.5 px-3 text-[0.62rem] font-bold uppercase tracking-wider text-slate-500 font-mono">
                Description
              </th>
              <th className="text-left py-2.5 px-3 text-[0.62rem] font-bold uppercase tracking-wider text-slate-500 font-mono">
                Category
              </th>
              <th className="text-right py-2.5 px-3 text-[0.62rem] font-bold uppercase tracking-wider text-slate-500 font-mono">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length > 0 ? (
              sorted.map((t, index) => {
                const cat = (t.category || "others").toLowerCase();
                const style = CATEGORY_STYLES[cat] || "bg-amber-50 text-amber-700 border-amber-200/60";
                return (
                  <tr
                    key={t._id || index}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3 px-3 text-[0.72rem] text-slate-500 font-medium whitespace-nowrap">
                      {t.dateAndTime ? new Date(t.dateAndTime).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}
                    </td>
                    <td className="py-3 px-3 text-[0.72rem] text-slate-700 font-semibold">
                      {t.title}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[0.62rem] font-bold transition-colors capitalize ${style}`}
                      >
                        {cat}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[0.72rem] font-bold text-slate-800 text-right font-mono whitespace-nowrap">
                      - ₹{parseFloat(t.amount || 0).toLocaleString()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-xs text-slate-450">
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
