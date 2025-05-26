import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Truck, 
  ShoppingBag, 
  Home, 
  Package, 
  Clock, 
  CreditCard, 
  MapPin,
  Sparkles,
  ArrowRight,
  Heart // Add this
} from 'lucide-react';
import FButton from '../../components/FButton';

const FloatingConfetti = ({ show }) => {
  // ... (Use the exact FloatingConfetti component code from previous examples)
  const rainbowColors = [
        '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3',
        '#FF1493', '#00CED1', '#32CD32', '#FFD700', '#FF69B4', '#8A2BE2', '#FF4500',
        '#DC143C', '#00FA9A', '#1E90FF', '#FF6347', '#9370DB', '#20B2AA'
    ];
    const confettiPieces = Array.from({ length: 200 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: rainbowColors[Math.floor(Math.random() * rainbowColors.length)],
        size: Math.random() * 4 + 3,
        delay: Math.random() * 3,
        duration: Math.random() * 4 + 3,
        wind: (Math.random() - 0.5) * 150,
        shape: Math.random() > 0.5 ? 'circle' : Math.random() > 0.5 ? 'square' : 'triangle'
    }));

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
                    {confettiPieces.map((piece) => (
                        <motion.div
                            key={piece.id}
                            className="absolute shadow-lg opacity-90"
                            style={{
                                left: `${piece.x}%`,
                                width: `${piece.size}px`,
                                height: `${piece.size}px`,
                                backgroundColor: piece.color,
                                borderRadius: piece.shape === 'circle' ? '50%' : '0%',
                                clipPath: piece.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
                                filter: 'brightness(1.2) saturate(1.3)',
                                boxShadow: `0 0 10px ${piece.color}40`
                            }}
                            initial={{
                                y: piece.y,
                                rotation: piece.rotation,
                                opacity: 0,
                                scale: 0
                            }}
                            animate={{
                                y: window.innerHeight + 100,
                                rotation: piece.rotation + 1080,
                                x: piece.wind,
                                opacity: [0, 1, 1, 0.8, 0],
                                scale: [0, 1.2, 1, 0.8, 0.6]
                            }}
                            transition={{
                                duration: piece.duration,
                                delay: piece.delay,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                        />
                    ))}

                    {/* Rainbow streamers */}
                    {Array.from({ length: 15 }).map((_, i) => (
                        <motion.div
                            key={`streamer-${i}`}
                            className="absolute opacity-70"
                            style={{
                                left: `${Math.random() * 100}%`,
                                width: '4px',
                                height: '60px',
                                background: `linear-gradient(to bottom, ${rainbowColors[i % rainbowColors.length]}, transparent)`,
                                filter: 'blur(0.5px)'
                            }}
                            initial={{
                                y: -60,
                                rotation: Math.random() * 360,
                                opacity: 0
                            }}
                            animate={{
                                y: window.innerHeight + 60,
                                rotation: Math.random() * 720,
                                x: (Math.random() - 0.5) * 200,
                                opacity: [0, 0.8, 0.8, 0]
                            }}
                            transition={{
                                duration: Math.random() * 3 + 4,
                                delay: Math.random() * 2,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </div>
            )}
        </AnimatePresence>
    );
};

const ParticleField = () => {
  // ... (Use the exact ParticleField component code from previous examples)
   const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute bg-black rounded-full opacity-20"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.1, 0.4, 0.1],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );

};

const AnimatedBackground = () => {
  // ... (Use the exact AnimatedBackground component code from previous examples)
  return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Geometric shapes */}
            <motion.div
                className="absolute w-20 h-20 border-2 border-black top-20 left-10 opacity-10"
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <motion.div
                className="absolute w-16 h-16 bg-black rounded-full top-40 right-20 opacity-5"
                animate={{
                    y: [0, -40, 0],
                    x: [0, 20, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute w-12 h-12 border-2 border-black bottom-40 left-1/4 opacity-10"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                animate={{
                    rotate: [0, -360],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );

};

const EcommerceSuccessPage = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);
  const [orderDetails] = useState({
    orderNumber: location.state?.orderNumber || 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    amount: location.state?.amount || 0,
    deliveryDate: location.state?.deliveryDate || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    products: location.state?.products || []
  });
  const controls = useAnimationControls();

  useEffect(() => {
    const sequence = async () => {
      setShowConfetti(true);
      await controls.start("visible");
      await new Promise(resolve => setTimeout(resolve, 4000));
      setShowConfetti(false);
    };
    sequence();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const deliveryDateString = orderDetails.deliveryDate.toLocaleDateString("en-IN", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <FloatingConfetti show={showConfetti} />
      <AnimatedBackground />
      <ParticleField />

      <motion.div
        className="container relative z-10 max-w-6xl px-6 py-20 mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="max-w-4xl mx-auto">
          {/* Success Icon */}
          <motion.div 
            className="relative flex justify-center mb-16"
            variants={itemVariants}
          >
            <motion.div
              className="relative flex items-center justify-center w-32 h-32 bg-black rounded-full"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <CheckCircle className="w-16 h-16 text-white" />
              <motion.div
                className="absolute inset-0 border-2 border-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <div className="mb-16 text-center">
            <motion.h1
              className="mb-8 text-5xl font-black text-black"
              variants={itemVariants}
            >
              Order Confirmed! 🎉
            </motion.h1>
            
            <motion.p
              className="max-w-2xl mx-auto mb-16 text-xl text-gray-600"
              variants={itemVariants}
            >
              Thank you for your purchase! We're preparing your order with care.
            </motion.p>
          </div>

          {/* Order Details */}
          <motion.div
            className="p-8 mb-16 bg-white border-2 border-black shadow-2xl rounded-2xl"
            variants={itemVariants}
          >
            <div className="grid gap-8 md:grid-cols-2">
              {/* Delivery Info */}
              <motion.div 
                className="p-6 border-2 border-gray-200 rounded-xl"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 text-white bg-black rounded-lg">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Delivery Details</h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>Expected by {deliveryDateString}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    <span>{orderDetails.products.length} items</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>Delivering to {location.state?.city || 'your city'}</span>
                  </p>
                </div>
              </motion.div>

              {/* Payment Summary */}
              <motion.div 
                className="p-6 border-2 border-gray-200 rounded-xl"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 text-white bg-black rounded-lg">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Payment Summary</h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p className="flex justify-between">
                    <span>Total Paid:</span>
                    <span className="font-semibold">
                      ₹{orderDetails.amount.toLocaleString('en-IN')}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-semibold">Razorpay</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-semibold text-green-600">Completed</span>
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Order Number */}
            <motion.div 
              className="flex items-center justify-between p-4 mt-8 bg-gray-100 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-semibold">Order ID:</span>
                <span className="font-mono">{orderDetails.orderNumber}</span>
              </div>
              <button 
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                onClick={() => navigator.clipboard.writeText(orderDetails.orderNumber)}
              >
                <span>Copy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col justify-center gap-6 sm:flex-row"
            variants={itemVariants}
          >
            <FButton onClick={()=> Navigate('/shop')} variant="primary" className="w-full sm:w-auto">
              <ShoppingBag className="w-5 h-5" />
              <span>Continue Shopping</span>
              <Sparkles className="w-5 h-5" />
            </FButton>
            
            <FButton onClick={()=> Navigate('/')} variant="secondary" className="w-full sm:w-auto">
              <Home className="w-5 h-5" />
              <span>Return Home</span>
            </FButton>
          </motion.div>

          {/* Thank You Message */}
          <motion.div
            className="mt-16 text-center text-gray-600"
            variants={itemVariants}
          >
            <p className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Your satisfaction is our priority! 
              <Heart className="w-5 h-5 text-red-500" />
            </p>
          </motion.div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default EcommerceSuccessPage;