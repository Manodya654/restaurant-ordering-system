import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AdminNavbar from '../../components/AdminNavbar';
import { Save, User, Lock, Store, Bell, Globe } from 'lucide-react';

const AdminSettings = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Admin Profile', icon: User },
    { id: 'restaurant', name: 'Restaurant Info', icon: Store },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#FFF7ED] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Configure your account and restaurant preferences.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-orange-50 border border-orange-100'
                    }`}
                  >
                    <Icon size={18} />
                    {tab.name}
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-orange-100 p-8">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4">Admin Profile</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full px-4 py-2 border border-orange-100 bg-[#FFF7ED]/30 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full px-4 py-2 border border-orange-100 bg-[#FFF7ED]/30 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'restaurant' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4">Restaurant Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
                      <input
                        type="text"
                        placeholder="Flavor Town"
                        className="w-full px-4 py-2 border border-orange-100 bg-[#FFF7ED]/30 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                      <input
                        type="text"
                        placeholder="+94 77 123 4567"
                        className="w-full px-4 py-2 border border-orange-100 bg-[#FFF7ED]/30 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Store Address</label>
                      <textarea
                        rows="3"
                        className="w-full px-4 py-2 border border-orange-100 bg-[#FFF7ED]/30 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4">Change Password</h2>
                  <div className="space-y-4 max-w-sm">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <input type="password" title="password" className="w-full px-4 py-2 border border-orange-100 bg-[#FFF7ED]/30 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input type="password" title="password" className="w-full px-4 py-2 border border-orange-100 bg-[#FFF7ED]/30 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-md">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;