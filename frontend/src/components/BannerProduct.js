import React, { useEffect, useState } from 'react'
import image1 from '../images/banner/banner2.jpg'
import image1mobile from '../images/banner/mobile.jpg'
import image2 from '../images/banner/banner2origi.jpg'
import image3 from '../images/banner/bannerorgi.jpg'
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";

const BannerProduct = () => {

  const [currentImage,setCurrentImage] = useState(0)
  const mobileImages = [
    image1,
    image2,
    
    image1mobile
  ]


  const desktopImages = [
    image1,
    image2,
    
    image1mobile
  ]

  const nextImage= ()=>{
    if(desktopImages.length -1 > currentImage){
      setCurrentImage(preve => preve+1)
    }
    
  }

  const preveImage= ()=>{
    if(currentImage != 0){
      setCurrentImage(preve => preve-1)
    }
    
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      if(desktopImages.length -1 > currentImage){
        nextImage()
      }else{
        setCurrentImage(0)
      }

    },5000)

    return ()=> clearInterval(interval)
  },[currentImage])


  return (
    <div className='container mx-auto px-4 rounded'>
      <div className='h-56 md:h-72 w-full bg-slate-300 relative'>

        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
          <div className='flex justify-between w-full text-2xl'>
            <button onClick={preveImage} className='bg-white shadow-md p-1'><FaAngleDoubleLeft /></button>
            <button onClick={nextImage} className='bg-white shadow-md p-1'><FaAngleDoubleRight /></button>
          </div>
          
        </div>

        {/**desktop and tablet version */}

          <div className='hidden md:flex h-full w-full overflow-hidden'>
              {
                desktopImages.map((imageURL,index)=>{
                  return(
                  <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform : `translateX(-${currentImage*100}%)`}}>
                    <img src={imageURL} className='w-full h-full'/>
                  </div>
                  )
                })
              }
          </div>

          {/**Mobile version */}

          <div className='flex h-full w-full overflow-hidden md:hidden'>
              {
                mobileImages.map((imageURL,index)=>{
                  return(
                  <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform : `translateX(-${currentImage*100}%)`}}>
                    <img src={imageURL} className='w-full h-full'/>
                  </div>
                  )
                })
              }
          </div>

        
      </div>
    </div>
  )
}

export default BannerProduct
