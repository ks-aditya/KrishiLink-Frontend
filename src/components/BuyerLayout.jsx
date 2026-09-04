import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Leaf, Bell, LogOut, ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { mockBuyer } from '../data/mockData';

const navItems = [
  { to: '/buyer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
];

export default function BuyerLayout({ onLogout }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col shadow-lg
        transform transition-transform duration-300
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center">
            <ShoppingCart size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">KrishiLink</h1>
            <p className="text-xs text-gray-500">Buyer Portal</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'bg-sky-500 text-white shadow-sm' : 'sidebar-link-inactive'}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
            <div className="w-9 h-9 bg-sky-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-sky-700">AG</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{mockBuyer.name}</p>
              <p className="text-xs text-gray-500 truncate">{mockBuyer.location}</p>
            </div>
            <button onClick={() => { onLogout(); navigate('/'); }} className="text-gray-400 hover:text-red-500 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600">
            <Menu size={22} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-600">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100">
              <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-sky-700">AG</span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{mockBuyer.name}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="page-enter"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}
