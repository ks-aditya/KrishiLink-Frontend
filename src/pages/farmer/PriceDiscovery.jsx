import { useState } from 'react';
import { Search, MapPin, TrendingUp, TrendingDown, Minus, Sparkles, Truck, Warehouse, ChevronRight, Info } from 'lucide-react';
import { mandiPrices, cropsList } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const qualities = ['Grade A', 'Grade B', 'Premium', 'Standard'];

export default function PriceDiscovery() {
  const [form, setForm] = useState({ crop: 'Wheat', quantity: '', location: 'Lucknow, UP', quality: 'Grade A' });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResults(mandiPrices);
    }, 1200);
  };

  const bestMandi = results ? results[0] : null;

  const barData = results
    ? results.map(m => ({ name: m.mandi.replace(' APMC', '').replace(' Mandi', ''), modal: m.modal, max: m.max }))
    : [];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Price Discovery</h1>
        <p className="text-gray-500 text-sm mt-1">Find the best market price for your crop across nearby mandis.</p>
      </div>

      {/* Search Form */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
          <Search size={18} className="text-primary-600" />
          Search Prices
        </h3>
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Crop</label>
              <select
                value={form.crop}
                onChange={(e) => setForm({ ...form, crop: e.target.value })}
                className="input-field"
              >
                {cropsList.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity (Quintals)</label>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                placeholder="e.g. 80"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="input-field pl-8"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Quality</label>
              <select
                value={form.quality}
                onChange={(e) => setForm({ ...form, quality: e.target.value })}
                className="input-field"
              >
                {qualities.map(q => <option key={q}>{q}</option>)}
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            {loading ? (
              <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Searching mandis...</>
            ) : (
              <><Search size={16} />Find Best Prices</>
            )}
          </button>
        </form>
      </div>

      {results && (
        <>
          {/* Best Recommendation */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={18} className="text-accent-300" />
                  <span className="text-sm font-semibold text-primary-200">AI Recommended Best Option</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{bestMandi.mandi}</h3>
                <p className="text-primary-200 text-sm mb-3">{bestMandi.distance} away · Today's market</p>
                <div className="flex items-center gap-6 flex-wrap">
                  <div>
                    <p className="text-xs text-primary-300">Modal Price</p>
                    <p className="text-3xl font-extrabold text-accent-300">₹{bestMandi.modal.toLocaleString()}</p>
                    <p className="text-xs text-primary-300">per Quintal</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-300">Max Price</p>
                    <p className="text-2xl font-bold">₹{bestMandi.max.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-300">Min Price</p>
                    <p className="text-2xl font-bold">₹{bestMandi.min.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="glass-card px-4 py-2.5 text-sm font-medium flex items-center gap-2">
                  <Truck size={15} className="text-accent-300" /> Transport Available
                </div>
                <div className="glass-card px-4 py-2.5 text-sm font-medium flex items-center gap-2">
                  <Warehouse size={15} className="text-accent-300" /> Cold Storage Nearby
                </div>
                <div className="glass-card px-4 py-2.5 text-sm font-medium flex items-center gap-2">
                  <Info size={15} className="text-accent-300" /> Best Sale Window: This Week
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-5">Price Comparison Across Mandis</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[2000, 2500]} width={55} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
                  formatter={(value) => [`₹${value}`, '']}
                />
                <ReferenceLine y={2350} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'MSP', fill: '#f59e0b', fontSize: 11 }} />
                <Bar dataKey="modal" name="Modal Price" fill="#16a34a" radius={[6, 6, 0, 0]} />
                <Bar dataKey="max" name="Max Price" fill="#bbf7d0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 justify-center">
              <div className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-3 rounded-full bg-primary-600 inline-block" /> Modal Price</div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-3 rounded-full bg-primary-200 inline-block" /> Max Price</div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-0.5 bg-accent-500 inline-block" /> MSP</div>
            </div>
          </div>

          {/* Price Table */}
          <div className="card overflow-x-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Mandi Price Details</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Mandi</th>
                  <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Min</th>
                  <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Modal</th>
                  <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Max</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Distance</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Trend</th>
                  <th className="py-3 px-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {results.map((m, i) => (
                  <tr key={m.mandi} className={`hover:bg-gray-50 transition-colors ${i === 0 ? 'bg-primary-50' : ''}`}>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        {i === 0 && <span className="text-xs font-bold text-primary-600 bg-primary-100 px-2 py-0.5 rounded-full">Best</span>}
                        <span className={`font-medium ${i === 0 ? 'text-primary-700' : 'text-gray-900'}`}>{m.mandi}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right text-gray-600">₹{m.min}</td>
                    <td className="py-3 px-2 text-right font-semibold text-gray-900">₹{m.modal}</td>
                    <td className="py-3 px-2 text-right text-gray-600">₹{m.max}</td>
                    <td className="py-3 px-2 text-center text-gray-500">{m.distance}</td>
                    <td className="py-3 px-2 text-center">
                      {m.trend === 'up' ? <TrendingUp size={16} className="text-primary-600 mx-auto" /> :
                       m.trend === 'down' ? <TrendingDown size={16} className="text-red-500 mx-auto" /> :
                       <Minus size={16} className="text-gray-400 mx-auto" />}
                    </td>
                    <td className="py-3 px-2">
                      <button className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                        Select <ChevronRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
