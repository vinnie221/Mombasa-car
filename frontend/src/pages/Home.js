import React from 'react'
import { LiaHandPointRightSolid } from "react-icons/lia";
import BannerProduct from '../components/BannerProduct'

import CategoryListAuto from '../components/CategoryListAuto'
import VerticalCardProductAuto from '../components/VerticalCardProductAuto'
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <div className='flex w-full justify-between p-2 pl-5 pb-0'>
        <Link to={'/about-us'}>
          <p className="bg-blue-500 w-28 h-10 justify-center items-center rounded-xl text-white hover:bg-blue-800 flex">about us</p>
        </Link>
      
        
        
        <div className='w-full flex justify-end'>
          <div className=''>
          <CategoryListAuto/>
          </div>
          
        </div>
        
      </div>
      
      <BannerProduct/>

      <VerticalCardProductAuto category={"Vehicle"} heading={"Vehicles on Sale"}/>
      <VerticalCardProductAuto category={"Land"} heading={"Land on Sale"}/>
      
      
    </div>
  )
}

export default Home
