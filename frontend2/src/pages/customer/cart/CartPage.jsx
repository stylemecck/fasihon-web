// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Loader from "../../../components/common/Loader";
// import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
// import {
//   useAddToCartMutation,
//   useUpdateCartItemMutation,
//   useDeleteFromCartMutation,
//   useFetchCartItemsQuery,
// } from "../../../redux/cartApi";
// import { useGetProfileQuery } from "../../../redux/authApi";
// import { toast } from "react-hot-toast";
// import FButton from "../../../components/FButton";

// const CartPage = () => {
//   const navigate = useNavigate();
//   const { data: user } = useGetProfileQuery();
//   const {
//     data: cartData,
//     isLoading: cartLoading,
//     refetch,
//   } = useFetchCartItemsQuery();

//   const [addToCart, { isLoading: adding }] = useAddToCartMutation();
//   const [updateCartItem, { isLoading: updating }] = useUpdateCartItemMutation();
//   const [deleteFromCart, { isLoading: deleting }] = useDeleteFromCartMutation();

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   if (user === null) {
//     return (
//       <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
//         <div className="text-center">
//           <ShoppingBag className="mx-auto mb-4" size={36} />
//           <h2 className="mb-2 text-2xl font-semibold">
//             Login to view your cart
//           </h2>
//           <button
//             onClick={() => navigate("/login")}
//             className="px-6 py-2 text-white bg-blue-600 rounded shadow hover:bg-blue-700"
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (cartLoading) return <Loader />;

//   const cartItemsArray = cartData?.[1]?.cart || [];
//   const subtotal = cartData?.[2]?.total || 0;
//   const tax = Math.round(subtotal * 0.14);
//   const total = subtotal + tax;

//   if (cartItemsArray.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
//         <div className="text-center">
//           <ShoppingBag className="mx-auto mb-4" size={36} />
//           <h2 className="mb-2 text-2xl font-semibold">
//             Your shopping bag is empty
//           </h2>
//           <p className="mb-4 text-gray-500">
//             Start adding products to your cart.
//           </p>
//           <button
//             onClick={() => navigate("/shop")}
//             className="px-6 py-2 text-white bg-blue-600 rounded shadow hover:bg-blue-700"
//           >
//             Start Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 py-20 bg-gray-100 sm:px-6 lg:px-8 font-poppins">
//       <div className="mx-auto max-w-7xl">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-bold">Your Shopping Bag</h1>
//           <button
//             onClick={() => navigate("/shop")}
//             className="hidden px-5 py-2 text-white bg-blue-600 rounded-lg shadow lg:block hover:bg-blue-700"
//           >
//             Continue Shopping
//           </button>
//         </div>

//         <div className="flex flex-col gap-8 lg:flex-row">
//           {/* Cart Items */}
//           <div className="flex-1 bg-white shadow-sm rounded-xl">
//             <div className="hidden grid-cols-12 gap-4 p-4 text-sm font-semibold text-gray-500 uppercase border-b md:grid">
//               <div className="col-span-5">Product</div>
//               <div className="col-span-2 text-center">Price</div>
//               <div className="col-span-2 text-center">Quantity</div>
//               <div className="col-span-2 text-center">Total</div>
//               <div className="col-span-1 text-right"></div>
//             </div>

//             {cartItemsArray.map((item) => (
//               <div
//                 key={item.id}
//                 className="grid grid-cols-1 gap-4 p-4 border-b md:grid-cols-12 last:border-b-0"
//               >
//                 {/* Product Info */}
//                 <div className="flex items-center gap-4 md:col-span-5">
//                   <img
//                     src={item.product?.image || "/placeholder.jpg"}
//                     alt={item.product?.title || "Product"}
//                     className="object-cover w-24 h-24 border rounded"
//                   />
//                   <div>
//                     <h3 className="font-medium text-gray-900">
//                       {item.product?.title}
//                     </h3>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="flex items-center justify-center md:col-span-2">
//                   <span className="text-gray-800">₹{item.product?.price}</span>
//                 </div>

//                 {/* Quantity */}
//                 <div className="flex items-center justify-center md:col-span-2">
//                   <div className="flex overflow-hidden border rounded">
//                     <button
//                       disabled={updating}
//                       onClick={async () => {
//                         try {
//                           await updateCartItem(item.id).unwrap();
//                           toast.success("Removed one");
//                         } catch {
//                           toast.error("Error updating quantity");
//                         }
//                       }}
//                       className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
//                     >
//                       <Minus size={16} />
//                     </button>
//                     <span className="px-4 py-1">{item.quantity}</span>
//                     <button
//                       disabled={adding}
//                       onClick={async () => {
//                         try {
//                           await addToCart(item.product.id).unwrap();
//                           toast.success("Added one");
//                         } catch {
//                           toast.error("Error adding item");
//                         }
//                       }}
//                       className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
//                     >
//                       <Plus size={16} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Total */}
//                 <div className="flex items-center justify-center md:col-span-2">
//                   <span className="font-medium text-gray-900">
//                     ₹{(item.product?.price * item.quantity).toFixed(2)}
//                   </span>
//                 </div>

//                 {/* Remove */}
//                 <div className="flex items-center justify-end md:col-span-1">
//                   <button
//                     disabled={deleting}
//                     onClick={async () => {
//                       try {
//                         await deleteFromCart(item.id).unwrap();
//                         toast.success("Item removed");
//                       } catch {
//                         toast.error("Error removing item");
//                       }
//                     }}
//                     className="text-gray-400 hover:text-red-500"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div className="space-y-6 lg:w-96">
//             <div className="sticky p-6 bg-white shadow-sm rounded-xl top-20">
//               <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
//               <div className="space-y-3 text-sm text-gray-700">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span className="font-medium">₹{subtotal}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span className="text-green-600">Free</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Tax (14%)</span>
//                   <span>₹{tax}</span>
//                 </div>
//                 <div className="flex justify-between pt-3 font-semibold border-t">
//                   <span>Total</span>
//                   <span>₹{total}</span>
//                 </div>
//               </div>

//               <div className="flex justify-center mt-3 ">
//                 <FButton
//                   fullWidth
//                   bgColor="#E5E4E2"
//                   color="black"
//                   onClick={() => navigate("/checkout")}
//                   // className="w-full max-w-2xl py-3 text-white transition bg-black rounded-lg shadow hover:bg-gray-800"
//                 >
//                   Proceed to Checkout
//                 </FButton>
//               </div>
//               <p className="mt-4 text-xs text-center text-gray-500">
//                 Free returns · Secure payment · Satisfaction guaranteed
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/common/Loader';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import {
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useDeleteFromCartMutation,
  useFetchCartItemsQuery,
} from '../../../redux/cartApi';
import { useGetProfileQuery } from '../../../redux/authApi';
import { toast } from 'react-hot-toast';

const CartPage = () => {
  const navigate = useNavigate();
  const { data: user } = useGetProfileQuery();
  const {
    data: cartData,
    isLoading: cartLoading,
    refetch,
  } = useFetchCartItemsQuery();
  console.log('cartData', cartData)

  const isAuthenticated = !!user;

  const [addToCart, { isLoading: adding }] = useAddToCartMutation();
  const [updateCartItem, { isLoading: updating }] = useUpdateCartItemMutation();
  const [deleteFromCart, { isLoading: deleting }] = useDeleteFromCartMutation();


  useEffect(() => {
    refetch();
  }, [refetch]);

  // cartData is [ {cartItems}, {cart}, {total} ]
  const cartItemsArray = cartData?.cart || [];
  const subtotal = cartData?.total || 0;
  const tax = Math.round(subtotal * 0.14);
  const total = subtotal + tax;

  if (!isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100 sm:px-6 lg:px-8 font-poppins">
        <p className="flex items-center justify-center gap-4 mb-2 text-3xl font-bold text-gray-900 font-playfair">
          <ShoppingBag size={24} />
          Login to view your cart
        </p>
        <button
          className="bg-black hover:bg-gray-800 text-white py-2.5 px-12 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md mt-2"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    );
  }

  if (cartLoading) return <Loader />;


  if (cartItemsArray.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100 sm:px-6 lg:px-8 font-poppins">
        <h1 className="flex items-center justify-center gap-4 mb-2 text-3xl font-bold text-gray-900 font-playfair">
          <ShoppingBag size={24} />
          YOUR SHOPPING BAG IS EMPTY
        </h1>
        <p className="mb-4 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
        <button
          className="bg-black hover:bg-gray-800 text-white py-3.5 px-6 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
          onClick={() => navigate('/shop')}
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-[70px] px-4 sm:px-6 lg:px-8 font-poppins lg:py-[130px]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 font-playfair">YOUR SHOPPING BAG</h1>
            <button
              className="hidden lg:block bg-black hover:bg-gray-800 text-white py-3.5 px-6 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </button>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-500">{cartItemsArray.length} items in your cart</span>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="overflow-hidden bg-white shadow-sm rounded-xl">
              {/* Table Header */}
              <div className="hidden grid-cols-12 gap-4 p-6 border-b border-gray-100 md:grid">
                <div className="col-span-5 text-sm font-medium text-gray-500 uppercase">Product</div>
                <div className="col-span-2 text-sm font-medium text-center text-gray-500 uppercase">Price</div>
                <div className="col-span-2 text-sm font-medium text-center text-gray-500 uppercase">Quantity</div>
                <div className="col-span-2 text-sm font-medium text-center text-gray-500 uppercase">Total</div>
                <div className="col-span-1"></div>
              </div>

              {/* Cart Item Rows */}
              {cartItemsArray.map((item) => (
                <div key={item.id} className="grid grid-cols-1 gap-4 p-6 border-b border-gray-100 md:grid-cols-12 last:border-0">
                  {/* Product Info */}
                  <div className="flex items-start space-x-4 md:col-span-5">
                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-lg sm:w-32 sm:h-32">
                      <img
                        src={item.product?.image || "/placeholder.jpg"}
                        alt={item.product?.title || "Product"}
                        className="object-cover w-full h-full"
                        onClick={() => navigate(`/product/${item.product.id}`)}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.product?.title}</h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex justify-center md:col-span-2 md:items-center">
                    <span className="font-medium text-gray-900">₹{item.product?.price}</span>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-center md:col-span-2 md:items-center">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        disabled={updating}
                        onClick={async () => {
                          try {
                            await updateCartItem(item.id).unwrap();
                            toast.success('Removed one');
                          } catch {
                            toast.error('Error updating quantity');
                          }
                        }}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 text-gray-900">{item.quantity}</span>
                      <button
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        disabled={adding}
                        onClick={async () => {
                          try {
                            await addToCart(item.product.id).unwrap();
                            toast.success('Added one');
                          } catch {
                            toast.error('Error adding item');
                          }
                        }}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-center md:col-span-2 md:items-center">
                    <span className="font-medium text-gray-900">₹{(item.product?.price * item.quantity).toFixed(2)}</span>
                  </div>

                  {/* Remove */}
                  <div className="flex justify-end md:col-span-1 md:items-center">
                    <button
                      className="text-gray-400 transition-colors hover:text-red-500"
                      disabled={deleting}
                      onClick={async () => {
                        try {
                          await deleteFromCart(item.id).unwrap();
                          toast.success('Item removed');
                        } catch {
                          toast.error('Error removing item');
                        }
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6 lg:w-96">
            <div className="sticky p-6 bg-white shadow-sm rounded-xl top-8">
              <h3 className="mb-4 text-lg font-bold text-gray-900 font-playfair">Order Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax 14%</span>
                  <span className="font-medium">₹{tax}</span>
                </div>
                <div className="flex justify-between pt-3 mt-3 border-t border-gray-200">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">₹{total}</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-black hover:bg-gray-800 text-white py-3.5 px-6 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>

              <p className="mt-4 text-sm text-center text-gray-500">
                Free returns · Secure payment · Satisfaction guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;