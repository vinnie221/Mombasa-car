import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import displayKESCurrency from '../helpers/displayCurrency';


import Context from '../context';
import { FcCellPhone } from "react-icons/fc";
import CategoryWiseProductAutoDisplay from '../components/CategoryWiseProductAutoDisplay';


const ProductDetailsAuto = () => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    phoneNumber : ""
  })
  const params = useParams()
  const [loading,setLoading] = useState(false)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")

  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })
  const [zoomImage,setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)
  const navigate = useNavigate()

  const fetchProductDetails = async()=>{
    setLoading(true)
    const response = await fetch(SummaryApi.productAutoDetails.url,{
      method : SummaryApi.productAutoDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)

    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])

  }
  console.log("data", data)


  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imageURL)=>{
    setActiveImage(imageURL)
  }

  const handleZommImage = useCallback((e)=>{
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    console.log("coordinate", left, top, width, height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })

  },[zoomImageCoordinate])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }

  return (
    <div className='container mx-auto p-4'>
      
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/**product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-300 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZommImage} onMouseLeave={handleLeaveImageZoom}/>
            {/**product zoom */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-300 p-1 -right-[510px] top-0'>
              <div 
              className='w-full h-full min-h-[400px] overflow-hidden min-w-[500px] mix-blend-multiply scale-95'
              style={{
                backgroundImage : `url(${activeImage})`,
                backgroundRepeat : 'no-repeat',
                backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
              }}
              >

              </div>
            </div>
              )
            }
            
          </div>

          <div className='h-full'>
            {
              loading?(

                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((el, index) =>{
                      return(
                        <div className='h-20 w-20 bg-slate-300 rounded animate-pulse' key={"loadingImage"+index}></div>
                      )
                    })
                  }
                </div>
                
              ): (
                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                    {
                      data?.productImage?.map((imageURL,index) =>{
                        return(
                          <div className='h-20 w-20 bg-slate-300 rounded p-1' key={imageURL}>
                            <img src={imageURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imageURL)} onClick={()=>handleMouseEnterProduct(imageURL)}/>
                          </div>
                        )
                      })
                    }
                  </div>
              )
            }
          </div>
        </div>
        {/**product Details */}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-300 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
              <h2 className='text-2xl lg:text-3xl font-medium h-6 lg:h-8 bg-slate-300 animate-pulse w-full'></h2>
              <p className='capitalize text-slate-500 bg-slate-300 min-w-[100px] animate-pulse h-6 w-full lg:h-8'></p>

              <div className='text-red-600 bg-slate-300 animate-pulse h-6 lg:h-8 flex items-center gap-1 w-full'>
                
              </div>

              <div className='flex items-center gap-3 text-2xl lg:text-2xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full'>
                <p className=' text-red-600 bg-slate-300 w-full'></p>
                <p className='text-slate-500 line-through bg-slate-300 w-full'></p>
              </div>

              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='h-6 lg:h-8 bg-slate-300 rounded animate-pulse w-full'></button>
                <button className='h-6 lg:h-8 bg-slate-300 rounded animate-pulse w-full'></button>
              </div>

              <div className='w-full'>
                <p className='text-slate-700 font-medium my-1 h-6 lg:h-8 bg-slate-300 rounded animate-pulse w-full'></p>
                <p className='bg-slate-300 rounded animate-pulse h-10 lg:h-12 w-full'></p>
              </div>

        </div>
          ):
          (
            <div className='flex flex-col gap-1'>
                <p className='bg-slate-300 font-semibold text-red-600 px-2 lg:text-3xl rounded inline-block w-fit'>{data.brandName}</p>
                <h2 className='text-2xl lg:text-2xl font-medium'>{data.productName}</h2>
                {/* <p className='capitalize text-slate-500'>{data.category}</p> */}

                {/* <div className='text-red-600 flex items-center gap-1'>
                  <FaStar/>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div> */}

                <div className='flex items-center gap-3 text-2xl lg:text-2xl font-medium my-1'>
                  <p className=' text-red-600'>Price:</p>
                  <p className='text-blue-500 '>{displayKESCurrency(data.price)}</p>
                </div>

                <div className='flex items-center gap-3 my-2'>
                    <div className="cursor-pointer p-4 grid gap-3">
                                {/* <p className="font-semibold text-red-600">{displayKESCurrency(data.price)}</p> */}
                                <p className="font-semibold flex gap-3">
                                    <p><p>Call:</p> </p>
                                    <p className="flex"><p className="text-xl"><FcCellPhone /></p><p className="text-blue-600">{data.phoneNumber}</p></p>
                                    
                                </p>
                               
                            
                        </div>
                </div>

                <div>
                  <p className='text-slate-700 font-medium my-1'>Description : </p>
                  <p className=''>{data?.description}</p>
                </div>

            </div>
          )
        }
      </div>


      {
        data?.category && (
          <CategoryWiseProductAutoDisplay category={data?.category} heading={"Recommended Products"}/>
        )
      }
      

    </div>
  )
}

export default ProductDetailsAuto
