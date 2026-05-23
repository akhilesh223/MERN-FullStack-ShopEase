import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useSelector } from 'react-redux';
import { getMockProductsByCategory } from '../data/mockData';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { products, loading } = useSelector((state) => state.product);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    // If DB has real products for this category, use them
    let filtered = products.filter(p => p.category?.toLowerCase() === categoryName.toLowerCase());
    
    // Otherwise, generate our 20 massive placeholder products
    if (filtered.length === 0) {
      filtered = getMockProductsByCategory(categoryName);
    }
    
    setCategoryProducts(filtered);
  }, [categoryName, products]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-700 pb-4">
        <h1 className="text-3xl md:text-4xl font-extrabold capitalize text-white mb-2 md:mb-0">
          {categoryName.replace('-', ' ')}
        </h1>
        <span className="text-slate-400 bg-slate-800/50 px-4 py-2 rounded-full font-medium">
          Showing {categoryProducts.length} results
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-blue-500"></div>
        </div>
      ) : categoryProducts.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/20 rounded-2xl border border-slate-700/50">
          <h3 className="text-2xl text-slate-400">No products found in this category.</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {categoryProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
