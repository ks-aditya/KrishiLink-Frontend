import { ShieldCheck, Star, MapPin, Phone, MessageSquare, Filter, Search, Eye } from 'lucide-react';
import { availableProduce } from '../../data/mockData';
import { useState } from 'react';
import { mockBuyer } from '../../data/mockData';

const cropEmojis = { Wheat: '🌾', Rice: '🍚', Tomato: '🍅', Onion: '🧅', Potato: '🥔', Soybean: '🫘', default: '🌱' };

export default function BuyerDashboard() {
  const [search, setSearch] = useState('');
  const [contacted, setContacted] = useState([]);

  const filtered = availableProduce.filter(p =>
    p.crop.toLowerCase().includes(search.toLowerCase()) ||
    p.farmer.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: 'Available Listings', value: availableProduce.length.toString(), color: 'bg-sky-50 text-sky-600' },
    { label: 'Connected Farmers', value: contacted.length.toString(), color: 'bg-primary-50 text-primary-600' },
    { label: 'Active Orders', value: '3', color: 'bg-accent-50 text-accent-600' },
    { label: 'This Month Spend', value: '₹12.4L', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome, {mockBuyer.name}. Find quality produce from verified farmers.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="card text-center hover:shadow-md transition-shadow">
            <p className={`text-2xl font-extrabold ${s.color.split(' ')[1]}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="card py-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by crop or farmer..."
              className="input-field pl-9 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter size={15} />
            <select className="input-field py-2 w-auto text-sm">
              <option>All Crops</option>
              <option>Wheat</option>
              <option>Rice</option>
              <option>Tomato</option>
            </select>
          </div>
        </div>
      </div>

      {/* Available Produce */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Produce ({filtered.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
          {filtered.map(produce => (
            <div key={produce.id} className="card hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">{cropEmojis[produce.crop] || cropEmojis.default}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900">{produce.crop}</h3>
                    {produce.verified
                      ? <span className="badge-green text-xs"><ShieldCheck size={11} /> Verified</span>
                      : <span className="badge-amber text-xs">Unverified</span>
                    }
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{produce.farmer}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={11} /> {produce.location}</span>
                    <span>📍 {produce.distance}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-sky-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="text-lg font-bold text-sky-600">₹{produce.price.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">per Qtl</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500">Quantity</p>
                  <p className="text-sm font-bold text-gray-900">{produce.quantity}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500">Quality</p>
                  <p className="text-sm font-bold text-gray-900">{produce.quality}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setContacted(prev => prev.includes(produce.id) ? prev : [...prev, produce.id])}
                  className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl transition-all active:scale-95 ${
                    contacted.includes(produce.id)
                      ? 'bg-primary-50 text-primary-600 border border-primary-200'
                      : 'bg-sky-500 hover:bg-sky-600 text-white'
                  }`}
                >
                  {contacted.includes(produce.id) ? '✓ Contacted' : <><Phone size={14} /> Contact Farmer</>}
                </button>
                <button className="btn-secondary text-sm py-2 px-3 flex items-center gap-1.5">
                  <Eye size={14} /> View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
