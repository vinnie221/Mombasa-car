import React from 'react'
import { FaWhatsappSquare } from 'react-icons/fa'

const Contact = () => {
  return (
    <div className='pt-8 pl-12 gap-4'>
      <div className='flex font-semibold text-xl gap-3'>
        <p className='text-slate-700'>Contact : </p>
        <a href="tel:0702751085" className="text-blue-600 hover:underline hover:text-blue-800">0702751085</a>
      </div>
      <div className="flex gap-3 pt-4">
        <p className='text-slate-700 font-semibold text-xl'>WhatsApp :</p>
            <a 
              href="https://wa.me/254702751085" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 text-4xl hover:text-green-700 hover:scale-150"
            >
              <FaWhatsappSquare />
            </a>
          </div>
    </div>
  )
}

export default Contact
