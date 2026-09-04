import { useState } from 'react';
import { CheckCircle2, MapPin, Star, Phone, MessageSquare, Filter, ChevronDown, ShieldCheck } from 'lucide-react';
import { buyerMatches } from '../../data/mockData';

export default function BuyerMatching() {
  const [filter, setFilter] = useState({ crop: 'All', verified: false });
  const [contacted, setContacted] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const filtered = buyerMatches.filter(b => {
    if (filter.verified && !b.verified) return false;
    return true;
  });

  const handleContact = (id) => {
    setContacted(prev => [...prev, id]);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Buyer Matching</h1>
          <p className="text-gray-500 text-sm mt-1">AI-matched buyers based on your crop, quantity, and location.</p>
        </div>
        <div className="badge-green text-sm px-4 py-2">
          <CheckCircle2 size={14} /> {buyerMatches.filter(b => b.verified).length} Verified Buyers Found
        </div>
      </div>

      {/* Filters */}
      <div className="card py-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Filter size={15} /> Filters:
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={filter.verified}
              onChange={(e) => setFilter({ ...filter, verified: e.target.checked })}
              className="accent-primary-600 w-4 h-4"
            />
            <span className="text-gray-700">Verified Only</span>
          </label>
          <div className="relative">
            <select
              className="input-field py-2 pr-8 appearance-none w-auto text-sm"
              onChange={() => {}}
            >
              <option>All Crops</option>
              <option>Wheat</option>
              <option>Rice</option>
              <option>Tomato</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="input-field py-2 pr-8 appearance-none w-auto text-sm">
              <option>Any Distance</option>
              <option>Within 20 km</option>
              <option>Within 50 km</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Buyer Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map((buyer, idx) => (
          <div
            key={buyer.id}
            className={`card hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border-2 ${
              selectedBuyer === buyer.id ? 'border-primary-400' : 'border-transparent'
            }`}
            onClick={() => setSelectedBuyer(selectedBuyer === buyer.id ? null : buyer.id)}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center shrink-0 text-2xl font-bold text-primary-700">
                {buyer.name[0]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-gray-900">{buyer.name}</h3>
                  {buyer.verified ? (
                    <span className="badge-green"><ShieldCheck size={11} /> Verified</span>
                  ) : (
                    <span className="badge-amber">Unverified</span>
                  )}
                  {idx === 0 && <span className="badge-blue">🤖 Best Match</span>}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{buyer.type}</p>

                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 flex-wrap">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {buyer.location}</span>
                  <span className="flex items-center gap-1">📍 {buyer.distance}</span>
                  <span className="flex items-center gap-1"><Star size={12} className="text-accent-500 fill-accent-500" /> {buyer.rating}</span>
                </div>

                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  <div className="bg-primary-50 rounded-lg px-3 py-1.5">
                    <p className="text-xs text-gray-500">Offered Price</p>
                    <p className="text-lg font-bold text-primary-600">₹{buyer.offeredPrice.toLocaleString()}<span className="text-xs font-normal text-gray-400">/Qtl</span></p>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-3 py-1.5">
                    <p className="text-xs text-gray-500">Requirement</p>
                    <p className="text-sm font-semibold text-gray-900">{buyer.requirement}</p>
                  </div>
                </div>

                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {buyer.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
              <button
                onClick={(e) => { e.stopPropagation(); handleContact(buyer.id); }}
                className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl transition-all active:scale-95 ${
                  contacted.includes(buyer.id)
                    ? 'bg-primary-50 text-primary-600 border border-primary-200'
                    : 'btn-primary'
                }`}
              >
                {contacted.includes(buyer.id) ? (
                  <><CheckCircle2 size={15} /> Connected</>
                ) : (
                  <><Phone size={15} /> Connect Now</>
                )}
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 btn-secondary text-sm"
              >
                <MessageSquare size={15} /> Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
