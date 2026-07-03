import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useAnalytics } from '../../../context/AnalyticsContext';

const CustomCategoryChart = () => {
  const { chartData, loading, error } = useAnalytics();
  const hasData = chartData.length > 0;
  const finalData = hasData ?
    chartData : [{ name: 'No Expenses', value: 100, displayValue: 0, amount: 0, color: '#1e2235' }];

  const CustomLegend = () => (
    <div className="flex flex-col gap-1.5 text-white">
      {finalData.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[0.72rem] font-semibold text-slate-300">{entry.name}</span>
          </div>
          <span className="text-[0.68rem] font-bold font-mono text-white">
            {entry.value}%
          </span>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="bg-[#131523] rounded-2xl border border-slate-800/80 p-5 flex justify-center items-center h-72 shadow-sm">
        <p className="text-xs text-slate-400 font-semibold animate-pulse">Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#131523] rounded-2xl border border-slate-800/80 p-5 flex justify-center items-center h-72 shadow-sm">
        <p className="text-xs font-bold text-rose-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#131523] rounded-2xl border border-slate-800/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] text-left">
      <h3 className="text-sm font-extrabold text-white font-display mb-4">
        Expense Breakdown by Category
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={finalData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={hasData ? 2 : 0}
              dataKey="value"
              strokeWidth={0}
            >
              {finalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1c2e',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                fontSize: '11px',
                color: '#ffffff'
              }}
              itemStyle={{ color: '#ffffff' }}
              formatter={(value, name, props) => [
                `${props.payload.value}%`, 
                props.payload.name
              ]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="w-full sm:w-auto min-w-40 bg-[#0c0e17]/50 border border-slate-800/80 rounded-xl p-3.5 shadow-sm">
          <CustomLegend />
        </div>
      </div>
    </div>
  );
};

export default CustomCategoryChart;
