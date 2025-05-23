import React from 'react';
import { 
  ShoppingBag, Users, DollarSign, Package, 
  TrendingUp
} from 'lucide-react';
import { Chart as ChartJS, 
  LineController, LineElement, PointElement, 
  LinearScale, Title, CategoryScale,
  PieController, ArcElement, Tooltip, Legend 
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  LineController, LineElement, PointElement, 
  LinearScale, Title, CategoryScale,
  PieController, ArcElement, Tooltip, Legend
);

const AdminHome = () => {
  const stats = [
    { title: "Total Sales", value: "$24,780", change: "+12%", icon: <ShoppingBag className="w-6 h-6" />, trend: "up" },
    { title: "New Customers", value: "1,254", change: "+8%", icon: <Users className="w-6 h-6" />, trend: "up" },
    { title: "Total Revenue", value: "$48,520", change: "+23%", icon: <DollarSign className="w-6 h-6" />, trend: "up" },
    { title: "Pending Orders", value: "124", change: "-3%", icon: <Package className="w-6 h-6" />, trend: "down" }
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "John Doe", date: "12 May 2023", amount: "$125.00", status: "completed" },
    { id: "#ORD-002", customer: "Jane Smith", date: "11 May 2023", amount: "$89.50", status: "processing" },
    { id: "#ORD-003", customer: "Robert Johnson", date: "10 May 2023", amount: "$245.75", status: "shipped" },
    { id: "#ORD-004", customer: "Emily Davis", date: "09 May 2023", amount: "$67.30", status: "pending" },
    { id: "#ORD-005", customer: "Michael Wilson", date: "08 May 2023", amount: "$199.99", status: "completed" }
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: "1,245", revenue: "$24,900" },
    { name: "Smart Watch", sales: "987", revenue: "$19,740" },
    { name: "Bluetooth Speaker", sales: "756", revenue: "$15,120" },
    { name: "Laptop Backpack", sales: "654", revenue: "$13,080" },
    { name: "Phone Case", sales: "543", revenue: "$5,430" }
  ];

  // Sales Chart Data
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [6500, 5900, 8000, 8100, 5600, 5500],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 0,
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      x: { grid: { display: false } },
      y: { 
        grid: { color: '#e5e7eb' },
        ticks: { callback: value => `$${value}` }
      }
    },
  };

  // Revenue Chart Data
  const revenueData = {
    labels: ['Direct', 'Referral', 'Social'],
    datasets: [
      {
        data: [55, 30, 15],
        backgroundColor: ['#6366f1', '#60a5fa', '#34d399'],
        hoverOffset: 4,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: context => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: $${value}k`;
          }
        }
      }
    },
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Admin" />
                <span className="hidden text-sm font-medium text-gray-700 md:block">Admin User</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`text-sm mt-2 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Sales Overview</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs text-indigo-700 bg-indigo-100 rounded-md">Monthly</button>
                <button className="px-3 py-1 text-xs text-gray-700 bg-gray-100 rounded-md">Weekly</button>
              </div>
            </div>
            <div className="h-64">
              <Line data={salesData} options={salesOptions} />
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Revenue Sources</h3>
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </button>
            </div>
            <div className="h-64">
              <Pie data={revenueData} options={revenueOptions} />
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all</a>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{order.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{order.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Top Selling Products</h3>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all</a>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg">
                    <ShoppingBag className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 ml-4">
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} sold • {product.revenue} revenue</p>
                  </div>
                  <div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;