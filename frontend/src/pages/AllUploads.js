import React, { useEffect, useState } from 'react'
import UploadAutoProduct from '../components/UploadAutoProduct'
import SummaryApi from '../common'

import AutoAdminProductCard from '../components/AutoAdminProductCard'

const AllUploads = () => {
    const [openUploadAutoProduct, setUploadAutoProduct] = useState(false)
    const [allAutoProduct, setAllAutoProduct] = useState([])

    const fetchAllAutoProduct = async()=>{
      const response = await fetch(SummaryApi.allAutoProduct.url)
      const dataResponse = await response.json()
  
      setAllAutoProduct(dataResponse?.data || [])
    }

    useEffect(()=>{
      fetchAllAutoProduct()
    },[])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>

            <h2 className='font-bold text-red-600 text-lg'>All Uploads</h2>
            <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full' onClick={()=>setUploadAutoProduct(true)}>Upload</button>

        </div>

            {/**All Auto products */}

          <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(120vh-190px)] overflow-y-scroll'>
            {
              allAutoProduct.map((product,index)=>{
                return(
                  <AutoAdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllAutoProduct}/>
                  
                )
              })
            }
          </div>

        {/**Upload auto product component */}
        {
          openUploadAutoProduct && (
            <UploadAutoProduct onClose = {()=>setUploadAutoProduct(false)} fetchData={fetchAllAutoProduct}/>
          )
        }
        
    </div>
  )
}

export default AllUploads
