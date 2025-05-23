import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchData } from '../redux/productSlice';
import { FaBars, FaTimes, FaShoppingBag, FaUser, FaSearch } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import toast from 'react-hot-toast';
import { useFetchCartItemsQuery } from '../redux/cartApi';
import { useGetProfileQuery, useLogoutMutation } from '../redux/authApi';

const Navbar = () => {
  const [logout] = useLogoutMutation();
  const { data: User, refetch } = useGetProfileQuery();
  const { data: cart, isLoading: cartLoading, refetch: cartRefetch } = useFetchCartItemsQuery();
  const cartItems = cart?.[1]?.cart || [];

  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [hovered, setHovered] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMenDropdown, setShowMenDropdown] = useState(false);
  const [showWomenDropdown, setShowWomenDropdown] = useState(false);

  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(addSearchData(search));
    navigate('/search');
    setShowSearch(false);
  };

  const isAuthenticated = !!User;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      await refetch();
      await cartRefetch();
      navigate('/');
      toast.success("Logout successful");
      setShowUserMenu(false);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 font-medium transition-all duration-300 ${
      isActive ? 'text-rose-500 font-semibold' : 'text-gray-800 hover:text-rose-500'
    }`;

  const menuItems = [
    { label: 'HOME', path: '/' },
    { label: 'SHOP', path: '/shop' },
    { label: "MEN'S", path: '/mens', dropdown: true },
    { label: "WOMEN'S", path: '/womens', dropdown: true },
    { label: 'CART', path: '/cart' },
  ];

  const menLinks = [
    { label: "Shirts", path: "/mens/shirts" },
    { label: "T-Shirts", path: "/mens/t-shirts" },
    { label: "Casual Trousers", path: "/mens/casual-trousers" },
  ];

  const womenLinks = [
    { label: "Jeans", path: "/womens/jeans" },
    { label: "T-Shirts", path: "/womens/t-shirts" },
  ];

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed z-50 w-full text-black border-b border-gray-100 shadow-sm bg-white/90 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
        {/* Hamburger */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-xl text-gray-700 transition-colors md:hidden hover:text-rose-500"
        >
          {showMenu ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo */}
        <div className="flex-grow text-center md:flex-grow-0">
          <h1 className="font-serif text-xl font-bold tracking-widest">Fashion Ease</h1>
          <p className="text-xs text-gray-500">The best place for fashion</p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => setShowSearch(true)}
            className="items-center hidden gap-1 text-gray-700 transition-colors md:flex hover:text-rose-500"
          >
            <FaSearch className="text-lg" />
            {/* <span className="text-sm">SEARCH</span> */}
          </button>

          <div className="relative flex items-center gap-1">
            <button 
              onClick={() => navigate('/cart')}
              className="flex items-center gap-1 text-gray-700 transition-colors hover:text-rose-500"
            >
              <FaShoppingBag className="text-lg" />
              <span className="hidden text-sm md:inline">CART ({cartItems.length})</span>
            </button>
            {!cartLoading && cartItems.length > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-2 -right-2 bg-rose-500">
                {cartItems.length}
              </span>
            )}
          </div>

          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="text-gray-700 transition-colors hover:text-rose-500"
            >
              <FaUser className="text-lg" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 z-50 w-48 mt-2 bg-white border border-gray-100 rounded-md shadow-lg">
                {isAuthenticated ? (
                  <>
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Account
                    </NavLink>
                    <button 
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-rose-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Nav Links */}
      <nav className="relative z-40 justify-center hidden gap-1 py-3 md:flex bg-white/80">
        {menuItems.map((item) => {
          const links = item.label === "MEN'S" ? menLinks : womenLinks;
          
          return (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.dropdown && setHovered(item.label)}
              onMouseLeave={() => item.dropdown && setHovered('')}
            >
              <NavLink 
                to={item.path} 
                className={linkClass}
              >
                {item.label}
                {item.dropdown && (
                  <IoIosArrowDown className={`inline ml-1 transition-transform ${
                    hovered === item.label ? 'rotate-180' : ''
                  }`} />
                )}
              </NavLink>

              {item.dropdown && hovered === item.label && (
                <div className="absolute z-50 w-56 p-2 mt-1 space-y-1 transform -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-xl left-1/2 top-full">
                  {links.map((link) => (
                    <NavLink
                      key={link.label}
                      to={link.path}
                      className="block px-4 py-2 text-sm text-gray-700 transition rounded-md hover:bg-rose-50"
                      onClick={() => setHovered('')}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="space-y-1 bg-white border-t border-gray-100 shadow-lg md:hidden">
          {menuItems.map((item) => {
            if (item.label === "MEN'S" || item.label === "WOMEN'S") {
              const links = item.label === "MEN'S" ? menLinks : womenLinks;
              const isOpen = item.label === "MEN'S" ? showMenDropdown : showWomenDropdown;
              const toggle = item.label === "MEN'S" 
                ? () => setShowMenDropdown(!showMenDropdown) 
                : () => setShowWomenDropdown(!showWomenDropdown);

              return (
                <div key={item.label}>
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 font-medium text-left text-gray-800"
                    onClick={toggle}
                  >
                    {item.label}
                    <IoIosArrowDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="py-2 pl-6 space-y-1 bg-gray-50">
                      {links.map((link) => (
                        <NavLink
                          key={link.label}
                          to={link.path}
                          className="block px-4 py-2 text-sm text-gray-700 rounded hover:bg-rose-50"
                          onClick={() => setShowMenu(false)}
                        >
                          {link.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.path}
                className="block px-4 py-3 font-medium text-gray-800 hover:bg-gray-50"
                onClick={() => setShowMenu(false)}
              >
                {item.label}
              </NavLink>
            );
          })}
        </div>
      )}

      {/* Search Overlay */}
      {showSearch && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-white/95"
          ref={searchRef}
        >
          <button 
            onClick={() => setShowSearch(false)} 
            className="absolute text-2xl text-gray-500 transition-colors top-6 right-6 hover:text-rose-500"
          >
            <FaTimes />
          </button>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full max-w-2xl transition-colors border-b-2 border-gray-300 focus-within:border-rose-500"
          >
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-4 text-lg placeholder-gray-400 bg-transparent outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 font-medium transition-colors rounded-md text-rose-500 hover:bg-rose-50"
            >
              <FaSearch className="text-xl" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Navbar;