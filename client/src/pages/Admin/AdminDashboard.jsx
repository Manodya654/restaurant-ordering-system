import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { 
  Package, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  ChevronRight
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
    const interval = setInterval(fetchDashboardStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/orders/stats/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="min-h-screen bg-[#FFF7ED] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  const statCards = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
      change: '+12%'
    },
    {
      title: 'Total Revenue',
      value: `LKR ${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-50 text-green-600',
      change: '+23%'
    },
    {
      title: 'Pending Orders',
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600',
      change: '-8%'
    },
    {
      title: 'Completed',
      value: stats?.deliveredOrders || 0,
      icon: CheckCircle,
      color: 'bg-purple-50 text-purple-600',
      change: '+15%'
    }
  ];

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#FFF7ED] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.name}. Here's what's happening today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 transition-transform hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} p-3 rounded-xl`}>
                      <Icon size={24} />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                      stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              to="/admin/menu"
              className="group bg-white rounded-2xl shadow-sm border border-orange-100 p-6 hover:border-orange-300 transition-all"
            >
              <div className="bg-orange-50 w-12 h-12 rounded-xl flex items-center justify-center text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <ShoppingCart size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Manage Menu</h3>
              <p className="text-gray-500 text-sm">Add, edit, or remove menu items</p>
            </Link>

            <Link
              to="/admin/categories"
              className="group bg-white rounded-2xl shadow-sm border border-orange-100 p-6 hover:border-blue-300 transition-all"
            >
              <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-500 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Package size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Categories</h3>
              <p className="text-gray-500 text-sm">Organize your menu categories</p>
            </Link>

            <Link
              to="/admin/orders"
              className="group bg-white rounded-2xl shadow-sm border border-orange-100 p-6 hover:border-green-300 transition-all"
            >
              <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center text-green-500 mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">View Orders</h3>
              <p className="text-gray-500 text-sm">Manage all customer orders</p>
            </Link>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-50">
              <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
              <Link
                to="/admin/orders"
                className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center gap-1"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50">
                  {stats?.recentOrders?.length > 0 ? (
                    stats.recentOrders.slice(0, 5).map((order) => (
                      <tr key={order._id} className="hover:bg-orange-50/20 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {order.user?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          LKR {order.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full border ${
                            order.status === 'completed' ? 'bg-green-50 text-green-700 border-green-100' :
                            order.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                            order.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-100' :
                            'bg-blue-50 text-blue-700 border-blue-100'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-400 italic">
                        No recent orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;