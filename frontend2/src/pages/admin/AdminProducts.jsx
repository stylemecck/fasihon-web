import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Edit, Trash2, MoreVertical,
} from 'lucide-react';
import { deleteProduct, getAllProducts } from '../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchData } from '../../redux/productSlice';
import { Link } from 'react-router-dom';
import Loader from '../../components/common/Loader';


const AdminProducts = () => {
  const filterOptions = [
    {
      label: 'Shirts',
    },
    {
      label: 'T-Shirts',
    },
    {
      label: 'Jeans',
    },
    {
      label: 'Casual-Trousers',
    },
  ];

  const genderOptions = [
    {
      label: 'Men',
    },
    {
      label: 'Women',
    },
    {
      label: 'Unisex',
    }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // redux selector
  const { products, status, error, searchData } = useSelector((state) => state.products);
  const dispatch = useDispatch()
  console.log('products', products)

  // Search Products
  const [searchProduct, setSearchProduct] = useState('');
  console.log('searchProduct', searchProduct)

  // Category for filtering
  const [categoryFilter, setCategoryFilter] = useState('');
  console.log('categoryFilter', categoryFilter)

  // Category for filtering
  const [genderFilter, setGenderFilter] = useState('');
  console.log('genderFilter', genderFilter)


  useEffect(() => {
    if (searchProduct) {
      dispatch(addSearchData(searchProduct));
    }
  }, [searchProduct, dispatch]);



  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, products.length]);


  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  }


  if (status === 'loading') return <Loader />;

  if (status === 'failed') return <p className='flex items-center justify-center w-full h-screen text-2xl'>Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-[80%]">
      {/* Header */}
      <div className="flex flex-col items-start justify-center mb-6 md:flex-row md:items-center">
        <h1 className="mb-4 text-2xl font-bold text-purple-700 md:mb-0">Product Management</h1>
      </div>

      {/* Filters and Search */}
      <div className="p-4 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              placeholder="Search Products..."
              className="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              type="search"
              aria-label="Search"
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />

          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
            <select
              name="product"
              className="block w-full py-2 pl-10 pr-3 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Product</option>
              {filterOptions?.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
            <select
              className="block w-full py-2 pl-10 pr-3 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">All</option>
              {genderOptions?.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>


      {/* Productts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 md:overflow-hidden mb-6
      h-[70vh] lg:overflow-y-scroll w-full">
        <div className="overflow-x-auto">
           <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Product</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Category</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Price</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Description</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">gender</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">

              {products.products &&
                products.products
                  .filter((product) => {
                    if (searchProduct.trim() === '') return true;
                    const combined = `${product.title} ${product.category} `.toLowerCase();
                    return combined.includes(searchProduct.toLowerCase());
                  }).filter((product) => {
                    if (categoryFilter === '') return true;
                    return product.category.toLowerCase() === categoryFilter.toLowerCase();
                  }).filter((product) => {
                    if (genderFilter === '') return true;
                    return product.gender === genderFilter.toLowerCase();
                  }).map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 ">
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-lg">
                            {/* add product image  */}
                            <img src={product.image}
                              alt="new product"
                              className='object-cover w-full h-full rounded-lg'
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 capitalize whitespace-nowrap">{product.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">₹{product.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {product.description.length > 20
                          ? `${product.description.slice(0, 20)}...`
                          : product.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{product.gender}</td>
                     
                     
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <div className="flex justify-end space-x-2">
                          {/* TODO: Edit Button */}
                          <Link
                            to={`/adminDashboard/update/${product.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>

                          {/* TODO: Delete Button */}
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                  )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default AdminProducts;