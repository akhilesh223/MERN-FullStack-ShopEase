import React from 'react';

const Orders = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="glass max-w-2xl mx-auto p-8 md:p-12 rounded-2xl shadow-xl border border-white/10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Orders</h1>
        <p className="text-lg text-slate-300 mb-8">
          This is a placeholder for the user's order history.
        </p>
        <div className="animate-pulse flex justify-center text-6xl">
          📦
        </div>
      </div>
    </div>
  );
};

export default Orders;
