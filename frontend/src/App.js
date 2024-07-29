import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './stores/userSlice';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
  const dispatch = useDispatch();
  const [cardProductCount, setCardProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductcount.url, {
      method: SummaryApi.addToCartProductcount.method,
      credentials: 'include',
    });
    const dataApi = await dataResponse.json();

    setCardProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    /**user details */
    fetchUserDetails();
    /**user card product details */
    fetchUserAddToCart();
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Mombasa Cars - Your Trusted Car Dealer</title>
        <meta name="Mombasa Car offers the best deals on cars in Mombasa" content="Mombasa Car offers the best deals on cars in Mombasa. Find your perfect car with us." />
        <meta name="keywords" content="Mombasa cars, buy cars Mombasa, car dealers Mombasa, used cars Mombasa" />
        <meta name="author" content="Mombasa Car" />
        <meta property="og:title" content="Mombasa Car - Your Trusted Car Dealer" />
        <meta property="og:description" content="Mombasa Car offers the best deals on cars in Mombasa. Find your perfect car with us." />
        <meta property="og:url" content="https://mombasacar.co.ke" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="%PUBLIC_URL%/favicon.ico" />
      </Helmet>
      <Context.Provider value={{
          fetchUserDetails,  // user details fetch
          cardProductCount,  // current user add to cart product count
          fetchUserAddToCart
      }}>
        <ToastContainer 
          position='top-center'
        />
        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>
      </Context.Provider>
    </HelmetProvider>
  );
}

export default App;
