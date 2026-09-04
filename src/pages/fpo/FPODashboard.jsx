import { Users, Package, TrendingUp, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { mockFPO, fpoMembers } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const aggregateData = [
  { crop: 'Wheat', quantity: 215 },
  { crop: 'Rice', quantity: 60 },
  { crop: 'Tomato', quantity: 35 },
  { crop: 'Mango', quantity: 80 },
];

const statusConfig = {
  Ready: 'badge-green',
  Processing: 'badge-blue',
  Pending: 'badge-amber',
};

const bulkDeals = [
  { id: 'BD001', buyer: 'National Grain Corp.', crop: 'Wheat', quantity: '215 Qtl', price: 2450, status: 'Negotiating' },
  { id: 'BD002', buyer: 'GreenBasket Foods', crop: 'Mango', quantity: '80 Qtl', price: 4800, status: 'Confirmed' },
  { id: 'BD003', buyer: 'AgriMart Pvt. Ltd.', crop: 'Rice', quantity: '60 Qtl', price: 3600, status: 'Pending' },
];

export default function FPODashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{mockFPO.name}</h1>
          <p className="text-gray-500 text-sm mt-1">{mockFPO.district}, {mockFPO.state} · {mockFPO.members} member farmers</p>
        </div>
        <button className="btn-accent flex items-center gap-2 text-sm">
          + New Bulk Deal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Member Farmers', value: mockFPO.members.toString(), icon: Users, color: 'bg-accent-50 text-accent-600' },
          { label: 'Total Produce', value: mockFPO.totalProduce, icon: Package, color: 'bg-primary-50 text-primary-600' },
          { label: 'Active Deals', value: '3', icon: TrendingUp, color: 'bg-sky-50 text-sky-600' },
          { label: 'Members Ready', value: `${fpoMembers.filter(m => m.status === 'Ready').length}/${fpoMembers.length}`, icon: CheckCircle2, color: 'bg-purple-50 text-purple-600' },
        ].map(s => (
          <div key={s.label} className="stat-card hover:shadow-md transition-shadow">
            <div className={`w-11 h-11 rounded-2xl ${s.color} flex items-center justify-center shrink-0`}>
              <s.icon size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Deals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Aggregate Produce Chart */}
        <div className="card">
          <div className="mb-5">
            <h3 className="font-semibold text-gray-900">Aggregate Produce</h3>
            <p className="text-xs text-gray-400 mt-0.5">Combined stock from all members · Quintals</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={aggregateData} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="crop" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={40} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
                formatter={(value) => [`${value} Qtl`, 'Quantity']}
              />
              <Bar dataKey="quantity" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Quantity (Qtl)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bulk Deals */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-900">Bulk Deals</h3>
            <span className="badge-amber">{bulkDeals.length} active</span>
          </div>
          <div className="space-y-3">
            {bulkDeals.map(deal => (
              <div key={deal.id} className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl hover:bg-accent-50 transition-colors cursor-pointer">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{deal.buyer}</p>
                  <p className="text-xs text-gray-500">{deal.crop} · {deal.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-accent-600 text-sm">₹{deal.price.toLocaleString()}/Qtl</p>
                  <span className={`text-xs font-semibold ${
                    deal.status === 'Confirmed' ? 'text-primary-600' :
                    deal.status === 'Negotiating' ? 'text-sky-600' : 'text-gray-400'
                  }`}>{deal.status}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Member Farmers Table */}
      <div className="card overflow-x-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-gray-900">Member Farmers</h3>
          <span className="badge-green">{fpoMembers.filter(m => m.status === 'Ready').length} Ready to Sell</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Farmer</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Village</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Crop</th>
              <th className="text-right py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Quantity</th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {fpoMembers.map(member => (
              <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-3 font-medium text-gray-900">{member.name}</td>
                <td className="py-3 px-3 text-gray-500">{member.village}</td>
                <td className="py-3 px-3 text-gray-700">{member.crop}</td>
                <td className="py-3 px-3 text-right font-semibold text-gray-900">{member.quantity}</td>
                <td className="py-3 px-3 text-center">
                  <span className={statusConfig[member.status] || 'badge-green'}>
                    {member.status === 'Ready' ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
