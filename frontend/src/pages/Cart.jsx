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
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1 style={styles.title}>Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="glass" style={styles.emptyCart}>
          <h2>Your cart is empty</h2>
          <p style={{marginBottom: '2rem'}}>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" style={styles.btn}>Start Shopping</Link>
        </div>
      ) : (
        <div style={styles.grid}>
          <div style={styles.itemsCol}>
            {cartItems.map((item) => (
              <div key={item._id} className="glass" style={styles.cartItem}>
                <img src={item.image} alt={item.name} style={styles.itemImage} />
                <div style={styles.itemInfo}>
                  <Link to={`/product/${item._id}`} style={styles.itemName}>{item.name}</Link>
                  <p style={styles.itemPrice}>${item.price}</p>
                </div>
                <div style={styles.itemAction}>
                  <select 
                    value={item.qty} 
                    onChange={(e) => dispatch(addToCart({ ...item, qty: Number(e.target.value) }))}
                    style={styles.select}
                  >
                    {[...Array(item.countInStock || 10).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                  <button onClick={() => removeFromCartHandler(item._id)} style={styles.removeBtn}>
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div style={styles.summaryCol}>
            <div className="glass" style={styles.summaryCard}>
              <h2>Order Summary</h2>
              <div style={styles.summaryRow}>
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                <strong>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</strong>
              </div>
              <button 
                style={{...styles.btn, width: '100%', marginTop: '1rem'}} 
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

const styles = {
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
  },
  emptyCart: {
    padding: '4rem 2rem',
    textAlign: 'center',
    borderRadius: '12px',
  },
  btn: {
    padding: '0.8rem 2rem',
    borderRadius: '8px',
    display: 'inline-block',
  },
  grid: {
    display: 'grid',
    gap: '2rem',
  },
  '@media (min-width: 992px)': {
    grid: {
      gridTemplateColumns: '2fr 1fr',
    }
  },
  itemsCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    borderRadius: '12px',
    gap: '1rem',
  },
  itemImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  itemInfo: {
    flexGrow: 1,
  },
  itemName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'var(--text-primary)',
    marginBottom: '0.5rem',
    display: 'block',
  },
  itemPrice: {
    fontWeight: '800',
    color: 'var(--accent-color)',
  },
  itemAction: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  select: {
    padding: '0.5rem',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-primary)',
    color: 'white',
    border: '1px solid var(--border-color)',
  },
  removeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#ef4444',
  },
  summaryCard: {
    padding: '1.5rem',
    borderRadius: '12px',
    position: 'sticky',
    top: '100px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 0',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    fontSize: '1.1rem',
  }
};

const cartResponsive = document.createElement('style');
cartResponsive.innerHTML = `
  @media (min-width: 992px) {
    .container > div:last-child {
      grid-template-columns: 2fr 1fr !important;
    }
  }
`;
document.head.appendChild(cartResponsive);

export default Cart;
