import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Search, Users, TrendingUp, List, CreditCard,
  Leaf, Bell, ChevronDown, LogOut, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import { mockFarmer } from '../data/mockData';

const navItems = [
  { to: '/farmer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/farmer/price-discovery', icon: Search, label: 'Price Discovery' },
  { to: '/farmer/buyers', icon: Users, label: 'Buyer Matching' },
  { to: '/farmer/market', icon: TrendingUp, label: 'Market Trends' },
  { to: '/farmer/listings', icon: List, label: 'My Listings' },
  { to: '/farmer/transactions', icon: CreditCard, label: 'Transactions' },
];

export default function FarmerLayout({ onLogout }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col shadow-lg
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
            <Leaf size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">KrishiLink</h1>
            <p className="text-xs text-gray-500">Farmer Portal</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
            <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-primary-700">RK</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{mockFarmer.name}</p>
              <p className="text-xs text-gray-500 truncate">{mockFarmer.district}, {mockFarmer.state}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu size={22} />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-primary-700">RK</span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{mockFarmer.name}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
