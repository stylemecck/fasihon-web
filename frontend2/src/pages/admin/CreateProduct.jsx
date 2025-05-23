import React, { use, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, getAllProducts } from '../../redux/productSlice';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.products);
  const {user} = useSelector((state) => state.auth);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    gender: '',
    category: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('gender', formData.gender);
    data.append('category', formData.category);
    if (formData.image) {
      data.append('image', formData.image);
    }

    dispatch(createProduct(data));
    dispatch(getAllProducts());

    setFormData({
      title: '',
      description: '',
      price: '',
      gender: '',
      category: '',
      image: null,
    });
    setPreviewImage(null);
    if (status === 'succeeded') {
      navigate("/adminDashboard/products");
    }

  };

  return (
    <div className="w-[100%] h-screen mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="mx-auto mb-6 text-2xl font-bold text-purple-700 w-max">Create New Product</h2>
      <form onSubmit={handleSubmit}
        className="space-y-4 w-screen md:w-[60%] mx-auto"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <div className="flex items-center mt-1">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="object-cover w-32 h-32 rounded-md"
              />
            ) : (
              <div className="flex items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-md">
                <span className="text-center text-gray-400">No image selected</span>
              </div>
            )}
            <label className="ml-4 cursor-pointer">
              <span className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                Choose File
              </span>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                required
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            step="0.01"
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 ">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="block w-full h-10 mt-1 border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="block w-full h-10 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Shirts">Shirts</option>
              <option value="T-shirts">T-shirts</option>
              <option value="Shorts">Shorts</option>
              <option value="Jeans">Jeans</option>
              <option value="Casual-Trousers">Casual Trousers</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mt-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {user?.error ? (
          <div className="mt-2 text-sm text-center text-red-600">
            {user.error} : please try again
          </div>
        ) : null}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {status === 'loading' ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}