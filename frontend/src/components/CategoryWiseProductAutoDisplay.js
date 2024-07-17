import React, { useContext, useEffect, useRef, useState } from "react";

import displayKESCurrency from "../helpers/displayCurrency";


import { Link } from "react-router-dom";
import Context from "../context";
import scrollTop from "../helpers/scrollTop";
import fetchCategoryWiseProductAuto from "../helpers/fetchCategoryWiseProductAuto";
import { FcCellPhone } from "react-icons/fc";

const CategoryWiseProductAutoDisplay = ({category, heading}) => {
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context)

  


  const fetchData = async() => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProductAuto(category);
    setLoading(false);

    console.log("horizontal data", categoryProduct)

    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  },[]);



  return (
    <div className="container mx-auto px-2 my-6 relativ">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,300px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all">

        {

          loading ? (
            loadingList?.map((product,index) =>{
              return (
                <div className="w-full min-w-[ 280px] md:min-w-[320px] max-w-[ 280px] md:max-w-[320px] bg-white rounded-sm shadow">
                      <div className="h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center bg-slate-300 animate-pulse">
                     
                      </div>
                      <div className="cursor-pointer p-4 grid gap-3">
                          <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-300"></h2>
                          <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-300 py-2"></p>
                          <div className="flex gap-4">
                            <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-300 w-full py-2"></p>
                            <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-300 w-full py-2"></p>
                          </div>
                          <button className=" text-white px-3 py-2 p-1 animate-pulse rounded-full bg-slate-300"></button>
                      </div>
                </div>
              );
              })
          ) : (

                data?.map((product,index) =>{
                  return (
                    <Link to={"/autoproduct/"+product?._id} className="w-full min-w-[ 280px] md:min-w-[320px] max-w-[ 280px] md:max-w-[320px] bg-white rounded-sm shadow" onClick={scrollTop}>
                          <div className="bg-blue-300 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                          <img src={product.productImage[0]} className="object-scale-down h-full cursor-pointer hover:scale-110 transition-all mix-blend-multiply"/>
                          </div>
                          <div className="cursor-pointer p-4 grid gap-3">
                              <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-green-500">{product?.brandName}</h2>
                              <p className="capitalize text-green-500">{product?.productName}</p>
                              <div className="gap-4">
                                <p className="text-red-500">{displayKESCurrency(product?.price)}</p>
                                <div className="flex gap-3">
                                    <p>Call:</p>
                                    <p className="flex"><p className="text-xl"><FcCellPhone /></p><p className="text-blue-600">{product?.phoneNumber}</p></p>
                                </div>
                                
                              </div>
                              <div className="gap-1">
                                <p className="font-semibold text-slate-400">Description</p>
                                <p className="text-slate-900">{product?.description}</p>
                              </div>
                              
                          </div>
                    </Link>
                  );
                  })

          )

            
        }

      </div>
      
    </div>
  );
};

export default CategoryWiseProductAutoDisplay;
