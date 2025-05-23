import React from 'react';

const Container = ({ children, className = '' }) => {
  return (
    <div
      className={`w-[90vw] mx-auto min-h-screen px-4 py-8 flex flex-wrap justify-center items-center gap-4 md:gap-6 ${className} `}
    >
      {children}
    </div>
  );
};

export default Container;
