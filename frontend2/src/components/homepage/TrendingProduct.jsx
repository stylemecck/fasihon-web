// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useGetProductsQuery } from "../../redux/productApi";
// import { useAddToCartMutation } from "../../redux/cartApi";
// import { useGetProfileQuery } from "../../redux/authApi";
// import toast from "react-hot-toast";
// import Container from "../../components/common/Container";
// import Loader from "../../components/common/Loader";

// const TrendingProducts = () => {
//   const { data: products, error, isError, isLoading } = useGetProductsQuery();
//   const productList = products?.products?.slice(0, 10) || [];

//   const { data: userData, refetch } = useGetProfileQuery();
//   const [addToCart, { isLoading: adding }] = useAddToCartMutation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   const handleAddToCart = async (productId) => {
//     if (!userData) {
//       navigate("/login");
//       return;
//     }
//     try {
//       const res = await addToCart(productId).unwrap();
//       toast.success(res.message || "Added to cart!");
//     } catch (err) {
//       toast.error(err.data?.error || err.error || "Failed to add to cart");
//     }
//   };

//   const themeColors = {
//     primary: "bg-blue-600 hover:bg-blue-700",
//     secondary: "bg-gray-100 hover:bg-gray-200",
//     textPrimary: "text-gray-900",
//     textSecondary: "text-gray-600",
//     border: "border-gray-200",
//   };

//   if (isLoading) return <Loader />;

//   if (isError) {
//     return (
//       <div
//         className={`w-full ${themeColors.textPrimary} flex h-screen justify-center items-center`}
//       >
//         Error: {error.message}
//       </div>
//     );
//   }

//   return (
//     <Container className=" max-w-[90vw]">
//       <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">
//             Trending Products
//           </h1>
//           <p className="mt-2 text-gray-600">
//             Discover this week's most wanted items
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
//         {productList.map((product) => (
//           <div key={product.id} className="relative group">
//             <div className="relative mb-4 overflow-hidden h-72 bg-gray-50 rounded-xl">
//               {product.image ? (
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="object-cover w-full h-full transition-transform duration-500 cursor-pointer group-hover:scale-105"
//                 />
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400">
//                   <span>Product Image</span>
//                 </div>
//               )}
//               <div className="absolute px-2 py-1 text-xs font-medium rounded-full top-3 left-3 bg-white/90 backdrop-blur-sm">
//                 {product.category}
//               </div>
//               <button
//                 onClick={() => handleAddToCart(product.id)}
//                 className="absolute p-2 text-black transition-all duration-300 rounded-full shadow-sm opacity-0 bottom-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white group-hover:opacity-100"
//                 aria-label={`Add ${product.name} to cart`}
//                 disabled={adding}
//               >
//                 <svg
//                   className="w-5 h-5 cursor-pointer"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                   />
//                 </svg>
//               </button>
//             </div>

//             <div className="px-1">
//               <h2 className="font-medium text-gray-900 transition-colors cursor-pointer group-hover:text-gray-600">
//                 {product.title}
//               </h2>
//               <p className="text-sm text-gray-500">
//                 {product.color || "Various colors"}
//               </p>
//               <div className="flex items-center justify-between mt-2">
//                 <p className="font-semibold text-gray-900">${product.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(product.id)}
//                   className="flex items-center justify-center gap-1 px-4 py-2 text-xs font-medium text-white transition-all duration-300 rounded-full shadow-md group lg:hidden bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 hover:shadow-lg active:scale-95"
//                   disabled={adding}
//                 >
//                   <span className="transition-all duration-300 ease-in-out transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                       />
//                     </svg>
//                   </span>
//                   <span className="transition-all duration-300 ease-in-out group-hover:ml-1">
//                     {adding ? "Adding..." : "Add to Cart"}
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-12 text-center">
//         <a
//           href="#"
//           className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-full hover:bg-gray-50"
//         >
//           Load More Products
//           <svg
//             className="w-4 h-4 ml-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 14l-7 7m0 0l-7-7m7 7V3"
//             />
//           </svg>
//         </a>
//       </div>
//     </Container>
//   );
// };

// export default TrendingProducts;


// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useGetProductsQuery } from "../../redux/productApi";
// import { useAddToCartMutation } from "../../redux/cartApi";
// import { useGetProfileQuery } from "../../redux/authApi";
// import toast from "react-hot-toast";
// import Container from "../../components/common/Container";
// import Loader from "../../components/common/Loader";
// import { ShoppingBag, Plus, ArrowDown } from "lucide-react";

// const TrendingProducts = () => {
//   const { data: products, error, isError, isLoading } = useGetProductsQuery();
//   const { data: userData, refetch } = useGetProfileQuery();
//   const [addToCart, { isLoading: adding }] = useAddToCartMutation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   const handleAddToCart = async (productId) => {
//     if (!userData) {
//       toast("Please login to add items to cart", { icon: "🔒" });
//       navigate("/login");
//       return;
//     }
//     try {
//       const res = await addToCart(productId).unwrap();
//       toast.success(res.message || "Added to cart successfully!");
//     } catch (err) {
//       toast.error(err.data?.error || err.error || "Failed to add to cart");
//     }
//   };

//   if (isLoading) return <Loader />;

//   if (isError) {
//     return (
//       <div className="flex items-center justify-center w-full h-screen text-red-500">
//         Error: {error.message}
//       </div>
//     );
//   }

//   // Get top 10 products or empty array if none
//   const trendingProducts = products?.products?.slice(0, 10) || [];

//   return (
//     <Container className="py-12 max-w-7xl">
//       {/* Section Header */}
//       <div className="flex flex-col items-center mb-12 text-center">
//         <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
//           Trending This Week
//         </h2>
//         <p className="max-w-2xl mt-4 text-gray-600">
//           Discover our most popular products this week
//         </p>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
//         {trendingProducts.map((product) => (
//           <div 
//             key={product.id} 
//             className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-xl hover:shadow-lg group"
//           >
//             {/* Product Image */}
//             <div className="relative aspect-square">
//               {product.image ? (
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
//                   loading="lazy"
//                 />
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-100">
//                   <span>No Image</span>
//                 </div>
//               )}

//               {/* Category Badge */}
//               {product.category && (
//                 <span className="absolute px-3 py-1 text-xs font-medium bg-white rounded-full top-3 left-3">
//                   {product.category}
//                 </span>
//               )}

//               {/* Quick Add Button */}
//               <button
//                 onClick={() => handleAddToCart(product.id)}
//                 disabled={adding}
//                 className={`absolute flex items-center justify-center p-2 transition-all duration-300 bg-white rounded-full shadow-md right-3 top-3 ${
//                   adding ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-100"
//                 }`}
//                 aria-label={`Add ${product.title} to cart`}
//               >
//                 {adding ? (
//                   <div className="w-5 h-5 border-t-2 border-b-2 border-gray-800 rounded-full animate-spin" />
//                 ) : (
//                   <Plus className="w-5 h-5 text-gray-800" />
//                 )}
//               </button>
//             </div>

//             {/* Product Info */}
//             <div className="p-4">
//               <h3 className="font-medium text-gray-900 truncate">{product.title}</h3>
//               <p className="mt-1 text-sm text-gray-500 line-clamp-2 min-h-[40px]">
//                 {product.description || "No description available"}
//               </p>
              
//               <div className="flex items-center justify-between mt-4">
//                 <span className="text-lg font-bold text-gray-900">
//                   ₹{product.price.toLocaleString()}
//                 </span>
                
//                 <button
//                   onClick={() => handleAddToCart(product.id)}
//                   disabled={adding}
//                   className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 ${
//                     adding ? "opacity-80 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   <ShoppingBag className="w-4 h-4" />
//                   {adding ? "Adding..." : "Add"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* View More Button */}
//       <div className="mt-16 text-center">
//         <button
//           onClick={() => navigate("/products")}
//           className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-full hover:bg-gray-50"
//         >
//           View All Products
//           <ArrowDown className="w-4 h-4 ml-2" />
//         </button>
//       </div>
//     </Container>
//   );
// };

// export default TrendingProducts;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/productApi";
import { useAddToCartMutation } from "../../redux/cartApi";
import { useGetProfileQuery } from "../../redux/authApi";
import toast from "react-hot-toast";
import Container from "../../components/common/Container";
import Loader from "../../components/common/Loader";
import { ShoppingBag, Plus, ArrowDown } from "lucide-react";
import FButton from "../FButton";

const TrendingProducts = () => {
  const { data: products, error, isError, isLoading } = useGetProductsQuery();
  const { data: userData, refetch } = useGetProfileQuery();
  const [addToCart, { isLoading: adding }] = useAddToCartMutation();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleAddToCart = async (productId) => {
    if (!userData) {
      toast("Please login to add items to cart", { icon: "🔒" });
      navigate("/login");
      return;
    }
    try {
      const res = await addToCart(productId).unwrap();
      toast.success(res.message || "Added to cart successfully!");
    } catch (err) {
      toast.error(err.data?.error || err.error || "Failed to add to cart");
    }
  };

  const handleBuyNow = async (productId) => {
    if (!userData) {
      toast("Please login to purchase items", { icon: "🔒" });
      navigate("/login");
      return;
    }
    try {
      const res = await addToCart(productId).unwrap();
      toast.success(res.message || "Item ready for checkout!");
      navigate("/checkout"); // Redirect to checkout immediately
    } catch (err) {
      toast.error(err.data?.error || err.error || "Failed to process purchase");
    }
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }

  const trendingProducts = products?.products?.slice(0, 10) || [];

  return (
    <Container className="py-12 max-w-7xl">
      <div className="flex flex-col items-center mb-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Trending This Week
        </h2>
        <p className="max-w-2xl mt-4 text-gray-600">
          Discover our most popular products this week
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {trendingProducts.map((product) => (
          <div 
            key={product.id} 
            className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-xl hover:shadow-lg group"
          >
            <div className="relative aspect-square">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-100">
                  <span>No Image</span>
                </div>
              )}

              {product.category && (
                <span className="absolute px-3 py-1 text-xs font-medium bg-white rounded-full top-3 left-3">
                  {product.category}
                </span>
              )}

              {/* Quick Add to Cart Button (Plus icon) */}
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product.id);
                }}
                disabled={adding}
                className={`absolute flex items-center justify-center p-2 transition-all duration-300 bg-white rounded-full shadow-md right-3 top-3 ${
                  adding ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-100"
                }`}
                aria-label={`Add ${product.title} to cart`}
              >
                {adding ? (
                  <div className="w-5 h-5 border-t-2 border-b-2 border-gray-800 rounded-full animate-spin" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-800" />
                )}
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-gray-900 truncate">{product.title}</h3>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2 min-h-[40px]">
                {product.description || "No description available"}
              </p>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                
                {/* Buy Now Button (redirects to checkout) */}
                <FButton
                  onClick={(e) => {
                    e.preventDefault();
                    handleBuyNow(product.id);
                  }}
                  disabled={adding}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 ${
                    adding ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {adding ? "Processing..." : "Buy Now"}
                </FButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={() => navigate("/products")}
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-full hover:bg-gray-50"
        >
          View All Products
          <ArrowDown className="w-4 h-4 ml-2" />
        </button>
      </div>
    </Container>
  );
};

export default TrendingProducts;