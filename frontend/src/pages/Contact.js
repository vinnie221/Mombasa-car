import React from 'react';
import { FaWhatsappSquare } from 'react-icons/fa';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Contact = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Contact Us - Mombasa Cars</title>
        <meta name="description" content="Get in touch with Mombasa Car for the best deals on cars. Contact us at 0702751085 for any inquiries." />
        <meta name="keywords" content="contact Mombasa car, Mombasa car deals, cars online, buy car, Mombasa cars, buy cars online, contact 0702751085" />
        <meta property="og:title" content="Contact Us - Mombasa Cars" />
        <meta property="og:description" content="Get in touch with Mombasa Car for the best deals on cars. Contact us at 0702751085 for any inquiries." />
        <meta property="og:url" content="https://mombasacar.co.ke/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="%PUBLIC_URL%/favicon.ico" />
      </Helmet>

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
    </HelmetProvider>
  );
}

export default Contact;
