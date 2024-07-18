import React, { useContext, useState } from "react";
import Logo from "./logo";
import { FiSearch } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../stores/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearchAuto = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search-auto?q=${value}`);
    } else {
      navigate("/search-auto");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link to={"/"}>
            <Logo w={80} h={48} /> {/* Adjusted logo size */}
          </Link>

          <a
            href="https://wa.me/254702751085"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-700"
          >
            <FaWhatsappSquare className="text-4xl lg:text-6xl" />
          </a>
        </div>

        {/* Center section */}
        <div className="flex-grow ml-4 lg:max-w-sm w-full">
          <div className="relative flex items-center w-full border rounded-full focus-within:shadow">
            <input
              type="text"
              placeholder="Search for products here..."
              className="w-full px-3 py-2 outline-none text-sm"
              onChange={handleSearchAuto}
              value={search}
            />
            {/* <div className="absolute right-0 mr-2">
              <FiSearch className="text-lg h-8 bg-blue-600 text-white rounded-full p-2 cursor-pointer" />
            </div> */}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4 lg:gap-8">
          {user?._id && (
            <div
              className="text-xl lg:text-4xl cursor-pointer relative flex justify-center"
              onClick={() => setMenuDisplay((prev) => !prev)}
            >
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-2 py-1 rounded-full text-sm lg:text-base bg-red-500 hover:bg-red-900"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/Login"}
                className="px-2 py-1 rounded-full text-sm lg:text-base bg-blue-500 hover:bg-blue-800"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Expanded menu */}
        {menuDisplay && (
          <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
            <nav>
              {user?.role === ROLE.ADMIN && (
                <div className="">
                  <div className="pt-2">
                    <Link
                      className="whitespace-nowrap hover:bg-blue-500 p-2 rounded-xl text-sm lg:text-base"
                      to={"/automobileadmin-panel/all-uploads"}
                      onClick={() => setMenuDisplay((prev) => !prev)}
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
    </header>
  );
};

export default Header;
