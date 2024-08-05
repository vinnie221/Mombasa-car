import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom';
import BannerProduct from '../components/BannerProduct';
import CategoryListAuto from '../components/CategoryListAuto';
import VerticalCardProductAuto from '../components/VerticalCardProductAuto';
import { Helmet, HelmetProvider } from 'react-helmet-async';
//import image1mobile from '../images/banner/mobile.jpg'

const Home = () => {
  const [search, setSearch] = useState('');
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");

  useEffect(() => {
    // Cleanup timer on unmount or when search changes
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const handleSearchAuto = (e) => {
    const { value } = e.target;
    setSearch(value);

    // Clear previous timer if it exists
    if (timer) clearTimeout(timer);

    // Set a new timer for navigating
    const newTimer = setTimeout(() => {
      if (value) {
        navigate(`/search-auto?q=${value}`);
      } else {
        navigate("/search-auto");
      }
    }, 3000); // 3 seconds delay

    setTimer(newTimer);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Mombasa Cars - Buy Your Dream Car Online</title>
        <meta name="description" content="Mombasa Car offers the best deals on cars online. Buy your car from Mombasa's trusted dealer. Find cars online, buy cars in Mombasa." />
        <meta name="keywords" content="mombasa car deals, cars online, buy car, mombasa cars, buy cars online" />
        <meta property="og:title" content="Mombasa Cars - Buy Your Dream Car Online" />
        <meta property="og:description" content="Mombasa Car offers the best deals on cars online. Buy your car from Mombasa's trusted dealer. Find cars online, Contact us at 0702751085." />
        <meta property="og:url" content="https://mombasacar.co.ke" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="%PUBLIC_URL%/favicon.ico" />
      </Helmet>

      <div className='flex w-full justify-between p-2 pl-5 pb-0'>
        {/* <div className='flex-col'>
          <Link to={'/about-us'}>
            <p className="bg-blue-500 w-28 h-10 justify-center items-center rounded-xl text-white hover:bg-blue-800 flex">about us</p>
          </Link>
          Mobile search bar
          <div className="block lg:hidden my-4">
            <div className="relative flex items-center w-full border rounded-full focus-within:shadow pl-2">
              <input
                type="text"
                placeholder="Search here..."
                className="w-40 outline-none text-sm px-3 py-1 rounded-xl"
                onChange={handleSearchAuto}
                value={search}
              />
            </div>
          </div>
        </div> */}
        
        <div className='w-full flex justify-end'>
          <div className=''>
            <CategoryListAuto />
          </div>
        </div>
      </div>

      <BannerProduct />
      <VerticalCardProductAuto category={"Vehicle"} heading={"Vehicles on Sale"} />
    </HelmetProvider>
  );
};

export default Home;
