import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FaMapMarkerAlt, FaSearch, FaShoppingCart, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart || { cartItems: [] };

  const userLogin = useSelector(state => state.auth);
  const { userInfo } = userLogin || {};

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };  

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="bg-[#131921] text-white flex flex-col font-sans">
      {/* Main Top Container */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between p-2 md:p-3 gap-2 md:gap-4">
        
        {/* Left Section: Logo & Delivery (Mobile & Desktop) */}
        <div className="flex items-center gap-2 flex-grow md:flex-grow-0 justify-between md:justify-start">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars className="text-xl" />
          </button>

          {/* Logo Section */}
          <Link to="/" className="flex items-baseline text-white hover:border-white border border-transparent p-1 md:p-2 rounded-sm">
            <span className="text-xl md:text-2xl font-bold tracking-tight">ShopEase</span>
            <span className="text-xs md:text-sm mt-1">.com</span>
          </Link>

          {/* Cart (Mobile Only - positioned right) */}
          <Link to="/cart" className="md:hidden flex items-end text-white hover:border-white border border-transparent p-1 rounded-sm relative">
            <div className="relative flex items-center">
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-2 left-3 bg-[#f08804] text-[#131921] font-bold text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            </div>
          </Link>
        </div>

        {/* Deliver To Section (Hidden on small mobile, visible on sm+) */}
        <div className="hidden sm:flex items-center p-1 md:p-2 border border-transparent hover:border-white rounded-sm cursor-pointer">
          <FaMapMarkerAlt className="text-lg mr-1 text-gray-300" />
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs text-gray-300 leading-tight">Deliver to</span>
            <span className="text-sm font-bold leading-tight whitespace-nowrap">Select your address</span>
          </div>
        </div>

        {/* Search Bar Section (Full width on mobile, inline on md+) */}
        <div className="flex flex-1 w-full md:w-auto h-10 rounded overflow-hidden order-last md:order-none mt-2 md:mt-0">
          <select className="hidden sm:block bg-gray-100 border-r border-gray-300 px-2 text-gray-800 outline-none cursor-pointer text-sm">
            <option>All</option>
            <option>Electronics</option>
            <option>Mobiles</option>
            <option>Computers</option>
            <option>Home & Kitchen</option>
            <option>Fashion</option>
          </select>
          <input
            type="text"
            placeholder="Search ShopEase"
            className="flex-1 border-none px-3 text-sm md:text-base outline-none text-gray-900"
          />
          <button className="bg-[#febd69] hover:bg-[#f3a847] border-none w-10 md:w-12 cursor-pointer text-gray-800 flex items-center justify-center text-lg transition-colors">
            <FaSearch />
          </button>
        </div>

        {/* Right Side Links (Hidden on mobile, visible on md+) */}
        <div className="hidden md:flex items-center gap-2 whitespace-nowrap">
          {/* Account & Lists */}
          {userInfo ? (
            <div className="flex flex-col text-white hover:border-white border border-transparent p-2 rounded-sm cursor-pointer group relative">
              <span className="text-xs leading-tight">Hello, {userInfo.name}</span>
              <span className="text-sm font-bold leading-tight flex items-center gap-1">
                Account & Lists
              </span>
              {/* Dropdown for Sign out */}
              <div className="absolute top-full right-0 mt-1 bg-white text-black p-2 rounded shadow-lg hidden group-hover:block z-50">
                <button onClick={logoutHandler} className="text-sm hover:underline text-blue-600 bg-transparent p-0">Sign Out</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="flex flex-col text-white hover:border-white border border-transparent p-2 rounded-sm cursor-pointer">
              <span className="text-xs leading-tight">Hello, sign in</span>
              <span className="text-sm font-bold leading-tight">Account & Lists</span>
            </Link>
          )}

          {/* Returns & Orders */}
          <div className="flex flex-col text-white hover:border-white border border-transparent p-2 rounded-sm cursor-pointer">
            <span className="text-xs leading-tight">Returns</span>
            <span className="text-sm font-bold leading-tight">& Orders</span>
          </div>

          {/* Cart (Desktop) */}
          <Link to="/cart" className="flex items-end text-white hover:border-white border border-transparent p-2 rounded-sm">
            <div className="relative flex items-center">
              <FaShoppingCart className="text-3xl" />
              <span className="absolute -top-1 left-3 bg-[#f08804] text-[#131921] font-bold text-sm px-1.5 rounded-full">
                {cartCount}
              </span>
            </div>
            <span className="text-sm font-bold mb-1 ml-1">Cart</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Expansion (Visible only when menuOpen is true on mobile) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-[#232f3e] p-3 gap-3 text-sm">
          {userInfo ? (
             <div className="flex justify-between items-center border-b border-gray-600 pb-2">
               <span>Hello, {userInfo.name}</span>
               <button onClick={logoutHandler} className="text-[#febd69] font-bold bg-transparent p-0">Sign Out</button>
             </div>
          ) : (
            <Link to="/login" className="border-b border-gray-600 pb-2 font-bold">Sign In</Link>
          )}
          <Link to="/orders" className="py-1">Returns & Orders</Link>
        </div>
      )}

      {/* Bottom Nav Bar */}
      <div className="bg-[#232f3e] flex items-center p-1 md:p-2 gap-2 md:gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide text-sm">
        <div className="font-bold cursor-pointer hover:border-white border border-transparent p-1 md:p-2 flex items-center gap-1">
          <FaBars /> All
        </div>
        <div className="flex gap-2 md:gap-4 items-center">
          <span className="cursor-pointer hover:border-white border border-transparent p-1 md:p-2">Today's Deals</span>
          <Link to="/category/electronics" className="text-white hover:border-white border border-transparent p-1 md:p-2">Electronic Items</Link>
          <Link to="/category/mobiles" className="text-white hover:border-white border border-transparent p-1 md:p-2">Mobiles</Link>
          <Link to="/category/computers" className="text-white hover:border-white border border-transparent p-1 md:p-2">Computers</Link>
          <Link to="/category/home-kitchen" className="text-white hover:border-white border border-transparent p-1 md:p-2">Home & Kitchen</Link>
          <Link to="/category/fashion" className="text-white hover:border-white border border-transparent p-1 md:p-2">Fashion</Link>
          <Link to="/category/books" className="text-white hover:border-white border border-transparent p-1 md:p-2">Books</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
