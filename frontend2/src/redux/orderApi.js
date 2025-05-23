// src/redux/orderApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Order', 'AdminOrder'],
  endpoints: (builder) => ({
    // Create new order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: 'orders/create',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
      transformErrorResponse: (response) => {
        return response.data?.message || 'Failed to create order';
      }
    }),

    // Get user's orders
    getOrders: builder.query({
      query: () => 'orders/me',
      providesTags: ['Order'],
      transformResponse: (response) => {
        if (!Array.isArray(response?.orders)) {
          return [];
        }
        return response.orders;
      },
      transformErrorResponse: (response) => {
        return response.data?.message || 'Failed to fetch orders';
      }
    }),

    // Get all orders (admin)
    getAdminOrders: builder.query({
      query: () => 'orders/admin',
      providesTags: ['AdminOrder'],
      transformResponse: (response) => {
        if (!Array.isArray(response?.orders)) {
          return [];
        }
        return response.orders;
      },
      transformErrorResponse: (response) => {
        return response.data?.message || 'Failed to fetch admin orders';
      }
    }),

    // Update order status (admin)
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `orders/admin/${orderId}`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['AdminOrder', 'Order'],
      async onQueryStarted({ orderId, status }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedOrder } = await queryFulfilled;
          
          // Update admin orders cache
          dispatch(
            orderApi.util.updateQueryData('getAdminOrders', undefined, (draft) => {
              if (!Array.isArray(draft)) return;
              const index = draft.findIndex(o => o.id === orderId);
              if (index !== -1) {
                draft[index] = updatedOrder;
              }
            })
          );
          
          // Update user orders cache
          dispatch(
            orderApi.util.updateQueryData('getOrders', undefined, (draft) => {
              if (!Array.isArray(draft)) return;
              const index = draft.findIndex(o => o.id === orderId);
              if (index !== -1) {
                draft[index] = updatedOrder;
              }
            })
          );

        } catch (error) {
          console.error('Update failed:', error);
        }
      },
      transformErrorResponse: (response) => {
        return response.data?.message || 'Failed to update order status';
      }
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetAdminOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;