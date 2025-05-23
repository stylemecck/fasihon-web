import { useEffect } from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import { useGetProfileQuery } from '../src/redux/authApi';
import { Toaster } from "react-hot-toast"

import {
  Home,
  SignUp,
  Login,
  AdminDashboard,
  AdminHome,
  AdminProducts,
  AdminCustomer,
  AdminOrder,
  UpdateProduct,
  CreateProduct,
  Shop,
  Mens,
  Womens,
  SearchPage,
  CartPage,
  MensAll,
  MensTshirts,
  MensShirts,
  MensCasualTrousers,
  WomensAll,
  WomensJeans,
  WomensTshirts,
  Navbar,
  CheckoutPage
} from './components/common/index'
import Footer from './components/footers/Footer';
import AboutUs from './components/footers/Fpage/AboutUs';
import ReturnsExchanges from './components/footers/Fpage/ReturnsExchanges';
import PrivacyPolicy from './components/footers/Fpage/PrivacyPolicy';






function App() {
  const { data: userData, refetch, isLoading } = useGetProfileQuery();
  const location = useLocation(); // Get current location

  useEffect(() => {
    refetch(); // Optional, can be removed if automatic fetching is handled
  }, [refetch]);

  const user = userData;

  if (isLoading) return <p className='flex items-center justify-center w-full h-screen text-2xl'>Loading...</p>;

  return (
    <>
      {!location.pathname.startsWith("/adminDashboard") && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='shop' element={<Shop />} />

        <Route path='mens' element={<Mens />} >
          <Route index element={<MensAll />} />
          <Route path='t-shirts' element={<MensTshirts />} />
          <Route path='shirts' element={<MensShirts />} />
          <Route path='casual-trousers' element={<MensCasualTrousers />} />
        </Route>

        <Route path='womens' element={<Womens />}>
          <Route index element={<WomensAll />} />
          <Route path='t-shirts' element={<WomensTshirts />} />
          <Route path='jeans' element={<WomensJeans />} />
        </Route>

        <Route path='search' element={<SearchPage />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
  

        {/* footer page  */}
        <Route path='/about' element={<AboutUs/>} />
        <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        

        {/* TODO: in admindashboard no need of the nav component */}
        <Route path='adminDashboard' element={user && user?.role === 'admin' ? <AdminDashboard /> : <Login />}>
          <Route index element={<AdminHome />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='createProduct' element={<CreateProduct />} />
          <Route path='customers' element={<AdminCustomer />} />
          <Route path='orders' element={<AdminOrder />} />
          <Route path='update/:id' element={<UpdateProduct />} />
        </Route>
        <Route path='cart' element={<CartPage />} />
        <Route path='checkout' element={<CheckoutPage />} />
      </Routes>
      <Toaster />
      <Footer />
    </>

  )
}

export default App
