// Mock data for KrishiLink platform

export const mockFarmer = {
  id: 'F001',
  name: 'Rajesh Kumar',
  village: 'Bijnor',
  district: 'Lucknow',
  state: 'Uttar Pradesh',
  phone: '+91 98765 43210',
  crops: ['Wheat', 'Rice', 'Tomato'],
  totalEarnings: 142500,
  rating: 4.7,
  verified: true,
};

export const mockBuyer = {
  id: 'B001',
  name: 'AgriMart Pvt. Ltd.',
  type: 'Wholesale Buyer',
  location: 'Lucknow, UP',
  phone: '+91 87654 32109',
  verified: true,
  rating: 4.5,
};

export const mockFPO = {
  id: 'FPO001',
  name: 'Kisan Samridhi FPO',
  members: 124,
  district: 'Varanasi',
  state: 'Uttar Pradesh',
  totalProduce: '480 Tonnes',
};

// Price trend data for charts
export const priceTrendData = [
  { month: 'Apr', wheat: 2100, rice: 3200, tomato: 1800, onion: 2400 },
  { month: 'May', wheat: 2250, rice: 3100, tomato: 2200, onion: 2200 },
  { month: 'Jun', wheat: 2180, rice: 3300, tomato: 3100, onion: 1900 },
  { month: 'Jul', wheat: 2350, rice: 3450, tomato: 2800, onion: 2100 },
  { month: 'Aug', wheat: 2420, rice: 3600, tomato: 2400, onion: 2600 },
  { month: 'Sep', wheat: 2390, rice: 3550, tomato: 2100, onion: 2800 },
];

// Weekly earnings chart data
export const weeklyEarnings = [
  { day: 'Mon', earnings: 8200 },
  { day: 'Tue', earnings: 12400 },
  { day: 'Wed', earnings: 9800 },
  { day: 'Thu', earnings: 15600 },
  { day: 'Fri', earnings: 11200 },
  { day: 'Sat', earnings: 18900 },
  { day: 'Sun', earnings: 7400 },
];

// Mandi price data
export const mandiPrices = [
  { mandi: 'Lucknow APMC', crop: 'Wheat', min: 2280, max: 2450, modal: 2390, distance: '12 km', trend: 'up' },
  { mandi: 'Kanpur Mandi', crop: 'Wheat', min: 2200, max: 2420, modal: 2310, distance: '25 km', trend: 'up' },
  { mandi: 'Unnao Mandi', crop: 'Wheat', min: 2150, max: 2380, modal: 2260, distance: '38 km', trend: 'down' },
  { mandi: 'Sitapur APMC', crop: 'Wheat', min: 2100, max: 2350, modal: 2220, distance: '54 km', trend: 'stable' },
  { mandi: 'Hardoi Mandi', crop: 'Wheat', min: 2080, max: 2320, modal: 2190, distance: '68 km', trend: 'down' },
];

// Buyer matches
export const buyerMatches = [
  {
    id: 'B001',
    name: 'AgriMart Pvt. Ltd.',
    type: 'Wholesale Buyer',
    location: 'Lucknow, UP',
    distance: '8 km',
    requirement: '50-200 Quintals',
    crop: 'Wheat',
    offeredPrice: 2450,
    rating: 4.8,
    verified: true,
    tags: ['Fast Payment', 'Regular Buyer'],
  },
  {
    id: 'B002',
    name: 'GreenBasket Foods',
    type: 'Food Processor',
    location: 'Kanpur, UP',
    distance: '22 km',
    requirement: '100-500 Quintals',
    crop: 'Wheat',
    offeredPrice: 2420,
    rating: 4.5,
    verified: true,
    tags: ['Long-term Contract', 'Transport Provided'],
  },
  {
    id: 'B003',
    name: 'Ravi Kumar Traders',
    type: 'Local Trader',
    location: 'Unnao, UP',
    distance: '35 km',
    requirement: '20-80 Quintals',
    crop: 'Wheat',
    offeredPrice: 2380,
    rating: 3.9,
    verified: false,
    tags: ['Flexible Quantity'],
  },
  {
    id: 'B004',
    name: 'National Grain Corp.',
    type: 'Government Procurement',
    location: 'Lucknow, UP',
    distance: '15 km',
    requirement: '200-1000 Quintals',
    crop: 'Wheat',
    offeredPrice: 2350,
    rating: 4.2,
    verified: true,
    tags: ['MSP Guaranteed', 'Secure Payment'],
  },
];

// Transactions
export const transactions = [
  {
    id: 'TXN001',
    date: '2026-09-01',
    buyer: 'AgriMart Pvt. Ltd.',
    crop: 'Wheat',
    quantity: '80 Qtl',
    amount: 196000,
    status: 'Paid',
    mode: 'Online Transfer',
  },
  {
    id: 'TXN002',
    date: '2026-08-28',
    buyer: 'GreenBasket Foods',
    crop: 'Rice',
    quantity: '40 Qtl',
    amount: 144000,
    status: 'Paid',
    mode: 'Online Transfer',
  },
  {
    id: 'TXN003',
    date: '2026-08-25',
    buyer: 'Ravi Kumar Traders',
    crop: 'Tomato',
    quantity: '25 Qtl',
    amount: 52500,
    status: 'In Transit',
    mode: 'Pending',
  },
  {
    id: 'TXN004',
    date: '2026-08-20',
    buyer: 'National Grain Corp.',
    crop: 'Wheat',
    quantity: '120 Qtl',
    amount: 282000,
    status: 'Pending',
    mode: 'Cheque',
  },
  {
    id: 'TXN005',
    date: '2026-08-15',
    buyer: 'AgriMart Pvt. Ltd.',
    crop: 'Onion',
    quantity: '60 Qtl',
    amount: 168000,
    status: 'Paid',
    mode: 'Online Transfer',
  },
];

// Active listings
export const listings = [
  {
    id: 'L001',
    crop: 'Wheat',
    quantity: '120 Quintals',
    quality: 'Grade A',
    askingPrice: 2400,
    location: 'Bijnor, Lucknow',
    postedDate: '2026-09-02',
    status: 'Active',
    views: 34,
    enquiries: 8,
  },
  {
    id: 'L002',
    crop: 'Rice (Basmati)',
    quantity: '50 Quintals',
    quality: 'Premium',
    askingPrice: 3800,
    location: 'Bijnor, Lucknow',
    postedDate: '2026-09-01',
    status: 'Active',
    views: 21,
    enquiries: 5,
  },
  {
    id: 'L003',
    crop: 'Tomato',
    quantity: '30 Quintals',
    quality: 'Grade B',
    askingPrice: 2100,
    location: 'Bijnor, Lucknow',
    postedDate: '2026-08-29',
    status: 'Sold',
    views: 67,
    enquiries: 12,
  },
  {
    id: 'L004',
    crop: 'Onion',
    quantity: '80 Quintals',
    quality: 'Grade A',
    askingPrice: 2700,
    location: 'Bijnor, Lucknow',
    postedDate: '2026-08-25',
    status: 'Sold',
    views: 89,
    enquiries: 19,
  },
];

// Buyer listings (available produce for buyers)
export const availableProduce = [
  {
    id: 'P001',
    farmer: 'Rajesh Kumar',
    crop: 'Wheat',
    quantity: '120 Qtl',
    quality: 'Grade A',
    price: 2400,
    location: 'Lucknow, UP',
    distance: '12 km',
    verified: true,
  },
  {
    id: 'P002',
    farmer: 'Suresh Yadav',
    crop: 'Rice (Basmati)',
    quantity: '80 Qtl',
    quality: 'Premium',
    price: 3800,
    location: 'Varanasi, UP',
    distance: '28 km',
    verified: true,
  },
  {
    id: 'P003',
    farmer: 'Kisan Samridhi FPO',
    crop: 'Soybean',
    quantity: '400 Qtl',
    quality: 'Grade A',
    price: 4200,
    location: 'Indore, MP',
    distance: '45 km',
    verified: true,
  },
  {
    id: 'P004',
    farmer: 'Meena Devi',
    crop: 'Tomato',
    quantity: '25 Qtl',
    quality: 'Grade B',
    price: 2100,
    location: 'Lucknow, UP',
    distance: '18 km',
    verified: false,
  },
];

// FPO members
export const fpoMembers = [
  { id: 'F001', name: 'Rajesh Kumar', village: 'Bijnor', crop: 'Wheat', quantity: '120 Qtl', status: 'Ready' },
  { id: 'F002', name: 'Suresh Yadav', village: 'Malihabad', crop: 'Mango', quantity: '80 Qtl', status: 'Ready' },
  { id: 'F003', name: 'Meena Devi', village: 'Kakori', crop: 'Tomato', quantity: '35 Qtl', status: 'Processing' },
  { id: 'F004', name: 'Anand Mishra', village: 'Gosainganj', crop: 'Wheat', quantity: '95 Qtl', status: 'Ready' },
  { id: 'F005', name: 'Priya Singh', village: 'Chinhat', crop: 'Rice', quantity: '60 Qtl', status: 'Pending' },
];

// Crops list
export const cropsList = ['Wheat', 'Rice', 'Tomato', 'Onion', 'Potato', 'Soybean', 'Maize', 'Cotton', 'Sugarcane', 'Mango', 'Banana', 'Mustard'];

// Demand forecast data
export const demandForecast = [
  { week: 'W1 Sep', demand: 85 },
  { week: 'W2 Sep', demand: 92 },
  { week: 'W3 Sep', demand: 78 },
  { week: 'W4 Sep', demand: 95 },
  { week: 'W1 Oct', demand: 88 },
  { week: 'W2 Oct', demand: 102 },
];
