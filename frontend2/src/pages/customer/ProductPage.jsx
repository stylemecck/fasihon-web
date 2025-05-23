import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Truck, ArrowLeft, Loader2, Heart } from 'lucide-react';
import { useGetProductByIdQuery } from '../../redux/productApi';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError, error } = useGetProductByIdQuery(id);

  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (product?.image) {
      setSelectedImage(product.image);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-gray-500 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-medium text-red-600">Error loading product</h2>
          <p className="mt-2 text-gray-600">
            {error?.data?.message || 'Failed to load product details'}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 mt-4 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) return <div>Product not found</div>;

  const descriptionParagraphs = product.description
    .split('\r\n\r\n')
    .filter(p => p.trim());

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-8 text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Collection
        </button>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            <motion.div
              className="relative overflow-hidden bg-white rounded-lg shadow-md"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src={selectedImage}
                alt={product.title}
                className="object-contain w-full h-96"
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute p-2 bg-white rounded-full shadow-md top-4 right-4"
              >
                <Heart
                  size={24}
                  fill={isWishlisted ? 'red' : 'none'}
                  stroke={isWishlisted ? 'red' : 'currentColor'}
                />
              </button>
            </motion.div>

            {/* Simulated thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <motion.img
                  key={index}
                  src={product.image}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover h-24 border-2 rounded-md cursor-pointer hover:border-gray-300"
                  onClick={() => setSelectedImage(product.image)}
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4">
                <p className="text-2xl font-medium text-gray-800 md:text-3xl">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(product.rating || 4) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Category: {product.category} | For: {product.gender}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
              <div className="space-y-3 text-gray-700">
                {descriptionParagraphs.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Quantity + Buttons */}
            <div className="pt-4 space-y-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <motion.button
                  className="flex items-center justify-center flex-1 py-3 space-x-3 text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={20} />
                  <span className="text-lg font-medium">Add to Cart</span>
                </motion.button>

                <motion.button
                  className="flex items-center justify-center flex-1 py-3 space-x-3 text-gray-900 transition-colors border border-gray-900 rounded-lg hover:bg-gray-50"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg font-medium">Buy Now</span>
                </motion.button>
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <Truck size={20} className="text-gray-400" />
                <span>Free shipping & returns</span>
              </div>
            </div>

            {/* Static Info */}
            <div className="pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-500">✓</div>
                  <p className="text-sm text-gray-600">
                    Authentic handwoven silk with pure zari work
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-500">✓</div>
                  <p className="text-sm text-gray-600">
                    Includes matching blouse piece (unstitched)
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-500">✓</div>
                  <p className="text-sm text-gray-600">
                    Ready to ship within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default ProductPage;
