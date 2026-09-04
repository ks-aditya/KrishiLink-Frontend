import { useNavigate } from 'react-router-dom';
import {
  Leaf, TrendingUp, Users, ShieldCheck, ArrowRight, Star,
  BarChart2, MapPin, Truck, CreditCard, CheckCircle2, Zap
} from 'lucide-react';

const features = [
  { icon: TrendingUp, title: 'Live Price Discovery', desc: 'Compare mandi prices across markets in real time to get the best deal.', color: 'bg-primary-50 text-primary-600' },
  { icon: Users, title: 'Smart Buyer Matching', desc: 'AI-powered matching connects you with verified buyers suited to your crop.', color: 'bg-sky-50 text-sky-600' },
  { icon: BarChart2, title: 'Demand Forecasting', desc: 'Know when demand peaks to sell at the highest price window.', color: 'bg-accent-50 text-accent-600' },
  { icon: Truck, title: 'Logistics Options', desc: 'Find transport and cold-storage partners near your location.', color: 'bg-purple-50 text-purple-600' },
  { icon: ShieldCheck, title: 'Verified Ecosystem', desc: 'All buyers and FPOs are verified to eliminate fraud.', color: 'bg-rose-50 text-rose-600' },
  { icon: CreditCard, title: 'Payment Tracking', desc: 'Track all transactions with digital payment records.', color: 'bg-teal-50 text-teal-600' },
];

const benefits = [
  { emoji: '🌾', role: 'Farmers', color: 'border-primary-200 bg-primary-50', badge: 'bg-primary-600', items: ['Better price realization', 'More buyer choices', 'Reduced dependence on intermediaries', 'Better selling decisions'] },
  { emoji: '🛒', role: 'Buyers', color: 'border-sky-200 bg-sky-50', badge: 'bg-sky-600', items: ['Easy farmer/FPO discovery', 'Reliable supply information', 'Better quality & quantity matching'] },
  { emoji: '🤝', role: 'FPOs', color: 'border-accent-200 bg-accent-50', badge: 'bg-accent-500', items: ['Aggregate produce efficiently', 'Access larger buyers', 'Stronger bargaining power'] },
  { emoji: '📊', role: 'Overall Impact', color: 'border-purple-200 bg-purple-50', badge: 'bg-purple-600', items: ['Reduced information gap', 'Lower transaction costs', 'Reduced post-harvest losses', 'More transparent transactions'] },
];

const stats = [
  { value: '12,000+', label: 'Farmers Registered' },
  { value: '3,200+', label: 'Verified Buyers' },
  { value: '420+', label: 'FPOs Onboarded' },
  { value: '₹48 Cr+', label: 'Transactions Facilitated' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
              <Leaf size={20} className="text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">KrishiLink</span>
              <span className="ml-2 text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">SIH 2026</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="btn-secondary text-sm">
              Sign In
            </button>
            <button onClick={() => navigate('/login')} className="btn-primary text-sm">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient text-white px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Zap size={14} className="text-accent-300" />
              <span>Smart India Hackathon 2026 · Problem Statement 26132</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Empowering Farmers with{' '}
              <span className="text-accent-400">Smart Market</span>{' '}
              Intelligence
            </h1>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl">
              KrishiLink connects farmers directly with verified buyers, provides real-time mandi prices,
              AI-driven buyer matching, and demand forecasting — eliminating middlemen and maximising farmer income.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 bg-primary-500 hover:bg-primary-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-primary-900/30 active:scale-95"
              >
                Start as Farmer <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 active:scale-95"
              >
                I'm a Buyer / FPO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary-600 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center text-white">
              <p className="text-3xl font-extrabold text-accent-300">{value}</p>
              <p className="text-sm text-primary-200 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything a Farmer Needs</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              A complete digital platform for market access, price discovery, and transparent transactions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card hover:shadow-md transition-shadow duration-200 group">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits for Everyone</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              KrishiLink creates value across the entire agricultural supply chain.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map(({ emoji, role, color, badge, items }) => (
              <div key={role} className={`rounded-2xl border-2 ${color} p-6`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{emoji}</span>
                  <span className={`text-sm font-bold text-white px-3 py-1 rounded-full ${badge}`}>{role}</span>
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 size={16} className="text-primary-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-primary-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get the Best Price for Your Crop?</h2>
          <p className="text-primary-200 mb-8 text-lg">Join thousands of farmers already using KrishiLink to sell smarter.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-accent-500 hover:bg-accent-400 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg active:scale-95"
          >
            Join KrishiLink Free →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="font-bold text-white">KrishiLink</span>
          </div>
          <p className="text-sm text-center">Team EXCEPTION · SIH 2026 · Problem Statement 26132</p>
          <p className="text-sm">Agriculture, FoodTech & Rural Development</p>
        </div>
      </footer>
    </div>
  );
}
