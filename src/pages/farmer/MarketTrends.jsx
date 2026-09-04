import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar
} from 'recharts';
import { TrendingUp, TrendingDown, Minus, CloudRain, Sun } from 'lucide-react';
import { priceTrendData, mandiPrices, demandForecast } from '../../data/mockData';

const crops = [
  { key: 'wheat', label: 'Wheat', color: '#16a34a' },
  { key: 'rice', label: 'Rice', color: '#0ea5e9' },
  { key: 'tomato', label: 'Tomato', color: '#f97316' },
  { key: 'onion', label: 'Onion', color: '#a855f7' },
];

const insights = [
  { icon: TrendingUp, color: 'text-primary-600 bg-primary-50', title: 'Wheat prices up 5%', desc: 'Compared to last month. Good time to sell.' },
  { icon: CloudRain, color: 'text-sky-600 bg-sky-50', title: 'Monsoon impact expected', desc: 'Tomato prices may rise next fortnight.' },
  { icon: Sun, color: 'text-accent-600 bg-accent-50', title: 'Peak demand window', desc: 'Festival season: onion demand up 20%.' },
];

export default function MarketTrends() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Market Trends</h1>
        <p className="text-gray-500 text-sm mt-1">Real-time price analytics and demand forecasts across crops and mandis.</p>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map(({ icon: Icon, color, title, desc }) => (
          <div key={title} className="card flex items-start gap-3 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Multi-crop price trend */}
      <div className="card">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div>
            <h3 className="font-semibold text-gray-900">Multi-Crop Price Trends</h3>
            <p className="text-xs text-gray-400 mt-0.5">Apr – Sep 2026 · ₹/Quintal · APMC Modal Prices</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {crops.map(c => (
              <div key={c.key} className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2.5 py-1 rounded-full">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                {c.label}
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={priceTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={55} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
              formatter={(value) => [`₹${value}`, '']}
            />
            {crops.map(c => (
              <Line
                key={c.key}
                type="monotone"
                dataKey={c.key}
                stroke={c.color}
                strokeWidth={2.5}
                dot={{ fill: c.color, r: 4 }}
                activeDot={{ r: 6 }}
                name={c.label}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Demand Forecast + Mandi Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demand Forecast */}
        <div className="card">
          <div className="mb-5">
            <h3 className="font-semibold text-gray-900">Demand Forecast — Wheat</h3>
            <p className="text-xs text-gray-400 mt-0.5">Expected demand index for next 6 weeks</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={demandForecast}>
              <defs>
                <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[60, 120]} width={40} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
                formatter={(value) => [`${value}%`, 'Demand Index']}
              />
              <Area type="monotone" dataKey="demand" stroke="#f59e0b" strokeWidth={2.5} fill="url(#demandGrad)" name="Demand Index" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 bg-accent-50 border border-accent-200 rounded-xl p-3 text-sm">
            <p className="font-semibold text-accent-700">💡 Sell in W2 Oct</p>
            <p className="text-xs text-accent-600 mt-0.5">Peak demand window detected. Expected prices ₹2,480–₹2,560/Qtl.</p>
          </div>
        </div>

        {/* Today's Mandi Prices */}
        <div className="card overflow-x-auto">
          <h3 className="font-semibold text-gray-900 mb-4">Today's Mandi Prices — Wheat</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 text-xs font-semibold text-gray-500 uppercase">Mandi</th>
                <th className="text-right py-2.5 text-xs font-semibold text-gray-500 uppercase">Modal ₹</th>
                <th className="text-center py-2.5 text-xs font-semibold text-gray-500 uppercase">Dist.</th>
                <th className="text-center py-2.5 text-xs font-semibold text-gray-500 uppercase">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mandiPrices.map((m) => (
                <tr key={m.mandi} className="hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-900 text-sm">{m.mandi}</td>
                  <td className="py-3 text-right font-bold text-gray-900">₹{m.modal}</td>
                  <td className="py-3 text-center text-gray-500 text-xs">{m.distance}</td>
                  <td className="py-3 text-center">
                    {m.trend === 'up' ? <span className="text-xs font-semibold text-primary-600 flex items-center justify-center gap-1"><TrendingUp size={13} /> Up</span> :
                     m.trend === 'down' ? <span className="text-xs font-semibold text-red-500 flex items-center justify-center gap-1"><TrendingDown size={13} /> Down</span> :
                     <span className="text-xs font-semibold text-gray-400 flex items-center justify-center gap-1"><Minus size={13} /> Stable</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-xs text-gray-400 text-center">
            Last updated: Today, 11:30 AM · Source: Agmarknet / e-NAM
          </div>
        </div>
      </div>
    </div>
  );
}
