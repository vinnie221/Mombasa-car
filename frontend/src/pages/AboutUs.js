import React from 'react'
import { FaWhatsappSquare } from 'react-icons/fa'

const AboutUs = () => {
  return (
    <div>
        <div className='w-1/2 pt-4 pl-8 gap-3'>
        <p className='text-center pb-3 text-2xl font-semibold'>About Us</p>

        <p className='text-slate-700'>
            Dive into freedom and discover your perfect property – all at [Your Company Name]. 
            We specialize in connecting you with the vehicles and land that fuel your adventures. 
            From reliable cars and trucks to breathtaking plots, our diverse inventory caters to every 
            lifestyle and budget. Our knowledgeable team is passionate about guiding you through every step, 
            making your journey to ownership smooth and exciting. Let's turn your dream vehicle or land 
            purchase into a reality. Visit us today!
        </p>

        


        </div>

        <div className='pt-8 pl-12 gap-4'>
            <p className='pl-10 pb-3 font-bold text-xl'>Contact us</p>
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
      
    </div>
  )
}

export default AboutUs



