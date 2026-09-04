import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Star, ArrowUpRight, Bell, Clock, CheckCircle2 } from 'lucide-react';
import { mockFarmer, priceTrendData, weeklyEarnings, buyerMatches, transactions } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

const statCards = [
  { label: 'Active Listings', value: '2', sub: '+1 this week', icon: ShoppingBag, color: 'bg-primary-50 text-primary-600', trend: 'up' },
  { label: 'Best Price Today', value: '₹2,450/Qtl', sub: 'Wheat · Lucknow APMC', icon: TrendingUp, color: 'bg-accent-50 text-accent-600', trend: 'up' },
  { label: 'Pending Payments', value: '₹4,26,000', sub: '2 transactions', icon: DollarSign, color: 'bg-rose-50 text-rose-600', trend: 'neutral' },
  { label: 'Total Earnings', value: '₹1,42,500', sub: 'This month', icon: Star, color: 'bg-sky-50 text-sky-600', trend: 'up' },
];

function StatCard({ card }) {
  const Icon = card.icon;
  return (
    <div className="stat-card group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center shrink-0`}>
        <Icon size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 font-medium mb-0.5">{card.label}</p>
        <p className="text-xl font-bold text-gray-900 leading-tight">{card.value}</p>
        <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
      </div>
      {card.trend === 'up' && <ArrowUpRight size={16} className="text-primary-500 shrink-0" />}
    </div>
  );
}

export default function FarmerDashboard() {
  const navigate = useNavigate();

  const topBuyers = buyerMatches.slice(0, 3);
  const recentTxn = transactions.slice(0, 3);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Good Morning, {mockFarmer.name} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening with your listings today.</p>
        </div>
        <button
          onClick={() => navigate('/farmer/listings')}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          + New Listing
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => <StatCard key={card.label} card={card} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Trend */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">Price Trends</h3>
              <p className="text-xs text-gray-400">Last 6 months · ₹/Quintal</p>
            </div>
            <span className="badge-green">Live</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={priceTrendData}>
              <defs>
                <linearGradient id="wheatGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="riceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={50} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
                formatter={(value) => [`₹${value}`, '']}
              />
              <Area type="monotone" dataKey="wheat" stroke="#16a34a" strokeWidth={2.5} fill="url(#wheatGrad)" name="Wheat" />
              <Area type="monotone" dataKey="rice" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#riceGrad)" name="Rice" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 justify-center">
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-3 rounded-full bg-primary-600 inline-block" /> Wheat</div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-3 rounded-full bg-sky-500 inline-block" /> Rice</div>
          </div>
        </div>

        {/* Weekly Earnings */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">Weekly Earnings</h3>
              <p className="text-xs text-gray-400">This week · ₹</p>
            </div>
            <span className="badge-amber">₹83,500 total</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyEarnings} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={55} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Earnings']}
              />
              <Bar dataKey="earnings" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Buyer Matches */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-900">Top Buyer Matches</h3>
            <button onClick={() => navigate('/farmer/buyers')} className="text-xs font-semibold text-primary-600 hover:text-primary-700">
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {topBuyers.map((buyer) => (
              <div key={buyer.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary-700">{buyer.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900 truncate">{buyer.name}</p>
                    {buyer.verified && <CheckCircle2 size={13} className="text-primary-600 shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500">{buyer.distance} · {buyer.requirement}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-primary-600">₹{buyer.offeredPrice.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">per Qtl</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
            <button onClick={() => navigate('/farmer/transactions')} className="text-xs font-semibold text-primary-600 hover:text-primary-700">
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {recentTxn.map((txn) => (
              <div key={txn.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  txn.status === 'Paid' ? 'bg-primary-100' : txn.status === 'In Transit' ? 'bg-sky-100' : 'bg-accent-100'
                }`}>
                  {txn.status === 'Paid' ? <CheckCircle2 size={16} className="text-primary-600" /> :
                   txn.status === 'In Transit' ? <Clock size={16} className="text-sky-600" /> :
                   <Bell size={16} className="text-accent-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{txn.buyer}</p>
                  <p className="text-xs text-gray-500">{txn.crop} · {txn.quantity}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">₹{(txn.amount / 1000).toFixed(0)}K</p>
                  <span className={`text-xs font-medium ${
                    txn.status === 'Paid' ? 'text-primary-600' :
                    txn.status === 'In Transit' ? 'text-sky-600' : 'text-accent-600'
                  }`}>{txn.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
