import React, { useContext, useEffect, useState } from "react";
import displayKESCurrency from "../helpers/displayCurrency";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Context from "../context";
import fetchCategoryWiseProductAuto from "../helpers/fetchCategoryWiseProductAuto";
import { FcCellPhone } from "react-icons/fc";
import displayFormattedTimestamp from "../helpers/displayFormattedTimestamp";

const VerticalCardProductAuto = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProductAuto(category);
    setLoading(false);

    console.log("horizontal data", categoryProduct);

    setData(categoryProduct?.data);
  };
  const [search, setSearch] = useState('');
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");

  useEffect(() => {
    // Cleanup timer on unmount or when search changes
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const handleSearchAuto = (e) => {
    const { value } = e.target;
    setSearch(value);

    // Clear previous timer if it exists
    if (timer) clearTimeout(timer);

    // Set a new timer for navigating
    const newTimer = setTimeout(() => {
      if (value) {
        navigate(`/search-auto?q=${value}`);
      } else {
        navigate("/search-auto");
      }
    }, 3000); // 3 seconds delay

    setTimer(newTimer);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-2 my-6 relative">
      <h2 className="text-2xl font-semibold py-1">{heading}</h2>
      <div className="block lg:hidden my-4">
            <div className="relative flex items-center  w-full rounded-full focus-within:shadow pl-2">
              <input
                type="text"
                placeholder="Search here..."
                className="w-52 outline-none text-sm px-3 py-1 rounded-xl"
                onChange={handleSearchAuto}
                value={search}
              />
            </div>
          </div>

      <div className="flex flex-wrap items-start gap-4 md:gap-6 justify-between transition-all">
        {loading
          ? loadingList?.map((_, index) => (
              <div
                key={index}
                className="flex-grow min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow p-0"
              >
                <div className="h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center bg-slate-300 animate-pulse"></div>
                <div className="cursor-pointer p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-300"></h2>
                  <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-300 py-2"></p>
                  <div className="flex gap-4">
                    <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-300 w-full py-2"></p>
                    <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-300 w-full py-2"></p>
                  </div>
                  <button className="text-white px-3 py-2 p-1 animate-pulse rounded-full bg-slate-300"></button>
                </div>
              </div>
            ))
          : data?.map((product) => (
              <Link
                key={product?._id}
                to={"autoproduct/" + product?._id}
                className="flex-grow min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow p-0"
              >
                <div className="bg-blue-100 h-48 p-1 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    src={product?.productImage[0]}
                    className="w-full h-full object-scale-down cursor-pointer hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="cursor-pointer p-4 grid gap-3">
                  <p className="font-semibold text-red-600">
                    {displayKESCurrency(product.price)}
                  </p>
                  <p className="font-semibold text-green-600">
                    {product.brandName}
                  </p>
                  <p className="font-semibold text-green-600">
                    {product.productName}
                  </p>
                  <p className="text-blue-500 font-semibold">
                    Uploaded: {displayFormattedTimestamp(product?.createdAt)}
                  </p>
                  <p className="capitalize flex gap-2">
                    <span className="text-green-500 font-semibold">ID:</span>{" "}
                    <span className="text-slate-900 font-bold">{product?._id}</span>
                  </p>
                  <div className="font-semibold flex gap-4">
                    <span>Call</span>
                    <div className="flex">
                      <FcCellPhone className="text-xl" />
                      <span className="text-blue-600">{product.phoneNumber}</span>
                    </div>
                  </div>
                  <p className="text-slate-700">{product.description}</p>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProductAuto;
