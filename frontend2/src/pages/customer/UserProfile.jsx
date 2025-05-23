import React from 'react';
import {
  ShoppingBagIcon,
  CogIcon,
  LockClosedIcon,
  BellIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { FaUserCircle } from 'react-icons/fa';
import { useGetProfileQuery } from '../../redux/authApi';
import { useGetMyOrdersQuery } from '../../redux/orderApi';

const UserProfile = () => {
  const { data: user, isLoading: userLoading, error: userError } = useGetProfileQuery();
  const { 
    data: orders = [], 
    isLoading: ordersLoading, 
    error: ordersError,
    refetch: refetchOrders 
  } = useGetMyOrdersQuery();

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency helper
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '₹0.00';
    return `₹${amount.toFixed(2)}`;
  };

  // Handle loading and error states
  if (userLoading) return <p className="mt-10 text-center">Loading profile...</p>;
  if (userError) return <p className="mt-10 text-center text-red-500">Failed to load profile</p>;

  return (
    <div className="min-h-screen py-8 bg-gray-50 mt-[8%]">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">

        {/* Profile Header */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow">
          <div className="flex items-center gap-6">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="User avatar"
                className="object-cover w-20 h-20 border-2 border-purple-500 rounded-full"
              />
            ) : (
              <FaUserCircle className="w-20 h-20 text-purple-500" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.username}</h1>
              <p className="text-gray-600">{user?.email}</p>
              {user?.createdAt && (
                <p className="text-sm text-gray-500">
                  Member since {formatDate(user.createdAt)}
                </p>
              )}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 ml-auto text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700">
              <PencilIcon className="w-5 h-5" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Order History */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <ShoppingBagIcon className="w-6 h-6 text-purple-600" />
              Order History
            </h2>
            <button 
              onClick={refetchOrders}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Refresh orders
            </button>
          </div>
          
          {ordersLoading ? (
            <p>Loading orders...</p>
          ) : ordersError ? (
            <p className="text-red-500">Failed to load orders</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id || order.id}
                  className="p-4 transition-colors border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order #{order._id || order.id}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.createdAt)} • {order.orderItems?.length || 0} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatCurrency(order.totalAmount)}
                      </p>
                      <span className={`px-2 py-1 text-sm rounded-full ${
                        order.status === 'PAID' 
                          ? 'text-green-800 bg-green-100' 
                          : order.status === 'CANCELLED'
                            ? 'text-red-800 bg-red-100'
                            : 'text-yellow-800 bg-yellow-100'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold">
            <CogIcon className="w-6 h-6 text-purple-600" />
            Account Settings
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h3 className="flex items-center gap-2 mb-2 font-medium">
                <LockClosedIcon className="w-5 h-5" />
                Security
              </h3>
              <ul className="space-y-2">
                <li>
                  <button className="text-purple-600 hover:text-purple-700">
                    Change Password
                  </button>
                </li>
                <li>
                  <button className="text-purple-600 hover:text-purple-700">
                    Two-Factor Authentication
                  </button>
                </li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="flex items-center gap-2 mb-2 font-medium">
                <BellIcon className="w-5 h-5" />
                Notifications
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span>Promotional Offers</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;