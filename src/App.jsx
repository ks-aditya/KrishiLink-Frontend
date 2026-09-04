import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import FarmerLayout from './components/FarmerLayout';
import BuyerLayout from './components/BuyerLayout';
import FPOLayout from './components/FPOLayout';
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import PriceDiscovery from './pages/farmer/PriceDiscovery';
import BuyerMatching from './pages/farmer/BuyerMatching';
import MarketTrends from './pages/farmer/MarketTrends';
import MyListings from './pages/farmer/MyListings';
import Transactions from './pages/farmer/Transactions';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import FPODashboard from './pages/fpo/FPODashboard';

export default function App() {
  const [role, setRole] = useState(null); // 'farmer' | 'buyer' | 'fpo'

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* Farmer Routes */}
        <Route
          path="/farmer"
          element={
            role === 'farmer'
              ? <FarmerLayout onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<FarmerDashboard />} />
          <Route path="price-discovery" element={<PriceDiscovery />} />
          <Route path="buyers" element={<BuyerMatching />} />
          <Route path="market" element={<MarketTrends />} />
          <Route path="listings" element={<MyListings />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>

        {/* Buyer Routes */}
        <Route
          path="/buyer"
          element={
            role === 'buyer'
              ? <BuyerLayout onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<BuyerDashboard />} />
        </Route>

        {/* FPO Routes */}
        <Route
          path="/fpo"
          element={
            role === 'fpo'
              ? <FPOLayout onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<FPODashboard />} />
        </Route>

        {/* Demo shortcuts - bypass login */}
        <Route path="/demo/farmer" element={<DemoRedirect role="farmer" setRole={setRole} />} />
        <Route path="/demo/buyer" element={<DemoRedirect role="buyer" setRole={setRole} />} />
        <Route path="/demo/fpo" element={<DemoRedirect role="fpo" setRole={setRole} />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// Helper component for demo shortcuts
function DemoRedirect({ role, setRole }) {
  setRole(role);
  return <Navigate to={`/${role}/dashboard`} replace />;
}
