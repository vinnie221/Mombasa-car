import React, { useContext, useState, useEffect, useRef } from "react";
import Logo from "./logo"; // Use uppercase for the component name
import { FiSearch } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
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
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
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
      <div className="h-full container mx-auto flex items-center px-3 justify-between">
        <div className="flex gap-6 items-center">
          <Link to={"/"}>
            <Logo w={100} h={60} />
          </Link>
          <a
            href="https://wa.me/254702751085"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 text-4xl hover:text-green-700 hover:scale-150"
          >
            <FaWhatsappSquare />
          </a>
        </div>
        {/* Animation Text */}
      <div className="hidden lg:flex justify-center items-center w-full overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-blue-500 font-semibold text-lg">
        Your journey starts here..
        </div>
      </div>

        <div className="relative flex flex-col items-end gap-2">
          <div className="text-2xl cursor-pointer" onClick={() => setMenuDisplay((prev) => !prev)}>
            {user?._id ? (
              <div className="text-3xl cursor-pointer">
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-8 h-8 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            ) : (
              <div className="text-slate-800">
                <PiDotsThreeOutlineFill />
              </div>
            )}
          </div>

          {menuDisplay && (
            <div ref={dropdownRef} className="absolute bg-slate-700 text-cyan-100 right-0 mt-2 p-2 shadow-lg rounded">
              <nav>
                {user ? (
                  <>
                    {user?.role === ROLE.ADMIN && (
                      <div className="pt-2">
                        <Link
                          className="whitespace-nowrap hover:bg-blue-500 p-2 rounded-xl"
                          to={"/automobileadmin-panel/all-uploads"}
                          onClick={() => setMenuDisplay(false)}
                        >
                          Admin Section
                        </Link>
                      </div>
                    )}
                    <div className="pt-2">
                      <button
                        onClick={handleLogout}
                        className="whitespace-nowrap hover:bg-red-500 p-2 rounded-xl"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="pt-2">
                      <Link
                        to={"/Login"}
                        className="whitespace-nowrap hover:bg-blue-500 p-2 rounded-xl"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Login
                      </Link>
                    </div>
                    <div className="pt-2">
                      <Link
                        to={"/about-us"}
                        className="whitespace-nowrap hover:bg-blue-500 p-2 rounded-xl"
                        onClick={() => setMenuDisplay(false)}
                      >
                        About Us
                      </Link>
                    </div>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>

      <div className="flex mt-0 px-0 rounded-xl">
        <div className="lg:flex items-center max-w-sm border rounded-full focus-within:shadow pl-1">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full outline-none rounded-xl p-1"
            onChange={handleSearchAuto}
            value={search}
          />
          <div className="text-lg min-w-[50px] hidden h-8 bg-blue-600 flex items-center justify-center rounded-r-full text-white">
            <FiSearch />
          </div>
        </div>
      </div>
      
      
    </header>
  );
};

export default Header;
