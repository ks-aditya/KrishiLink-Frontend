import { CheckCircle2, Clock, Truck, Download, Search } from 'lucide-react';
import { transactions } from '../../data/mockData';
import { useState } from 'react';

const statusConfig = {
  Paid: { cls: 'badge-green', icon: CheckCircle2 },
  'In Transit': { cls: 'badge-blue', icon: Truck },
  Pending: { cls: 'badge-amber', icon: Clock },
};

const cropEmojis = { Wheat: '🌾', Rice: '🍚', Tomato: '🍅', Onion: '🧅', default: '🌱' };

export default function Transactions() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const totalPaid = transactions.filter(t => t.status === 'Paid').reduce((s, t) => s + t.amount, 0);
  const totalPending = transactions.filter(t => t.status !== 'Paid').reduce((s, t) => s + t.amount, 0);

  const filtered = transactions.filter(t => {
    const matchSearch = t.buyer.toLowerCase().includes(search.toLowerCase()) || t.crop.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || t.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-500 text-sm mt-1">Track all your payments and order history.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="w-11 h-11 bg-primary-50 rounded-2xl flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} className="text-primary-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Total Received</p>
            <p className="text-xl font-bold text-primary-600">₹{(totalPaid / 100000).toFixed(2)}L</p>
            <p className="text-xs text-gray-400">{transactions.filter(t => t.status === 'Paid').length} payments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="w-11 h-11 bg-accent-50 rounded-2xl flex items-center justify-center shrink-0">
            <Clock size={20} className="text-accent-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Pending Amount</p>
            <p className="text-xl font-bold text-accent-600">₹{(totalPending / 100000).toFixed(2)}L</p>
            <p className="text-xs text-gray-400">{transactions.filter(t => t.status !== 'Paid').length} transactions</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="w-11 h-11 bg-sky-50 rounded-2xl flex items-center justify-center shrink-0">
            <Truck size={20} className="text-sky-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Total Transactions</p>
            <p className="text-xl font-bold text-gray-900">{transactions.length}</p>
            <p className="text-xs text-gray-400">This month</p>
          </div>
        </div>
      </div>

      {/* Filter + Search */}
      <div className="card py-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by buyer or crop..."
              className="input-field pl-9 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Paid', 'In Transit', 'Pending'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filter === f ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="btn-secondary text-xs py-2 flex items-center gap-1.5 ml-auto">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Txn ID</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Buyer</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Crop</th>
              <th className="text-right py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Mode</th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="py-3 px-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((txn) => {
              const sc = statusConfig[txn.status];
              const StatusIcon = sc.icon;
              return (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-3 text-xs text-gray-500 font-mono">{txn.id}</td>
                  <td className="py-4 px-3 text-gray-600 text-xs">{txn.date}</td>
                  <td className="py-4 px-3">
                    <span className="font-medium text-gray-900">{txn.buyer}</span>
                  </td>
                  <td className="py-4 px-3">
                    <span className="flex items-center gap-1.5">
                      <span>{cropEmojis[txn.crop] || cropEmojis.default}</span>
                      <span className="text-gray-700">{txn.crop}</span>
                      <span className="text-gray-400 text-xs">· {txn.quantity}</span>
                    </span>
                  </td>
                  <td className="py-4 px-3 text-right font-bold text-gray-900">
                    ₹{txn.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-3 text-center text-xs text-gray-500">{txn.mode}</td>
                  <td className="py-4 px-3 text-center">
                    <span className={`${sc.cls} inline-flex items-center gap-1`}>
                      <StatusIcon size={11} />
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    <button className="text-xs font-semibold text-primary-600 hover:text-primary-700">
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg font-medium">No transactions found</p>
            <p className="text-sm">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
