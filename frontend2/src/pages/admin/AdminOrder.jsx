// src/pages/admin/AdminOrder.jsx
import { useEffect } from 'react'
import { useGetAdminOrdersQuery, useUpdateOrderStatusMutation } from '../../redux/orderApi'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AdminOrders = () => {
  const { data: orders = [], isLoading, error, refetch } = useGetAdminOrdersQuery()
  const [updateOrderStatus] = useUpdateOrderStatusMutation()
  const navigate = useNavigate()

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus({ orderId, status: newStatus }).unwrap()
      toast.success('Order status updated successfully')
      refetch()
    } catch (err) {
      toast.error('Failed to update order status')
      console.error('Update error:', err)
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <Error message={error?.data?.message || 'Failed to load orders'} />

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <Toaster position="top-right" />
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Manage Orders</h1>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">Shipping Info</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <button 
                    onClick={() => navigate(`/adminDashboard/customers/${order.userId}`)}
                    className="text-blue-600 hover:underline"
                  >
                    User #{order.userId}
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  ₹{order.totalAmount?.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                      order.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'failed' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
                <td className="max-w-xs px-6 py-4 text-sm text-gray-900">
                  <div className="space-y-1">
                    <p className="font-medium">{order.shippingName}</p>
                    <p>{order.shippingAddress}</p>
                    <p>{order.city}, {order.state} {order.postalCode}</p>
                    <p>{order.country}</p>
                    <p className="text-blue-600">{order.phoneNumber}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => navigate(`/adminDashboard/orders/${order.id}`)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {orders.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No orders found
          </div>
        )}
      </div>
    </div>
  )
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-12 h-12 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
  </div>
)

const Error = ({ message }) => (
  <div className="p-4 text-center text-red-500">
    Error: {message}
  </div>
)

export default AdminOrders