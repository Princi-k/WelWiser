import React, { useEffect, useState } from 'react'
import { TrendingUp, Award, ReceiptText, Wallet } from 'lucide-react';

const MetricsCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:3000/user/dashboard-summary", {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
          },
          credentials: "include"
        });
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (err) {
        console.error("Error fetching metrics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const totalSpend = data ? `₹${parseFloat(data.totalSpend30d || 0)}` : "₹0";
  
  const rawCat = data && data.highestCategory ? data.highestCategory.category : "None";
  const highestCategory = rawCat && rawCat !== "None" ? rawCat : "None";
  
  const highestCategoryAmount = data && data.highestCategory && data.highestCategory.category !== "None"
    ? `₹${parseFloat(data.highestCategory.total || 0).toLocaleString()} spent`
    : "No records";
    
  const totalLogs = data ? `${data.totalLogs} Logs` : "0 Logs";
  const remainingBudget = data ? `₹${parseFloat(data.remainingBudget || 0)}` : "₹0";
  const progress = data ? data.progress : 0;

  const metrics = [
    {
      label: 'Total Spend (30d)',
      value: totalSpend,
      subtext: '+4.2% from last month',
      subtextColor: 'text-emerald-450',
      icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-450" />,
    },
    {
      label: 'Highest Category',
      value: highestCategory,
      subtext: highestCategoryAmount,
      subtextColor: 'text-slate-400',
      icon: <Award className="w-3.5 h-3.5 text-indigo-400" />,
    },
    {
      label: 'Total Logs Parsed',
      value: totalLogs,
      subtext: 'All database syncs operational',
      subtextColor: 'text-slate-400',
      icon: <ReceiptText className="w-3.5 h-3.5 text-indigo-400" />,
    },
    {
      label: 'Budget Remaining',
      value: remainingBudget,
      subtext: null,
      progress: progress,
      icon: <Wallet className="w-3.5 h-3.5 text-indigo-400" />,
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i}
            className="bg-[#131523] rounded-2xl border border-slate-800/80 p-5 flex flex-col gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)] text-left animate-pulse"
          >
            <div className="h-2.5 bg-slate-800/40 rounded w-1/3" />
            <div className="h-6 bg-slate-800/40 rounded w-2/3" />
            <div className="h-3 bg-slate-800/40 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
      {metrics.map((item, index) => (
        <div 
          key={index}
          className="bg-[#131523] rounded-2xl border border-slate-800/80 p-5 flex flex-col gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.15)] text-left"
        >
          <div className="flex items-center justify-between">
            <p className="text-[0.62rem] uppercase tracking-wider text-slate-400 font-mono font-bold">
              {item.label}
            </p>
            {item.icon}
          </div>
          <p className="text-xl font-extrabold text-white font-display capitalize">
            {item.value}
          </p>

          {item.subtext && ( 
            <p className={`text-[0.68rem] font-semibold flex items-center gap-1 mt-1 ${item.subtextColor}`}>
              <span>{item.subtext}</span>
            </p>
          )}

          {item.progress !== undefined && (
            <div className="space-y-1.5 mt-1">
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-650 h-full rounded-full" style={{ width: `${item.progress}%` }} />
              </div>
              <p className="text-[0.62rem] text-slate-400 font-semibold font-mono">
                {item.progress}% Remaining capacity
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default MetricsCard
