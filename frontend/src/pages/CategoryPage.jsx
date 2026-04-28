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
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', textTransform: 'capitalize' }}>
          {categoryName.replace('-', ' ')}
        </h1>
        <span style={{ color: 'var(--text-secondary)' }}>
          Showing {categoryProducts.length} results
        </span>
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : categoryProducts.length === 0 ? (
        <h3>No products found in this category.</h3>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2rem',
        }}>
          {categoryProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
