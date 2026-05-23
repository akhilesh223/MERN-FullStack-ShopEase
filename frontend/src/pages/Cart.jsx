import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=checkout');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-white">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="glass p-8 md:p-16 text-center rounded-xl shadow-lg border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-slate-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item._id} className="glass p-4 sm:p-6 rounded-xl shadow border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shadow-md shrink-0" 
                />
                <div className="flex-grow">
                  <Link to={`/product/${item._id}`} className="text-lg sm:text-xl font-bold text-white hover:text-blue-500 transition-colors block mb-2">
                    {item.name}
                  </Link>
                  <p className="text-xl font-extrabold text-blue-400">${item.price}</p>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start mt-4 sm:mt-0">
                  <select 
                    value={item.qty} 
                    onChange={(e) => dispatch(addToCart({ ...item, qty: Number(e.target.value) }))}
                    className="px-3 py-2 rounded-lg bg-slate-800 text-white border border-slate-600 focus:outline-none focus:border-blue-500"
                  >
                    {[...Array(item.countInStock || 10).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                  <button 
                    onClick={() => removeFromCartHandler(item._id)} 
                    className="text-red-500 hover:text-red-400 p-2 transition-colors text-2xl"
                    aria-label="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="glass p-6 rounded-xl shadow-lg border border-white/10 lg:sticky lg:top-24">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Order Summary</h2>
              <div className="flex justify-between items-center py-4 border-b border-white/10 text-lg">
                <span className="text-slate-300">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                <strong className="text-white">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</strong>
              </div>
              <button 
                className={`w-full py-3 mt-6 text-lg font-bold rounded-lg transition-all ${
                  cartItems.length === 0 
                    ? 'bg-blue-500/50 cursor-not-allowed text-white/70' 
                    : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg text-white hover:-translate-y-0.5'
                }`}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
