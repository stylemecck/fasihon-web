import React, { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetProfileQuery } from "../redux/authApi";
import { useAddToCartMutation } from "../redux/cartApi";

const ProductCard = ({ image, title, price, description, id }) => {
  const navigate = useNavigate();
  const { data: userData, refetch, isLoading } = useGetProfileQuery();
  const [addToCart, { isLoading: adding }] = useAddToCartMutation();

  useEffect(() => {
    // ensure user data is fresh
    refetch();
  }, [refetch]);

  const handleAddToCart = async () => {
    if (!userData) {
      navigate("/login");
      return;
    }
    try {
      // use unwrap to get actual payload
      const res = await addToCart(id).unwrap();
      toast.success(res.message || "Added to cart!");
    } catch (err) {
      toast.error(err.data?.error || err.error || "Failed to add to cart");
    }
  };

  return (
    <div className="group bg-white rounded shadow-md md:w-[230px] sm:w-48 w-[169px] overflow-hidden relative">
      {/* Image Section */}
      <div className="bg-gray-200 md:h-[300px] sm:h-60 h-44 flex items-center justify-center relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="text-sm text-gray-400">No Image</span>
        )}

        {/* Hover Cart Section */}
        <div className="absolute bottom-0 left-0 right-0 z-10 transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
          <div className="flex items-center bg-black">
            <button
              className="flex items-center justify-center flex-1 gap-2 py-3 text-white transition hover:bg-gray-900"
              onClick={handleAddToCart}
              disabled={adding}
            >
              <ShoppingCart size={16} />
              {adding ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Title and Price */}
      <div className="py-3 space-y-1 text-center">
        <p className="text-xs font-bold text-gray-800 md:text-sm">{title}</p>
        <p className="text-xs text-gray-800 md:text-sm">
          {description.length > 100 ? `${description.slice(0, 20)}...` : description}
        </p>
        <p className="text-sm font-semibold md:text-base">₹{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;