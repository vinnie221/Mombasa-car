import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom';
import BannerProduct from '../components/BannerProduct';
import CategoryListAuto from '../components/CategoryListAuto';
import VerticalCardProductAuto from '../components/VerticalCardProductAuto';

const Home = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");

  const handleSearchAuto = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search-auto?q=${value}`);
    } else {
      navigate("/search-auto");
    }
  };

  return (
    <div>
      <div className='flex w-full justify-between p-2 pl-5 pb-0'>
        <div className='flex-col'>
          <Link to={'/about-us'}>
            <p className="bg-blue-500 w-28 h-10 justify-center items-center rounded-xl text-white hover:bg-blue-800 flex">about us</p>
          </Link>
          {/* Mobile search bar */}
        <div className="block lg:hidden px-4 my-4">
          <div className="relative flex items-center w-full border rounded-full focus-within:shadow pl-2">
            <input
              type="text"
              placeholder="Search for products here..."
              className="w-40 outline-none text-sm px-3 py-1"
              onChange={handleSearchAuto}
              value={search}
            />
            {/* <div className="text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-r-full text-white">
              <FiSearch />
            </div> */}
          </div>
        </div>
        </div>
        
        
        <div className='w-full flex justify-end'>
          <div className=''>
            <CategoryListAuto/>
          </div>
        </div>
      </div>

      

      <BannerProduct />

      <VerticalCardProductAuto category={"Vehicle"} heading={"Vehicles on Sale"}/>
    </div>
  );
};

export default Home;
