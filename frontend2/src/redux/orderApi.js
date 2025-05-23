// src/redux/orderApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/',
    credentials: 'include',
  }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    // Admin: Get all orders
    getAdminOrders: builder.query({
      query: () => 'adminDashboard/orders',
      providesTags: ['Order'],
    }),

    // User: Get their own orders
    getMyOrders: builder.query({
      query: () => 'orders',
      providesTags: ['Order'],
    }),
  }),
});

export const { useGetAdminOrdersQuery, useGetMyOrdersQuery } = orderApi;
