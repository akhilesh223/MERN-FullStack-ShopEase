import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (e) => {
    e.preventDefault(); // Prevent navigating to the product page
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate('/cart');
  };

  return (
    <div className="glass flex flex-col overflow-hidden transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/50 group">
      <Link to={`/product/${product._id}`}>
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold border border-white/40 text-sm">
              Quick View
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs uppercase text-blue-500 font-bold tracking-wider">{product.brand}</p>
          <div className="text-xs sm:text-sm text-yellow-400">
            ⭐ {product.rating} <span className="text-slate-400">({product.numReviews})</span>
          </div>
        </div>
        <Link to={`/product/${product._id}`} className="no-underline">
          <h3 className="text-sm md:text-base lg:text-lg text-slate-100 mb-4 line-clamp-2 flex-grow hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between items-center mt-auto pt-2">
          <span className="text-lg md:text-xl font-bold text-white">${product.price}</span>
          <button 
            onClick={addToCartHandler} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
