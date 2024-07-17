import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-blue-300'>
      <div className='container mx-auto p-5'>
        <p className='text-center font-bold' title= 'youtube channel'>
          <Link to={'/contact'} className='hover:bg-blue-500 text-white rounded-xl p-2'>
            Contact us
          </Link>
         
        </p>
      </div>
    </footer>
  )
}

export default Footer
