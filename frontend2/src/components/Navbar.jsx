// import React, { useEffect, useRef, useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addSearchData } from '../redux/productSlice';
// import { FaBars, FaTimes, FaShoppingBag, FaUser, FaSearch } from 'react-icons/fa';
// import { IoIosArrowDown } from "react-icons/io";
// import toast from 'react-hot-toast';
// import { useFetchCartItemsQuery } from '../redux/cartApi';
// import { useGetProfileQuery, useLogoutMutation } from '../redux/authApi';

// const Navbar = () => {
//   const [logout] = useLogoutMutation();
//   const { data: User, refetch } = useGetProfileQuery();
//   const { data: cart, isLoading: cartLoading, refetch: cartRefetch } = useFetchCartItemsQuery();
//   const cartItems = cart?.[1]?.cart || [];

//   const [showMenu, setShowMenu] = useState(false);
//   const [search, setSearch] = useState('');
//   const [showSearch, setShowSearch] = useState(false);
//   const [hovered, setHovered] = useState('');
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [showMenDropdown, setShowMenDropdown] = useState(false);
//   const [showWomenDropdown, setShowWomenDropdown] = useState(false);

//   const userMenuRef = useRef(null);
//   const searchRef = useRef(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     dispatch(addSearchData(search));
//     navigate('/search');
//     setShowSearch(false);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const isAuthenticated = !!User;

//   const handleLogout = async () => {
//     try {
//       await logout().unwrap();
//       await refetch();
//       await cartRefetch();
//       navigate('/');
//       toast.success("Logout successful");
//       setShowUserMenu(false);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   const linkClass = ({ isActive }) =>
//     `relative px-3 py-2 font-medium transition-all duration-300 ${
//       isActive ? 'text-rose-500 font-semibold' : 'text-gray-800 hover:text-rose-500'
//     }`;

//   const menuItems = [
//     { label: 'HOME', path: '/' },
//     { label: 'SHOP', path: '/shop' },
//     { label: "MEN'S", path: '/mens', dropdown: true },
//     { label: "WOMEN'S", path: '/womens', dropdown: true },
//     { label: 'CART', path: '/cart' },
//   ];

//   const menLinks = [
//     { label: "Shirts", path: "/mens/shirts" },
//     { label: "T-Shirts", path: "/mens/t-shirts" },
//     { label: "Casual Trousers", path: "/mens/casual-trousers" },
//   ];

//   const womenLinks = [
//     { label: "Jeans", path: "/womens/jeans" },
//     { label: "T-Shirts", path: "/womens/t-shirts" },
//   ];

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
//         setShowUserMenu(false);
//       }
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowSearch(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <header className="fixed z-50 w-full text-black border-b border-gray-100 shadow-sm bg-white/90 backdrop-blur-sm">
//       <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
//         <button
//           onClick={() => setShowMenu(!showMenu)}
//           className="text-xl text-gray-700 transition-colors md:hidden hover:text-rose-500"
//         >
//           {showMenu ? <FaTimes /> : <FaBars />}
//         </button>

//         <div className="flex-grow hidden text-center md:flex-grow-0 md:block">
//           <h1 className="font-serif text-xl font-bold tracking-widest">Fashion Ease</h1>
//           <p className="text-xs text-gray-500">The best place for fashion</p>
//         </div>
//         <div className='flex items-start md:items-center'>
//           <img className='h-10 ' src="logo2.svg" alt="" />
//         </div>

//         <div className="flex items-center gap-4 md:gap-6">
//           <button
//             onClick={() => setShowSearch(true)}
//             className="items-center hidden gap-1 text-gray-700 transition-colors md:flex hover:text-rose-500"
//           >
//             <FaSearch className="text-lg" />
//           </button>

//           <div className="relative flex items-center gap-1">
//             <button 
//               onClick={() => {
//                 navigate('/cart');
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//               }}
//               className="flex items-center gap-1 text-gray-700 transition-colors hover:text-rose-500"
//             >
//               <FaShoppingBag className="text-lg" />
//               <span className="hidden text-sm md:inline">CART ({cartItems.length})</span>
//             </button>
//             {!cartLoading && cartItems.length > 0 && (
//               <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-2 -right-2 bg-rose-500">
//                 {cartItems.length}
//               </span>
//             )}
//           </div>

//           <div className="relative" ref={userMenuRef}>
//             <button 
//               onClick={() => setShowUserMenu(!showUserMenu)}
//               className="text-gray-700 transition-colors hover:text-rose-500"
//             >
//               <FaUser className="text-lg" />
//             </button>
//             {showUserMenu && (
//               <div className="absolute right-0 z-50 w-48 mt-2 bg-white border border-gray-100 rounded-md shadow-lg">
//                 {isAuthenticated ? (
//                   <>
//                     <NavLink
//                       to="/profile"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50"
//                       onClick={() => {
//                         setShowUserMenu(false);
//                         window.scrollTo({ top: 0, behavior: 'smooth' });
//                       }}
//                     >
//                       My Account
//                     </NavLink>
//                     <button 
//                       onClick={handleLogout}
//                       className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-rose-50"
//                     >
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <NavLink
//                       to="/login"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50"
//                       onClick={() => {
//                         setShowUserMenu(false);
//                         window.scrollTo({ top: 0, behavior: 'smooth' });
//                       }}
//                     >
//                       Login
//                     </NavLink>
//                     <NavLink
//                       to="/signup"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50"
//                       onClick={() => {
//                         setShowUserMenu(false);
//                         window.scrollTo({ top: 0, behavior: 'smooth' });
//                       }}
//                     >
//                       Sign Up
//                     </NavLink>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <nav className="relative z-40 justify-center hidden gap-1 py-3 md:flex bg-white/80">
//         {menuItems.map((item) => {
//           const links = item.label === "MEN'S" ? menLinks : womenLinks;
          
//           return (
//             <div
//               key={item.label}
//               className="relative group"
//               onMouseEnter={() => item.dropdown && setHovered(item.label)}
//               onMouseLeave={() => item.dropdown && setHovered('')}
//             >
//               <NavLink 
//                 to={item.path} 
//                 className={linkClass}
//                 onClick={() => {
//                   window.scrollTo({ top: 0, behavior: 'smooth' });
//                   setHovered('');
//                 }}
//               >
//                 {item.label}
//                 {item.dropdown && (
//                   <IoIosArrowDown className={`inline ml-1 transition-transform ${
//                     hovered === item.label ? 'rotate-180' : ''
//                   }`} />
//                 )}
//               </NavLink>

//               {item.dropdown && hovered === item.label && (
//                 <div className="absolute z-50 w-56 p-2 mt-1 space-y-1 transform -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-xl left-1/2 top-full">
//                   {links.map((link) => (
//                     <NavLink
//                       key={link.label}
//                       to={link.path}
//                       className="block px-4 py-2 text-sm text-gray-700 transition rounded-md hover:bg-rose-50"
//                       onClick={() => {
//                         setHovered('');
//                         window.scrollTo({ top: 0, behavior: 'smooth' });
//                       }}
//                     >
//                       {link.label}
//                     </NavLink>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </nav>

//       {showMenu && (
//         <div className="space-y-1 bg-white border-t border-gray-100 shadow-lg md:hidden">
//           {menuItems.map((item) => {
//             if (item.label === "MEN'S" || item.label === "WOMEN'S") {
//               const links = item.label === "MEN'S" ? menLinks : womenLinks;
//               const isOpen = item.label === "MEN'S" ? showMenDropdown : showWomenDropdown;
//               const toggle = item.label === "MEN'S" 
//                 ? () => setShowMenDropdown(!showMenDropdown) 
//                 : () => setShowWomenDropdown(!showWomenDropdown);

//               return (
//                 <div key={item.label}>
//                   <button
//                     className="flex items-center justify-between w-full px-4 py-3 font-medium text-left text-gray-800"
//                     onClick={toggle}
//                   >
//                     {item.label}
//                     <IoIosArrowDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//                   </button>
//                   {isOpen && (
//                     <div className="py-2 pl-6 space-y-1 bg-gray-50">
//                       {links.map((link) => (
//                         <NavLink
//                           key={link.label}
//                           to={link.path}
//                           className="block px-4 py-2 text-sm text-gray-700 rounded hover:bg-rose-50"
//                           onClick={() => {
//                             setShowMenu(false);
//                             window.scrollTo({ top: 0, behavior: 'smooth' });
//                           }}
//                         >
//                           {link.label}
//                         </NavLink>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               );
//             }

//             return (
//               <NavLink
//                 key={item.label}
//                 to={item.path}
//                 className="block px-4 py-3 font-medium text-gray-800 hover:bg-gray-50"
//                 onClick={() => {
//                   setShowMenu(false);
//                   window.scrollTo({ top: 0, behavior: 'smooth' });
//                 }}
//               >
//                 {item.label}
//               </NavLink>
//             );
//           })}
//         </div>
//       )}

//       {showSearch && (
//         <div 
//           className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-white/95"
//           ref={searchRef}
//         >
//           <button 
//             onClick={() => setShowSearch(false)} 
//             className="absolute text-2xl text-gray-500 transition-colors top-6 right-6 hover:text-rose-500"
//           >
//             <FaTimes />
//           </button>
//           <form
//             onSubmit={handleSearchSubmit}
//             className="flex items-center w-full max-w-2xl transition-colors border-b-2 border-gray-300 focus-within:border-rose-500"
//           >
//             <input
//               type="search"
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full px-4 py-4 text-lg placeholder-gray-400 bg-transparent outline-none"
//               autoFocus
//             />
//             <button
//               type="submit"
//               className="px-4 py-2 font-medium transition-colors rounded-md text-rose-500 hover:bg-rose-50"
//             >
//               <FaSearch className="text-xl" />
//             </button>
//           </form>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;


import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchData } from '../redux/productSlice';
import { FaBars, FaTimes, FaShoppingBag, FaUser, FaSearch } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import toast from 'react-hot-toast';
import { cartApi, useClearCartMutation, useFetchCartItemsQuery } from '../redux/cartApi';
import { authApi, useGetProfileQuery, useLogoutMutation } from '../redux/authApi';

const Navbar = () => {
  const menuItems = [
    { label: 'HOME', path: '/' },
    { label: 'SHOP', path: '/shop' },
    { label: "MEN'S", path: '/mens' },
    { label: "WOMEN'S", path: '/womens' },
    { label: 'CART', path: '/cart' },
    { label: 'ABOUT US', path: '/about' },
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

  const [logout] = useLogoutMutation();
  const { data: User, refetch } = useGetProfileQuery();
  const { data: cartData, isLoading: cartLoading, refetch: cartRefetch } = useFetchCartItemsQuery();
  const [clearcart] = useClearCartMutation()

  const cartItemsArray = cartData?.cart || [];
  const subtotal = cartData?.total || 0;
  const tax = Math.round(subtotal * 0.14);
  const total = subtotal + tax;

  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [hovered, setHovered] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMenDropdown, setShowMenDropdown] = useState(false);
  const [showWomenDropdown, setShowWomenDropdown] = useState(false);

  const userMenuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(addSearchData(search));
    navigate('/search');
    setShowSearch(false);
  };

  const isAuthenticated = !!User;
  console.log('isAuthenticated', isAuthenticated)


  // const handleLogout = async () => {
  //   try {
  //     await logout().unwrap();
  //     console.log('User logged out successfully');
  //     await refetch(); // ensure user data is refreshed
  //     console.log('Cart cleared');
  //     await cartRefetch(); // refetch cart items
  //     console.log('Cart refetched');
  //     toast.success("Logout successful");
  //     navigate('/'); // redirect to home after logout
  //   } catch (err) {
  //     console.error("Logout failed", err);
  //   }
  // };


  const handleLogout = async () => {
    try {
      await logout().unwrap(); // Important: calls the Flask logout route to clear cookie

      dispatch(cartApi.util.resetApiState());
      dispatch(authApi.util.resetApiState());

      toast.success("Logout successful");
      navigate('/'); // Redirect to home after logout
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 font-medium text-black transition-all duration-300 ${isActive ? 'underline underline-offset-8' : ''
    } hover:underline hover:underline-offset-8`;


  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <header
      className="fixed z-50 w-full text-black bg-white shadow-sm"
    >


      <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
        {/* Hamburger */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-2xl md:hidden"
        >
          {showMenu ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="flex-grow text-center cursor-pointer md:flex-grow-0 md:w-1/3">
          <h1 className="font-serif text-xl tracking-widest">Fashion Ease</h1>
          <p className="text-xs">The best place for fashion</p>
        </div>

        {/* Right Section */}
        <div className="relative flex items-center gap-4">
          <div className="relative" ref={userMenuRef}>
            <button onClick={() => setShowUserMenu((prev) => !prev)}>
              <FaUser size={24} />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 z-50 w-40 mt-2 bg-white rounded-md shadow-md">
                <NavLink
                  to="/signup"
                  className="block px-4 py-2 hover:bg-rose-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to="/login"
                  className="block px-4 py-2 hover:bg-rose-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  Log In
                </NavLink>
                {isAuthenticated && (
                  <div
                    onClick={() => {
                      handleLogout();
                      setShowUserMenu(false);
                    }}
                    className="block px-4 py-2 hover:bg-rose-100">
                    Logout
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='flex items-center justify-center gap-4'>
            <button
              onClick={() => setShowSearch(true)}
              className="items-center hidden gap-1 text-lg md:flex"
            >
              <FaSearch size={20} />
              SEARCH
            </button>
            <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
              <FaShoppingBag size={20} />

              {isAuthenticated && cartItemsArray.length > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full -top-2 -right-2 bg-rose-500">
                  {cartItemsArray.length}
                </span>
              )}
            </div>

          </div>
        </div>



      </div>


      {/* Nav Links */}
      <nav className="relative z-40 justify-center hidden gap-6 py-2 md:flex">
        {menuItems.map((item) => {
          const isDropdown = item.label === "MEN'S" || item.label === "WOMEN'S";
          const links = item.label === "MEN'S" ? menLinks : womenLinks;

          return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => isDropdown && setHovered(item.label)}
              onMouseLeave={() => isDropdown && setHovered('')}
            >
              <NavLink to={item.path} className={linkClass}>
                {item.label}
              </NavLink>

              {/* Single dropdown shown only for hovered item */}
              {hovered === item.label && isDropdown && (
                <div className="absolute z-50 w-56 p-4 mt-2 space-y-2 transition-all duration-200 -translate-x-1/2 bg-white rounded-lg shadow-xl top-full left-1/2">
                  {links.map((link) => (
                    <NavLink
                      key={link.label}
                      to={link.path}
                      className="block px-3 py-2 transition rounded-md hover:bg-rose-100"
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
      {
        showMenu && (
          <div className="px-4 py-3 space-y-2 bg-white shadow-lg md:hidden">
            {menuItems.map((item) => {
              if (item.label === "MEN'S") {
                return (
                  <div key="MEN'S">
                    <button
                      className="w-full py-1 font-medium text-left"
                      onClick={() => setShowMenDropdown((prev) => !prev)}
                    >
                      MEN'S <IoIosArrowDown className='float-right' size={20} />
                    </button>
                    {showMenDropdown && (
                      <div className="pl-4 space-y-1">
                        {menLinks.map((link) => (
                          <NavLink
                            key={link.label}
                            to={link.path}
                            className="block py-1 text-sm text-gray-700"
                            onClick={() => {
                              setShowMenu(false);
                              setShowMenDropdown(false);
                            }}
                          >
                            {link.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (item.label === "WOMEN'S") {
                return (
                  <div key="WOMEN'S">
                    <button
                      className="w-full py-1 font-medium text-left"
                      onClick={() => setShowWomenDropdown((prev) => !prev)}
                    >
                      WOMEN'S<IoIosArrowDown className='float-right' size={20} />
                    </button>
                    {showWomenDropdown && (
                      <div className="pl-4 space-y-1">
                        {womenLinks.map((link) => (
                          <NavLink
                            key={link.label}
                            to={link.path}
                            className="block py-1 text-sm text-gray-700"
                            onClick={() => {
                              setShowMenu(false);
                              setShowWomenDropdown(false);
                            }}
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
                  className="block py-1"
                  onClick={() => setShowMenu(false)}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        )
      }


      {/* Search Overlay */}
      {
        showSearch && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-white">
            <button onClick={() => setShowSearch(false)} className="absolute text-2xl top-6 right-6">
              <FaTimes />
            </button>
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center w-full max-w-4xl border border-gray-300"
            >
              <input
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 text-lg outline-none"
              />
              <button
                type="submit"
                className="h-full px-6 text-sm tracking-wide text-white bg-rose-300"
              >
                SEARCH
              </button>
            </form>
          </div>
        )
      }
    </header >
  );
};

export default Navbar;