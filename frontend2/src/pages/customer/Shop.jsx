import React from 'react';
import ProductCard from '../../components/ProductCard';
import { useGetProductsQuery } from '../../redux/productApi';
import Container from '../../components/common/Container';
import Loader from '../../components/common/Loader';

const Shop = () => {
  const { data: products, error, isError, isLoading } = useGetProductsQuery();
  const productList = products?.products || [];

  const themeColors = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-100 hover:bg-gray-200',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    border: 'border-gray-200',
  };

  if (isError) {
    return (
      <div className={`w-full ${themeColors.textPrimary} flex h-screen justify-center items-center`}>
        Error: {error.message}
      </div>
    );
  }

  if (isLoading) return <Loader />;

  return (
    <Container className={`py-16 px-4 md:px-8 ${themeColors.textPrimary} mt-[8%]`}>
     

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productList.map((product) => (
          <ProductCard key={product.id} {...product} themeColors={themeColors} />
        ))}
      </div>
    </Container>
  );
};

export default Shop;
