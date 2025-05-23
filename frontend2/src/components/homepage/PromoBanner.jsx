import React from 'react';

const PromoBanner = () => {
  return (
    <div className="relative px-4 mx-auto my-8 md:my-12 lg:my-16 group max-w-7xl sm:px-6 lg:px-8">
      {/* Glowing border effect */}
      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 rounded-2xl bg-gradient-to-r from-amber-400/20 via-pink-400/20 to-purple-400/20 group-hover:opacity-70 blur-xl -z-10" />
      
      {/* Main container */}
      <div className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg dark:bg-gray-900 dark:border-gray-800 rounded-2xl group-hover:shadow-xl dark:shadow-gray-800/30">
        <div className="flex flex-col lg:flex-row">
          {/* Text Content */}
          <div className="flex flex-col justify-center flex-1 p-6 sm:p-8 lg:p-10 xl:p-12">
            <div className="max-w-lg">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-white transition-shadow rounded-full shadow-sm bg-gradient-to-r from-amber-400 to-pink-400 sm:text-sm sm:px-4 sm:mb-4 hover:shadow-md">
                Limited Time Offer
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-white sm:mb-4">
                Spring Collection <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-pink-500">Sale</span>
              </h2>
              <p className="mb-6 text-base text-gray-600 sm:text-lg dark:text-gray-300 sm:mb-8">
                Discover fresh styles with up to 50% off. Don't miss out on these exclusive deals!
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a
                  href="/shop"
                  className="relative overflow-hidden inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Shop Now</span>
                  <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-amber-600 to-pink-600 hover:opacity-100" />
                  <svg className="relative z-10 w-4 h-4 ml-2 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="/shop"
                  className="inline-flex items-center justify-center border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md hover:-translate-y-0.5"
                >
                  View All Collections
                </a>
              </div>
            </div>
          </div>

          {/* Promo Product Image */}
          <div className="relative lg:w-2/5 h-64 sm:h-80 lg:h-auto min-h-[250px]">
            <div className="absolute inset-0 transition-opacity duration-500 rounded-lg opacity-0 bg-gradient-to-r from-amber-400/10 to-pink-400/10 group-hover:opacity-100" />
            <img
              src="https://res.cloudinary.com/drwyb8kwy/image/upload/v1747988284/t0xhrqkp2xicjoeidre2.png"
              alt="Spring collection"
              className="object-cover w-full h-full transition-transform duration-500 lg:absolute lg:inset-0 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-800 transition-transform hover:scale-105">
              <span className="text-sm font-bold text-transparent sm:text-base bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text">
                50% OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;