import React from 'react';
import { FaCarSide } from "react-icons/fa";
import { GiIsland } from "react-icons/gi";

const Logo = ({w, h}) => {
  return (
    <div className='flex gap-1 bg-slate-300 p-2 rounded hover:bg-slate-600'>
      <div className='text-white justify-center text-center font-semibold rounded-xl items-center bg-red-600 w-20'>
        Home
      </div>
      <div className='text-2xl text-red-600'>
      <FaCarSide />
      </div>
      <div className='text-2xl text-green-500'>
      <GiIsland />
      </div>
    </div>
    
    
  );
};

export default Logo;

