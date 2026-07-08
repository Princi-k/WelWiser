import React, { useState, useEffect } from "react";
import { Search, Pencil, Trash2, X, Check } from "lucide-react";
import { useTransactions } from "../../context/TransactionContext";
import { useNavigate } from "react-router";

// Styles map directly to lowercase keys returned by MongoDB
const CATEGORY_STYLES = {
  food: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  travel: "bg-violet-50 text-violet-700 border-violet-200/60",
  shopping: "bg-sky-50 text-sky-700 border-sky-200/60",
  others: "bg-amber-50 text-amber-700 border-amber-200/60",
  bills: "bg-rose-50 text-rose-700 border-rose-200/60",
  entertainment: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/60",
  medical: "bg-teal-50 text-teal-700 border-teal-200/60"
};

const CATEGORY_DOT = {
  food: "bg-emerald-500", 
  travel: "bg-violet-500", 
  shopping: "bg-sky-500",
  others: "bg-amber-500", 
  bills: "bg-rose-500", 
  entertainment: "bg-fuchsia-500", 
  medical: "bg-teal-500"
};

const UI_CATEGORIES = ["All", "Food", "Travel", "Bills", "Entertainment", "Shopping", "Medical", "Others"];

function EditRow({ t, onSave, onCancel }) {
  const initialInputDate = t.dateAndTime ? new Date(t.dateAndTime).toISOString().split("T")[0] : "";
  const [form, setForm] = useState({ ...t, dateInput: initialInputDate, amount: Math.abs(t.amount).toString() });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    const parsed = parseFloat(form.amount);
    if (!form.title.trim() || isNaN(parsed)) return;
    onSave({
      ...form,
      category: (form.category || "others").toLowerCase(),
      dateAndTime: form.dateInput ? new Date(form.dateInput).toISOString() : new Date().toISOString(),
      amount: Math.abs(parsed)
    });
  };

  return (
    <tr className="bg-slate-50 border-b border-slate-200">
      <td className="py-2.5 px-4">
        <input 
          type="date" 
          value={form.dateInput} 
          onChange={(e) => set("dateInput", e.target.value)} 
          className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-indigo-500/50" 
        />
      </td>
      <td className="py-2.5 px-4">
        <input 
          type="text" 
          value={form.title} 
          onChange={(e) => set("title", e.target.value)} 
          className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-indigo-500/50" 
        />
      </td>
      <td className="py-2.5 px-4">
        <select 
          value={form.category.toLowerCase()} 
          onChange={(e) => set("category", e.target.value)} 
          className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-indigo-500/50 capitalize"
        >
          {UI_CATEGORIES.slice(1).map((c) => <option key={c} value={c.toLowerCase()}>{c}</option>)}
        </select>
      </td>
      <td className="py-2.5 px-4">
        <div className="flex items-center justify-end gap-2">
          <input 
            type="number" 
            value={form.amount} 
            onChange={(e) => set("amount", e.target.value)} 
            className="w-24 text-xs px-2.5 py-1.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-right focus:outline-none focus:border-indigo-500/50" 
          />
          <button 
            onClick={handleSave} 
            className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition shadow-sm"
          >
            <Check className="size-3.5" />
          </button>
          <button 
            onClick={onCancel} 
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-lg transition"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

const TransactionLedger = () => {
  const { 
    paginatedTransactions, 
    allTransactions, 
    pagination, 
    loading, 
    fetchPaginatedExpenses, 
    fetchAllExpensesWithoutLimit, 
    updateTransaction, 
    deleteTransaction 
  } = useTransactions();
  const navigate = useNavigate();
  
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchPaginatedExpenses({ page: currentPage, limit: 10, search, category: activeTab });
  }, [currentPage, search, activeTab]);

  useEffect(() => {
    fetchAllExpensesWithoutLimit();
  }, []);

  const totalAmountOnPage = paginatedTransactions.reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-5 p-2 text-left">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 font-display">Transactions Ledger</h2>
          <p className="text-[0.62rem] uppercase tracking-wider text-slate-500 font-mono font-bold mt-1">
            Showing {paginatedTransactions.length} of {pagination.totalItems} records
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-2 flex gap-4 shadow-sm">
            {UI_CATEGORIES.slice(1, 5).map((cat) => {
              const count = allTransactions.filter((t) => t.category === cat.toLowerCase()).length;
              return (
                <div key={cat} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${CATEGORY_DOT[cat.toLowerCase()] || "bg-slate-400"}`} />
                  <span className="text-[0.68rem] text-slate-500 font-semibold">{cat}:</span>
                  <span className="text-[0.68rem] font-bold text-slate-800 font-mono">{count}</span>
                </div>
              );
            })}
          </div>
          <button 
            onClick={() => navigate("/dashboard/add-transaction")} 
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold border border-indigo-400/30 rounded-xl hover:bg-indigo-500 transition shadow-sm"
          >
            + Add Transaction
          </button>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-4 flex flex-col lg:flex-row gap-4 items-center shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={search} 
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} 
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500/50 text-slate-800 transition placeholder-slate-450" 
          />
        </div>
        <div className="flex flex-wrap gap-1 bg-slate-50 rounded-xl p-1 border border-slate-200/80 overflow-x-auto w-full lg:w-auto">
          {UI_CATEGORIES.map((cat) => (
            <button 
              key={cat} 
              onClick={() => { setActiveTab(cat); setCurrentPage(1); }} 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === cat 
                  ? "bg-indigo-600 text-white border border-indigo-450/20 shadow-sm" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Delete confirmation banner */}
      {deleteId !== null && (
        <div className="bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3.5 flex items-center justify-between shadow-sm">
          <p className="text-xs text-rose-600 font-bold">
            Delete item: "{paginatedTransactions.find((t) => t._id === deleteId)?.title}"?
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => { deleteTransaction(deleteId); setDeleteId(null); }} 
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition"
            >
              Delete
            </button>
            <button 
              onClick={() => setDeleteId(null)} 
              className="px-3.5 py-1.5 bg-slate-100 border border-slate-200 text-slate-650 text-xs font-bold rounded-lg hover:bg-slate-200 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Table Container */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-150">
                <th className="text-left py-3 px-4 text-[0.62rem] font-bold uppercase tracking-wider text-slate-500 font-mono w-36">Date</th>
                <th className="text-left py-3 px-4 text-[0.62rem] font-bold uppercase tracking-wider text-slate-500 font-mono">Title</th>
                <th className="text-left py-3 px-4 text-[0.62rem] font-bold uppercase tracking-wider text-slate-500 font-mono w-36">Category</th>
                <th className="text-right py-3 px-4 text-[0.62rem] font-bold uppercase tracking-wider text-slate-500 font-mono w-44">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-xs text-slate-450 font-semibold animate-pulse">
                    Loading records...
                  </td>
                </tr>
              ) : paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-xs text-slate-450 font-semibold">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((t) =>
                  editingId === t._id ? (
                    <EditRow 
                      key={t._id} 
                      t={t} 
                      onSave={(updated) => { updateTransaction(updated); setEditingId(null); }} 
                      onCancel={() => setEditingId(null)} 
                    />
                  ) : (
                    <tr key={t._id} className="hover:bg-slate-50/50 transition group border-b border-slate-100 last:border-0">
                      <td className="py-3 px-4 text-[0.72rem] text-slate-500 font-mono whitespace-nowrap">
                        {t.dateAndTime ? new Date(t.dateAndTime).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}
                      </td>
                      <td className="py-3 px-4 text-[0.72rem] font-semibold text-slate-700">{t.title}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[0.62rem] font-bold border capitalize ${CATEGORY_STYLES[t.category.toLowerCase()] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                          {t.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[0.72rem] font-bold text-slate-800 font-mono">₹{Math.abs(t.amount).toLocaleString()}</span>
                          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => { setEditingId(t._id); setDeleteId(null); }} 
                              className="p-1 text-slate-450 hover:text-indigo-600 hover:bg-slate-100 rounded transition"
                            >
                              <Pencil className="size-3.5" />
                            </button>
                            <button 
                              onClick={() => { setDeleteId(t._id); setEditingId(null); }} 
                              className="p-1 text-slate-450 hover:text-rose-600 hover:bg-slate-100 rounded transition"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
            {paginatedTransactions.length > 0 && (
              <tfoot>
                <tr className="bg-slate-50/50 border-t border-slate-150 font-semibold text-slate-600">
                  <td colSpan={2} className="py-3 px-4 text-[0.62rem] font-bold text-slate-500">Page Total Metrics</td>
                  <td className="py-3 px-4 text-[0.62rem] font-bold text-slate-500 font-semibold">Subtotal</td>
                  <td className="py-3 px-4 text-right text-xs font-bold text-slate-800 font-mono">₹{totalAmountOnPage.toLocaleString()}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Pagination controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border border-slate-200/80 bg-white/80 px-4 py-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <p className="text-[0.68rem] text-slate-500 font-bold">
            Page <b className="text-slate-800">{pagination.currentPage}</b> of {pagination.totalPages}
          </p>
          <div className="flex gap-1.5">
            <button 
              disabled={!pagination.hasPrevPage} 
              onClick={() => setCurrentPage((p) => p - 1)} 
              className="px-3 py-1.5 text-[0.68rem] font-bold border border-slate-250 rounded-xl disabled:opacity-40 bg-white text-slate-650 hover:text-slate-900 hover:border-indigo-500/30 transition shadow-sm"
            >
              Previous
            </button>
            <button 
              disabled={!pagination.hasNextPage} 
              onClick={() => setCurrentPage((p) => p + 1)} 
              className="px-3 py-1.5 text-[0.68rem] font-bold border border-slate-250 rounded-xl disabled:opacity-40 bg-white text-slate-650 hover:text-slate-900 hover:border-indigo-500/30 transition shadow-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionLedger;