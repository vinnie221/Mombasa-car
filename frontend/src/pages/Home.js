import React, { useState } from 'react'
import { LiaHandPointRightSolid } from "react-icons/lia";
import BannerProduct from '../components/BannerProduct'

import CategoryListAuto from '../components/CategoryListAuto'
import VerticalCardProductAuto from '../components/VerticalCardProductAuto'
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';




const Home = () => {
  const navigate = useNavigate()
const [search,setSearch] = useState(searchQuery)

  const handleSearchAuto = (e)=>{
    const { value } = e.target
    setSearch(value)
  
    if(value){
      navigate(`/search-auto?q=${value}`)
    }else{
      navigate("/search-auto")
    }
  
  
  }
  return (
    <div>
      <div className='flex w-full justify-between p-2 pl-5 pb-0'>
        <Link to={'/about-us'}>
          <p className="bg-blue-500 w-28 h-10 justify-center items-center rounded-xl text-white hover:bg-blue-800 flex">about us</p>
        </Link>

        <div className="hidden lg:block items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full outline-none"
            onChange={handleSearchAuto}
            //onChange = {handleSearchAuto}
            value={search}
          />
          {/* <div className="text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-r-full text-white">
            <FiSearch />
          </div> */}
        </div>
        
        
        <div className='w-full flex justify-end'>
          <div className=''>
          <CategoryListAuto/>
          </div>
          
        </div>
        
      </div>
      
      <BannerProduct/>

      <VerticalCardProductAuto category={"Vehicle"} heading={"Vehicles on Sale"}/>
      {/* <VerticalCardProductAuto category={"Land"} heading={"Land on Sale"}/> */}
      
      
    </div>
  )
}

export default Home
