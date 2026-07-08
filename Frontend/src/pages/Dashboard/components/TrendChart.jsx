import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { useAnalytics } from '../../../context/AnalyticsContext';

const MONTH_COLORS = [
  '#5D3B84', // Finsight Purple
  '#7b52ab', // Medium Purple
  '#9c72c9', // Light Purple
  '#0ea5e9', // Sky Blue
  '#0d9488', // Teal
  '#64748b', // Slate Grey
];

const TrendChart = () => {
  const { graphData, loading, error } = useAnalytics();
  const hasData = graphData.length > 0;
  const finalData = hasData ? graphData : [{ year: 0, month: '', amount: 0 }];

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const { month, year } = payload[0].payload;
    const idx = finalData.findIndex((d) => d.month === label && d.year === year);
    return (
      <div
        className="bg-white border border-slate-200/80 rounded-xl px-3 py-2 shadow-md text-left text-slate-800"
        style={{ fontSize: 12 }}
      >
        <p className="text-slate-500 font-mono text-[0.62rem] mb-0.5">{label} {year}</p>
        <p className="font-extrabold" style={{ color: MONTH_COLORS[idx] }}>
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-5 flex justify-center items-center h-72 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-5 flex justify-center items-center h-72 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <p className="text-xs font-bold text-rose-650">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] w-full text-left">
      
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-extrabold text-slate-800 font-display">Monthly Spending Trend</h3>
          <p className="text-[0.62rem] uppercase tracking-wider text-slate-500 font-mono font-bold mt-0.5">Last 6 months overview</p>
        </div>
        <div className="flex gap-1.5">
          {MONTH_COLORS.map((c, i) => (
            <div
              key={i}
              className="size-1.5 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={finalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="month"
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={8}
          />
          <YAxis
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={35}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(93, 59, 132, 0.04)', radius: 8 }} />
          <Bar dataKey="amount" radius={[4, 4, 2, 2]} barSize={20}>
            {finalData.map((_, i) => (
              <Cell key={i} fill={MONTH_COLORS[i % MONTH_COLORS.length]} fillOpacity={0.95} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendChart;