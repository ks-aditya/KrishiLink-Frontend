import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';

const roles = [
  { id: 'farmer', label: 'Farmer', emoji: '🌾', desc: 'Sell your produce at the best price', color: 'primary', demo: { phone: '9876543210', pass: 'farmer123' } },
  { id: 'buyer', label: 'Buyer', emoji: '🛒', desc: 'Source quality produce directly', color: 'sky', demo: { phone: '8765432109', pass: 'buyer123' } },
  { id: 'fpo', label: 'FPO', emoji: '🤝', desc: 'Manage your farmer collective', color: 'amber', demo: { phone: '7654321098', pass: 'fpo12345' } },
];

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const currentRole = roles.find(r => r.id === selectedRole);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (
        (phone === currentRole.demo.phone || phone === '') &&
        (password === currentRole.demo.pass || password === '')
      ) {
        onLogin(selectedRole);
        navigate(`/${selectedRole}/dashboard`);
      } else {
        setError('Invalid credentials. Use the demo credentials below.');
      }
    }, 1000);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(selectedRole);
      navigate(`/${selectedRole}/dashboard`);
    }, 800);
  };

  const colorMap = {
    primary: { ring: 'ring-primary-500 border-primary-500 bg-primary-50', btn: 'bg-primary-600 hover:bg-primary-700', tab: 'border-primary-600 text-primary-600', badge: 'bg-primary-100 text-primary-700' },
    sky: { ring: 'ring-sky-500 border-sky-500 bg-sky-50', btn: 'bg-sky-500 hover:bg-sky-600', tab: 'border-sky-500 text-sky-600', badge: 'bg-sky-100 text-sky-700' },
    amber: { ring: 'ring-accent-500 border-accent-500 bg-accent-50', btn: 'bg-accent-500 hover:bg-accent-600', tab: 'border-accent-500 text-accent-600', badge: 'bg-accent-100 text-accent-700' },
  };
  const c = colorMap[currentRole.color];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-white max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center">
              <Leaf size={26} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">KrishiLink</h1>
              <p className="text-primary-200 text-sm">Smart Market Linkage Platform</p>
            </div>
          </div>
          <h2 className="text-4xl font-extrabold leading-tight mb-5">
            Strengthening Market Linkages for Farmers
          </h2>
          <p className="text-primary-200 text-lg leading-relaxed mb-8">
            Compare prices. Match buyers. Track payments. All in one platform designed for Indian agriculture.
          </p>
          <div className="space-y-3">
            {['Real-time mandi price comparison', 'AI-powered buyer matching', 'Secure digital payments', 'Supports farmers, FPOs & buyers'].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm text-primary-100">
                <ShieldCheck size={16} className="text-primary-300 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>

          <div className="card shadow-md">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-gray-500 text-sm mt-1">Sign in to your KrishiLink account</p>
            </div>

            {/* Role selector */}
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => { setSelectedRole(role.id); setError(''); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    selectedRole === role.id
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>{role.emoji}</span>
                  <span>{role.label}</span>
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 mb-5 bg-gray-50 rounded-lg px-3 py-2">{currentRole.desc}</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={currentRole.demo.phone}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="input-field pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${c.btn} text-white font-semibold py-2.5 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : `Sign in as ${currentRole.label}`}
              </button>
            </form>

            {/* Demo login */}
            <div className="mt-5 pt-5 border-t border-gray-100">
              <p className="text-xs text-center text-gray-500 mb-3">Demo Credentials</p>
              <div className={`rounded-lg p-3 ${c.badge.split(' ')[0]} border border-opacity-30 text-xs`}>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Phone: <strong>{currentRole.demo.phone}</strong></span>
                  <span className="text-gray-600">Pass: <strong>{currentRole.demo.pass}</strong></span>
                </div>
              </div>
              <button
                onClick={handleDemoLogin}
                disabled={loading}
                className="mt-3 w-full btn-secondary text-sm flex items-center justify-center gap-2"
              >
                {loading ? '...' : `🚀 Quick Demo Login as ${currentRole.label}`}
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Team EXCEPTION · SIH 2026 · Problem Statement 26132
          </p>
        </div>
      </div>
    </div>
  );
}
