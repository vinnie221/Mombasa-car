import React from 'react';
import { FaCarSide } from "react-icons/fa";
import { GiIsland } from "react-icons/gi";

const Logo = ({w, h}) => {
  return (
    <div className='flex gap-1 bg-slate-300 p-2 rounded hover:bg-slate-600'>
      <div className='text-white justify-center text-center font-semibold rounded-xl items-center bg-red-600 w-12 lg:w-20 text-xs lg:text-base'> {/* Adjusted width and text size */}
        Home
      </div>
      <div className='text-xl lg:text-2xl text-red-600'> {/* Adjusted icon size */}
        <FaCarSide />
      </div>
      <div className='text-xl lg:text-2xl text-green-500'> {/* Adjusted icon size */}
        <GiIsland />
      </div>
    </div>
  );
};

export default Logo;
