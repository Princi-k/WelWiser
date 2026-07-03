import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, Cell,
  PieChart, Pie,
  AreaChart, Area,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useAnalytics } from '../../context/AnalyticsContext';

const MONTH_COLORS = [
  '#5D3B84', // Finsight Purple
  '#7b52ab', // Medium Purple
  '#9c72c9', // Light Purple
  '#0ea5e9', // Sky Blue
  '#0d9488', // Teal
  '#64748b', // Slate Grey
];

const AreaTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const budgetData = payload.find((item) => item.dataKey === "budget");
  const actualData = payload.find((item) => item.dataKey === "amount");
  const year = payload[0]?.payload?.year || 2026; 

  return (
    <div className="bg-[#1a1c2e] border border-slate-800 rounded-xl px-3 py-2 shadow-lg text-left text-xs space-y-1 text-white">
      <p className="text-slate-400 font-mono text-[0.62rem] mb-0.5">{label} {year}</p>
      {budgetData && (
        <p className="text-amber-400 font-bold">
          Budget: ₹{budgetData.value}
        </p>
      )}
      {actualData && (
        <p className="text-indigo-400 font-bold">
          Actual: ₹{actualData.value}
        </p>
      )}
    </div>
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-[#1a1c2e] border border-slate-800 rounded-xl px-3 py-2 shadow-lg text-left text-xs text-white">
      <p className="font-extrabold" style={{ color: d.color }}>{d.name}</p>
      <p className="text-slate-400 font-mono text-[0.62rem] mt-0.5">
        {d.value}% · ₹{d.totalamount}
      </p>
    </div>
  );
};

function StatCard({ label, value, sub, trend }) {
  const Icon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const color = trend === "up" ? "text-emerald-450" : trend === "down" ? "text-rose-450" : "text-slate-450";
  return (
    <div className="bg-[#131523] rounded-2xl border border-slate-800/80 p-4.5 flex flex-col gap-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] text-left">
      <p className="text-[0.62rem] uppercase tracking-wider text-slate-400 font-mono font-bold">{label}</p>
      <p className="text-xl font-extrabold text-white font-display">{value}</p>
      <p className={`text-[0.68rem] font-semibold flex items-center gap-1 mt-0.5 ${color}`}>
        <Icon className="size-3.5" />
        <span>{sub}</span>
      </p>
    </div>
  );
}

const DeepAnalytics = () => {
  const { graphData, chartData, loading, error } = useAnalytics();
  const grandTotal = chartData.length > 0 ? chartData[0].grandTotal : 0;
  const monthlyAverage = graphData.length > 0 ? graphData.avg : 0;
  const dataArray = Array.isArray(graphData) ? graphData : [];

  const lowest = dataArray.length > 0 ? dataArray.reduce((max, current) => 
    (current.amount > max.amount ? current : max), dataArray[0]) : { month: "N/A", amount: 0 };

  const peak = dataArray.length > 0 ? dataArray.reduce((min, current) => 
    (current.amount < min.amount ? min : current), dataArray[0]) : { month: "N/A", amount: 0 };

  const BarTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const { month, year } = payload[0].payload;
    const idx = graphData.findIndex((d) => d.month === label && d.year === year);
    return (
      <div className="bg-[#1a1c2e] border border-slate-800 rounded-xl px-3 py-2 shadow-lg text-left text-xs text-white">
        <p className="text-slate-400 font-mono text-[0.62rem] mb-0.5">{label} {year}</p>
        <p className="font-extrabold" style={{ color: MONTH_COLORS[idx % MONTH_COLORS.length] }}>
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-[#131523] rounded-2xl border border-slate-800/80 p-6 flex justify-center items-center h-80 shadow-sm text-slate-400 font-semibold animate-pulse">
        Loading deep analytics data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#131523] rounded-2xl border border-slate-800/80 p-6 flex justify-center items-center h-80 shadow-sm text-rose-500 font-bold">
        Error loading deep analytics: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left p-2">
      
      {/* Page title */}
      <div>
        <h2 className="text-xl font-extrabold text-white font-display">Deep Analytics</h2>
        <p className="text-[0.62rem] uppercase tracking-wider text-slate-400 font-mono font-bold mt-1">
          6-month financial overview · Jan – Jun 2026
        </p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard label="Total Spend" value={`₹${(grandTotal / 1000).toFixed(1)}k`} sub="Jan – Jun 2026" trend="neutral" />
        <StatCard label="Monthly Avg" value={`₹${(monthlyAverage / 1000).toFixed(1)}k`} sub="Across 6 months" trend="neutral" />
        <StatCard label="Peak Month" value={peak.month} sub={`₹${peak.amount.toLocaleString()}`} trend="up" /> 
        <StatCard label="Lowest Month" value={lowest.month} sub={`₹${lowest.amount.toLocaleString()}`} trend="down" /> 
      </div>

      {/* Budget vs Actual area chart — full width on top */}
      <div className="bg-[#131523] rounded-2xl border border-slate-800/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-extrabold text-white font-display">Budget vs Actual Spend</h3>
          <div className="flex items-center gap-3 text-[0.68rem] text-slate-400 font-mono font-bold">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 bg-amber-450 inline-block rounded" />Budget
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 bg-indigo-500 inline-block rounded" />Actual
            </span>
          </div>
        </div>
        <p className="text-[0.62rem] uppercase tracking-wider text-slate-400 font-mono font-bold mb-4">Monthly budget against real spend</p>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={graphData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="budgetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c5a059" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#c5a059" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5D3B84" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#5D3B84" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2235" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={6} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} width={35} />
            <Tooltip content={<AreaTooltip />} />
            <Area type="monotone" dataKey="budget" stroke="#c5a059" strokeWidth={1.8}
              strokeDasharray="5 4" fill="url(#budgetGrad)" dot={false} />
            <Area type="monotone" dataKey="amount" stroke="#5D3B84" strokeWidth={2.2}
              fill="url(#actualGrad)" dot={{ r: 3, fill: "#5D3B84", strokeWidth: 0 }} activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart + Category donut — side by side below */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        
        {/* Spending bars — wider */}
        <div className="lg:col-span-3 bg-[#131523] rounded-2xl border border-slate-800/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-extrabold text-white font-display">Monthly Spending</h3>
            <div className="flex gap-1">
              {MONTH_COLORS.map((c, i) => (
                <div key={i} className="size-1.5 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <p className="text-[0.62rem] uppercase tracking-wider text-slate-400 font-mono font-bold mb-4">Each bar represents total spend for that month</p>
          <ResponsiveContainer width="100%" height={290}>
            <BarChart data={graphData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2235" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={6} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} width={35} />
              <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)", radius: 6 }} />
              <Bar dataKey="amount" radius={[4, 4, 2, 2]} barSize={20}>
                {graphData.map((_, i) => (
                  <Cell key={i} fill={MONTH_COLORS[i % MONTH_COLORS.length]} fillOpacity={0.95} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category donut — narrower */}
        <div className="lg:col-span-2 bg-[#131523] rounded-2xl border border-slate-800/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-white font-display mb-1">Category Split</h3>
            <p className="text-[0.62rem] uppercase tracking-wider text-slate-400 font-mono font-bold mb-4">Share of total spend by category</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%"
                  innerRadius={48} outerRadius={70}
                  paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {chartData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom legend */}
          <div className="mt-4 space-y-1.5 bg-[#0c0e17]/50 border border-slate-800/80 rounded-xl p-3 shadow-sm text-white">
            {chartData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-[0.68rem] font-semibold text-slate-300">{d.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[0.58rem] text-slate-400 font-mono">₹{d.totalamount}</span>
                  <span className="text-[0.68rem] font-bold text-white font-mono">{d.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default DeepAnalytics;