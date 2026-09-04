import { useState } from 'react';
import { Plus, Eye, MessageSquare, CheckCircle2, Clock, X, ChevronDown } from 'lucide-react';
import { listings, cropsList } from '../../data/mockData';

const statusColors = {
  Active: 'badge-green',
  Sold: 'badge-blue',
  Expired: 'badge-red',
};

const cropEmojis = { Wheat: '🌾', Rice: '🍚', Tomato: '🍅', Onion: '🧅', Potato: '🥔', default: '🌱' };

export default function MyListings() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('All');
  const [allListings, setAllListings] = useState(listings);
  const [form, setForm] = useState({ crop: 'Wheat', quantity: '', quality: 'Grade A', askingPrice: '', notes: '' });

  const filtered = filter === 'All' ? allListings : allListings.filter(l => l.status === filter);

  const handleAddListing = (e) => {
    e.preventDefault();
    const newListing = {
      id: `L00${allListings.length + 1}`,
      crop: form.crop,
      quantity: `${form.quantity} Quintals`,
      quality: form.quality,
      askingPrice: parseInt(form.askingPrice) || 2400,
      location: 'Bijnor, Lucknow',
      postedDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      views: 0,
      enquiries: 0,
    };
    setAllListings([newListing, ...allListings]);
    setShowForm(false);
    setForm({ crop: 'Wheat', quantity: '', quality: 'Grade A', askingPrice: '', notes: '' });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your active and past produce listings.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> New Listing
        </button>
      </div>

      {/* Add Listing Form */}
      {showForm && (
        <div className="card border-2 border-primary-200 bg-primary-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Add New Listing</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
          </div>
          <form onSubmit={handleAddListing}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Crop</label>
                <select value={form.crop} onChange={e => setForm({ ...form, crop: e.target.value })} className="input-field bg-white">
                  {cropsList.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity (Qtl)</label>
                <input type="number" required value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="e.g. 100" className="input-field bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Quality</label>
                <select value={form.quality} onChange={e => setForm({ ...form, quality: e.target.value })} className="input-field bg-white">
                  {['Grade A', 'Grade B', 'Premium', 'Standard'].map(q => <option key={q}>{q}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Asking Price (₹/Qtl)</label>
                <input type="number" required value={form.askingPrice} onChange={e => setForm({ ...form, askingPrice: e.target.value })} placeholder="e.g. 2400" className="input-field bg-white" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Quality description, harvest date, special requirements..." className="input-field bg-white h-20 resize-none" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-sm">Post Listing</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-0">
        {['All', 'Active', 'Sold'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors -mb-px ${
              filter === tab ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
            <span className="ml-1.5 text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
              {tab === 'All' ? allListings.length : allListings.filter(l => l.status === tab).length}
            </span>
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
        {filtered.map((listing) => (
          <div key={listing.id} className="card hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{cropEmojis[listing.crop] || cropEmojis.default}</span>
                <div>
                  <h3 className="font-bold text-gray-900">{listing.crop}</h3>
                  <p className="text-xs text-gray-500">{listing.quality} · {listing.quantity}</p>
                </div>
              </div>
              <span className={statusColors[listing.status] || 'badge-green'}>
                {listing.status === 'Active' ? <CheckCircle2 size={11} /> : listing.status === 'Sold' ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                {listing.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">Asking Price</p>
                <p className="text-xl font-bold text-primary-600">₹{listing.askingPrice.toLocaleString()}</p>
                <p className="text-xs text-gray-400">per Quintal</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-semibold text-gray-900">{listing.location}</p>
                <p className="text-xs text-gray-400">Posted: {listing.postedDate}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 pb-4 border-b border-gray-100 mb-4">
              <span className="flex items-center gap-1"><Eye size={13} /> {listing.views} views</span>
              <span className="flex items-center gap-1"><MessageSquare size={13} /> {listing.enquiries} enquiries</span>
            </div>

            <div className="flex gap-2">
              {listing.status === 'Active' ? (
                <>
                  <button className="flex-1 btn-primary text-xs py-2">View Enquiries ({listing.enquiries})</button>
                  <button className="btn-secondary text-xs py-2 px-3">Edit</button>
                </>
              ) : (
                <button className="flex-1 btn-secondary text-xs py-2">View Details</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
