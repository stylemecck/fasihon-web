// import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const productApi = createApi({
//         reducerPath: "productApi",
//         baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
//         tagTypes: ["Product"],
//         endpoints: (builder) => ({
//             getProducts: builder.query({
//                 query: () => "customerProducts",
//                 providesTags: ["Product"],
//             }),
//             addProduct: builder.mutation({
//                 query: (data) => ({
//                     url: "products",
//                     method: "POST",
//                     body: data,
//                 }),
//                 invalidatesTags: ["Product"],
//             }),
//         }),
//     });

// export const { useGetProductsQuery, useAddProductMutation } = productApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "customerProducts",
      providesTags: ["Product"],
    }),

    // 👇 Add this endpoint for single product by ID
    getProductById: builder.query({
      query: (id) => `products/${id}`, // make sure your backend supports this route
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: "products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

// 👇 Export the new hook
export const {
  useGetProductsQuery,
  useAddProductMutation,
  useGetProductByIdQuery, // ✅ Add this
} = productApi;
