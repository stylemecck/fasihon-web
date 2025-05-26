// import React, { useEffect } from "react";
// import { ShoppingCart } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useGetProfileQuery } from "../redux/authApi";
// import { useAddToCartMutation } from "../redux/cartApi";

// const ProductCard = ({ image, title, price, description, id }) => {
//   const navigate = useNavigate();
//   const { data: userData, refetch, isLoading } = useGetProfileQuery();
//   const [addToCart, { isLoading: adding }] = useAddToCartMutation();

//   useEffect(() => {
//     // ensure user data is fresh
//     refetch();
//   }, [refetch]);

//   const handleAddToCart = async () => {
//     if (!userData) {
//       navigate("/login");
//       return;
//     }
//     try {
//       // use unwrap to get actual payload
//       const res = await addToCart(id).unwrap();
//       toast.success(res.message || "Added to cart!");
//     } catch (err) {
//       toast.error(err.data?.error || err.error || "Failed to add to cart");
//     }
//   };

//   return (
//     <div className="group bg-white rounded shadow-md md:w-[230px] sm:w-48 w-[169px] overflow-hidden relative">
//       {/* Image Section */}
//       <div className="bg-gray-200 md:h-[300px] sm:h-60 h-44 flex items-center justify-center relative overflow-hidden">
//         {image ? (
//           <img
//             src={image}
//             alt={title}
//             className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <span className="text-sm text-gray-400">No Image</span>
//         )}

//         {/* Hover Cart Section */}
//         <div className="absolute bottom-0 left-0 right-0 z-10 transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
//           <div className="flex items-center bg-black">
//             <button
//               className="flex items-center justify-center flex-1 gap-2 py-3 text-white transition hover:bg-gray-900"
//               onClick={handleAddToCart}
//               disabled={adding}
//             >
//               <ShoppingCart size={16} />
//               {adding ? "Adding..." : "Add to Cart"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Title and Price */}
//       <div className="py-3 space-y-1 text-center">
//         <p className="text-xs font-bold text-gray-800 md:text-sm">{title}</p>
//         <p className="text-xs text-gray-800 md:text-sm">
//           {description.length > 100 ? `${description.slice(0, 20)}...` : description}
//         </p>
//         <p className="text-sm font-semibold md:text-base">₹{price}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React, { useEffect, useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetProfileQuery } from "../redux/authApi";
import { useAddToCartMutation } from "../redux/cartApi";
import FBotton from "../components/FButton";
import FButton from "../components/FButton";

const ProductCard = ({ image, title, price, description, id }) => {
  const navigate = useNavigate();
  const { data: userData, refetch } = useGetProfileQuery();
  const [addToCart, { isLoading: adding }] = useAddToCartMutation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleAddToCart = async () => {
    if (!userData) {
      toast("Please login to add items to cart", { icon: "🔒" });
      navigate("/login");
      return;
    }
    try {
      const res = await addToCart(id).unwrap();
      toast.success(res.message || "Added to cart successfully!");
    } catch (err) {
      toast.error(err.data?.error || err.error || "Failed to add to cart");
    }
  };

  return (
    <div 
      className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-[260px] overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        {image ? (
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            <span>No Image Available</span>
          </div>
        )}

        {/* Add to Cart Button - Always visible but more prominent on hover */}
        
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className={`absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 py-3 text-white transition-all duration-300 ${
            isHovered ? "bg-black/90" : "bg-black/80"
          } ${adding ? "cursor-not-allowed opacity-90" : "hover:bg-black"}`}
        >
          {adding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ShoppingCart className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">
            {adding ? "Adding..." : "Add to Cart"}
          </span>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 truncate">{title}</h3>
        <p className="mt-1 text-xs text-gray-500 line-clamp-2 h-[40px]">
          {description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-base font-bold text-gray-900">₹{price}</span>
          {isHovered && (
            <button 
              onClick={() => navigate(`/product/${id}`)}
              className="text-xs font-medium text-gray-600 hover:text-gray-900"
            >
              View Details
            </button>
          )}
        </div>
      </div>

      {/* Quick view on hover */}
      {/* {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <button 
            onClick={() => navigate(`/product/${id}`)}
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
          >
            Quick View
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ProductCard;