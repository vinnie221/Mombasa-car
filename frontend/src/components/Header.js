import React, { useContext, useState } from "react";
import Logo from "./logo"; // Use uppercase for the component name
import { FiSearch } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../stores/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import { LiaHandPointRightSolid } from "react-icons/lia";


const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setmenuDisplay] = useState(false);
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)


  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
 
  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }


  }

  const handleSearchAuto = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search-auto?q=${value}`)
    }else{
      navigate("/search-auto")
    }


  }


  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4, justify-between">
        <div className="flex gap-6">
          <div>
            <Link to={"/"}>
              <Logo w={100} h={60} />
            </Link>{" "}
          </div>
          
          <div className="">
            <a 
              href="https://wa.me/254702751085" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 text-4xl hover:text-green-700 hover:scale-150"
            >
              <FaWhatsappSquare />
            </a>
          </div>
          {/* Use uppercase for the component name */}
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search for products here..."
            className="w-full outline-none"
            onChange={handleSearchAuto}
            //onChange = {handleSearchAuto}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-r-full text-white">
            <FiSearch />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-4xl cursor-pointer relative flex justify-center"
                onClick={() => setmenuDisplay((preve) => !preve)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <div className="">
                        {/* <div>
                            <Link
                            to={"/admin-panel/all-products"}
                            className="whitespace-nowrap hover:bg-red-500 p-2  rounded-xl"
                            onClick={() => setmenuDisplay((preve) => !preve)}
                          >
                            Products     Admin
                          </Link>
                      </div> */}
                      <div className="pt-2">
                        <Link 
                          className="whitespace-nowrap hover:bg-blue-500 p-2 rounded-xl"
                          to={"/automobileadmin-panel/all-uploads"}
                          onClick={() => setmenuDisplay((preve) => !preve)}
                        >
                        Admin Section
                        </Link>
                      </div>
                    </div>
                  )}
                </nav>
              </div>
            )}
          </div>

          {
           
                //     <Link to={"/cart"} className="text-2xl relative">
                //         <span><FaShoppingCart /></span>

                //         <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-3 -right-1.5">
                //           <p className="text-sm">{context?.cardProductCount}</p>
                //         </div>
                // </Link>
            
          }

          

          

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-900"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/Login"}
                className="px-3 py-1 rounded-full text-white bg-blue-500 hover:bg-blue-800"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
