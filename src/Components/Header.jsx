import { CiSearch } from "react-icons/ci";
import { BsCart } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Header() {
 
  const navigate = useNavigate()
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { currentUser, addToCart } = useSelector((state) => state.user);

  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSearchInput = () => {
    setShowSearchInput((prev) => !prev); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.get(`https://ecommercebackend02.onrender.com/v1/user/search?productName=${searchQuery}`);
      navigate(`/search-results?productName=${searchQuery}`);
      console.log("data from search",res.data);
      
    } catch (error) {
      alert('Error while searching');
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-1 py-3">
        <div className="flex items-center justify-between">
          <div className="font-bold text-gray-800">
            <Link to={"/"} className="hover:text-gray-700 mr-28 md:mr-0">
              <span className="text-2xl text-orange-500">E</span>
              <span className="text-blue-500 font-extralight md:text-2xl">
                commerce
              </span>
            </Link>
          </div>

          {/* Search form */}
          <form onSubmit={handleSubmit} className="w-1/2">
            <div className={`items-center mx-2 hidden md:block ${showSearchInput && "block"} relative`}>
              <input
                value={searchQuery} 
                onChange={handleSearch}
                className="w-[100%] py-2 pl-10 pr-4 text-gray-700 bg-white border-2 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search for products"
              />
              <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/3 text-gray-500" />
            </div>
            <button type="submit" className="hidden">Search</button>
          </form>

          {/* User profile and cart */}
          {currentUser ? (
            <div className="w-20 h-15  flex items-center justify-center">
              <img
                src={currentUser.data.profileImage}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <h1 className="text-[10px] text-center ml-2">
                {currentUser.data.userName}
              </h1>
            </div>
          ) : (
            <div className="mr-8 font-thin md:block items-center">
              <Link to={"/signin"} className="p-2 flex items-center bg-blue-500 ml-3 text-white rounded-md">
                <MdAccountCircle />
              </Link>
            </div>
          )}

          {/* Search toggle icon for mobile view */}
          <div className="mr-5 md:hidden">
            <CiSearch onClick={toggleSearchInput} size={24} />
          </div>

          {/* Cart icon */}
          <div className="flex items-center mr-1 md:ml-10">
            <Link to={"/cart/"} className="relative cursor-pointer">
              <BsCart size={24} />
              <div className="absolute top-[-10px] right-[-2px]">
                <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                  {addToCart?.length}
                </span>
              </div>
            </Link>
          </div>

          {/* Admin dashboard icon */}
          {currentUser?.data?.role === 1 && (
            <div className="ml-5 md:ml-10">
              <div className="relative group">
                <Link to={"/dashboard/admin"}>
                  <RxDashboard className="hover:text-gray-700" size={24} />
                </Link>
                <div className="absolute left-1/2 transform mt-10 -translate-x-1/2 bottom-full hidden group-hover:block bg-black text-white text-xs rounded px-2">
                  admin
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search input for mobile view */}
        {showSearchInput && (
          <div className="mt-5 p-3 md:hidden w-full relative">
            <input
              value={searchQuery}
              onChange={handleSearch}
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search for products"
            />
            <CiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        )}
      </div>
    </header>
  );
}
