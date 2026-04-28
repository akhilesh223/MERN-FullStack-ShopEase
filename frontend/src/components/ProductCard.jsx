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
    <div className="glass product-card" style={styles.card}>
      <Link to={`/product/${product._id}`}>
        <div style={styles.imageContainer}>
          <img src={product.image} alt={product.name} style={styles.image} />
          <div style={styles.overlay}>
            <span style={styles.viewBtn}>Quick View</span>
          </div>
        </div>
      </Link>
      <div style={styles.content}>
        <div style={styles.header}>
          <p style={styles.brand}>{product.brand}</p>
          <div style={styles.rating}>
            ⭐ {product.rating} <span style={styles.numReviews}>({product.numReviews})</span>
          </div>
        </div>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <h3 style={styles.title}>{product.name}</h3>
        </Link>
        <div style={styles.footer}>
          <span style={styles.price}>${product.price}</span>
          <button onClick={addToCartHandler} style={styles.addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  imageContainer: {
    position: 'relative',
    height: '250px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  viewBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(5px)',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontWeight: 'bold',
    border: '1px solid rgba(255, 255, 255, 0.4)',
  },
  content: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  brand: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    color: 'var(--accent-color)',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  rating: {
    fontSize: '0.85rem',
    color: '#fbbf24',
  },
  numReviews: {
    color: 'var(--text-secondary)',
  },
  title: {
    fontSize: '1.1rem',
    color: 'var(--text-primary)',
    marginBottom: '1rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    flexGrow: 1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  price: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  addToCart: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
  }
};

// Add global hover effects to index.css
const hoverStyle = document.createElement('style');
hoverStyle.innerHTML = `
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    border-color: rgba(59, 130, 246, 0.5);
  }
  .product-card:hover img {
    transform: scale(1.05);
  }
  .product-card:hover .overlay {
    opacity: 1;
  }
`;
document.head.appendChild(hoverStyle);

export default ProductCard;
