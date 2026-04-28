import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector(state => state.auth);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };  

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav style={styles.nav}>
      <div style={styles.topContainer}>
        {/* Logo Section */}
        <Link to="/" style={styles.logoBlock}>
          <span style={styles.logoText}>ShopEase</span>
          <span style={styles.domain}>.com</span>
        </Link>

        {/* Deliver To Section (Amazon Style) */}
        <div style={styles.deliverBlock}>
          <div style={styles.deliverIcon}>📍</div>
          <div style={styles.deliverText}>
            <span style={styles.deliverLabel}>Deliver to</span>
            <span style={styles.deliverLocation}>Select your address</span>
          </div>
        </div>

        {/* Search Bar Section */}
        <div style={styles.searchBlock}>
          <select style={styles.searchSelect}>
            <option>All</option>
            <option>Electronics</option>
            <option>Mobiles</option>
            <option>Computers</option>
            <option>Home & Kitchen</option>
            <option>Fashion</option>
            <option>Books</option>
            <option>Toys & Games</option>

          </select>
          <input
            type="text"
            placeholder="Search ShopEase"
            style={styles.searchInput}
          />
          <button style={styles.searchBtn}>🔍</button>
        </div>

        {/* Right Side Links */}
        <div style={styles.rightLinks}>

          {/* Account & Lists */}
          {userInfo ? (
            <div style={styles.navItem} className="nav-hover">
              <span style={styles.navItemLabel}>Hello, {userInfo.name}</span>
              <span style={styles.navItemValue}>
                Account & Lists
                <button onClick={logoutHandler} style={styles.logoutBtn}>Sign Out</button>
              </span>
            </div>
          ) : (
            <Link to="/login" style={styles.navItem} className="nav-hover">
              <span style={styles.navItemLabel}>Hello, sign in</span>
              <span style={styles.navItemValue}>Account & Lists</span>
            </Link>
          )}

          {/* Returns & Orders */}
          <div style={styles.navItem} className="nav-hover">
            <span style={styles.navItemLabel}>Returns</span>
            <span style={styles.navItemValue}>& Orders</span>
          </div>

          {/* Cart */}
          <Link to="/cart" style={styles.cartBlock} className="nav-hover">
            <div style={styles.cartIconWrapper}>
              <span style={styles.cartIcon}>🛒</span>
              <span style={styles.cartBadge}>{cartCount}</span>
            </div>
            <span style={styles.cartText}>Cart</span>
          </Link>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div style={styles.bottomContainer}>
        <div style={styles.menuIcon}>☰ All</div>
        <div style={styles.bottomLinks}>
          <span style={styles.bottomLink}>Today's Deals</span>
          <Link to="/category/electronics" style={{ ...styles.bottomLink, color: 'white', textDecoration: 'none' }}>Electronic Items</Link>
          <Link to="/category/mobiles" style={{ ...styles.bottomLink, color: 'white', textDecoration: 'none' }}>Mobiles</Link>
          <Link to="/category/computers" style={{ ...styles.bottomLink, color: 'white', textDecoration: 'none' }}>Computers</Link>
          <Link to="/category/home-kitchen" style={{ ...styles.bottomLink, color: 'white', textDecoration: 'none' }}>Home & Kitchen</Link>
          <Link to="/category/fashion" style={{ ...styles.bottomLink, color: 'white', textDecoration: 'none' }}>Fashion</Link>
          <Link to="/category/books" style={{ ...styles.bottomLink, color: 'white', textDecoration: 'none' }}>Books</Link>
          <Link to="/category/toys" style={{ ...styles.bottomLink, color: 'white', textDecoration: 'none' }}>Toys & Games</Link>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#131921',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arial, sans-serif',
  },
  topContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    gap: '1rem',
  },
  logoBlock: {
    display: 'flex',
    alignItems: 'baseline',
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem',
    borderRadius: '2px',
    border: '1px solid transparent',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '-1px',
  },
  domain: {
    fontSize: '0.9rem',
    marginTop: '0.5rem',
  },
  deliverBlock: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    border: '1px solid transparent',
    borderRadius: '2px',
    cursor: 'pointer',
  },
  deliverIcon: {
    fontSize: '1.2rem',
    marginRight: '0.3rem',
  },
  deliverText: {
    display: 'flex',
    flexDirection: 'column',
  },
  deliverLabel: {
    fontSize: '0.75rem',
    color: '#cccccc',
    lineHeight: '1',
  },
  deliverLocation: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    lineHeight: '1',
  },
  searchBlock: {
    display: 'flex',
    flex: 1,
    height: '40px',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  searchSelect: {
    backgroundColor: '#f3f3f3',
    border: 'none',
    borderRight: '1px solid #ccc',
    padding: '0 0.5rem',
    color: '#333',
    outline: 'none',
    cursor: 'pointer',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    padding: '0 1rem',
    fontSize: '1rem',
    outline: 'none',
  },
  searchBtn: {
    backgroundColor: '#febd69',
    border: 'none',
    width: '45px',
    cursor: 'pointer',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
  },
  rightLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem',
    border: '1px solid transparent',
    borderRadius: '2px',
    cursor: 'pointer',
  },
  navItemLabel: {
    fontSize: '0.75rem',
    lineHeight: '1',
  },
  navItemValue: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#febd69',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  cartBlock: {
    display: 'flex',
    alignItems: 'flex-end',
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem',
    border: '1px solid transparent',
    borderRadius: '2px',
  },
  cartIconWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: '2rem',
    lineHeight: '1',
  },
  cartBadge: {
    position: 'absolute',
    top: '-5px',
    left: '15px',
    backgroundColor: '#f08804',
    color: '#131921',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    padding: '0 0.4rem',
    borderRadius: '50%',
  },
  cartText: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: '0.2rem',
  },
  bottomContainer: {
    backgroundColor: '#232f3e',
    display: 'flex',
    alignItems: 'center',
    padding: '0.3rem 1rem',
    gap: '1.5rem',
  },
  menuIcon: {
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0.3rem 0.5rem',
    border: '1px solid transparent',
  },
  bottomLinks: {
    display: 'flex',
    gap: '1.2rem',
  },
  bottomLink: {
    fontSize: '0.9rem',
    cursor: 'pointer',
    padding: '0.3rem 0',
  }
};

const navHoverStyles = document.createElement('style');
navHoverStyles.innerHTML = `
  .nav-hover:hover, .logoBlock:hover, .deliverBlock:hover, .menuIcon:hover {
    border-color: white !important;
  }
  .searchBtn:hover {
    backgroundColor: '#f3a847' !important;
  }
`;
document.head.appendChild(navHoverStyles);

export default Navbar;
