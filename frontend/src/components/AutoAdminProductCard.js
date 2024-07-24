import React, { useContext, useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

import displayKESCurrency from "../helpers/displayCurrency";
import AutoAdminEditProduct from "./AutoAdminEditProduct";
import { FcCellPhone } from "react-icons/fc";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AutoAdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

 

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const response = await fetch(SummaryApi.deleteProduct.url, {
      method: SummaryApi.deleteProduct.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({
        _id: id,
      })
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      fetchdata(); // Fetch updated product list after deletion
    } else {
      toast.error(responseData.message);
    }
  };


  return (
    <div className="bg-white p-2 rounded">
      <div className="w-72">
        <div className="w-52 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            width={200}
            height={150}
            className="object-scale-down h-full cursor-pointer hover:scale-110 transition-all mix-blend-multiply"
          />
        </div>
        <h1 className="text-ellipsis font-semibold line-clamp-1 text-green-600">{data.brandName}</h1>
        <h1 className="text-ellipsis font-semibold line-clamp-1 text-green-600">{data.productName}</h1>

        <div>
          <p className="font-semibold text-red-600">{displayKESCurrency(data.price)}</p>
          <p className="font-semibold flex justify-between">
            <p><p>Call</p> </p>
            <p className="flex"><p className="text-xl"><FcCellPhone /></p><p className="text-blue-600">{data.phoneNumber}</p></p>
            
          </p>
          <p className="">{data.description}</p>

          <div
            className="w-fit ml-auto p-2 bg-green-300 hover:bg-green-600 rounded-full cursor-pointer hover:text-white"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
          <div className='text-red-600 hover:text-white hover:bg-red-600 rounded-full w-fit p-2 cursor-pointer' onClick={() => deleteProduct(data?._id)}>
            <MdDelete />
          </div>
        </div>
      </div>

      {editProduct && (
        <AutoAdminEditProduct
          productdata={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AutoAdminProductCard;
