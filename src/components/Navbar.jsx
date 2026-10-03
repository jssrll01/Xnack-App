import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiHome,
  FiCoffee,
  FiInfo,
  FiShoppingCart,
  FiMail,
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import '../styles/navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  const links = [
    { to: '/', label: 'Home', icon: <FiHome /> },
    { to: '/menu', label: 'Menu', icon: <FiCoffee /> },
    { to: '/about', label: 'About', icon: <FiInfo /> },
    { to: '/cart', label: 'Cart', icon: <FiShoppingCart />, badge: itemCount },
    { to: '/contact', label: 'Contact', icon: <FiMail /> },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-mark">X</span>
          <span className="logo-text">nack</span>
        </Link>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={location.pathname === l.to ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                <span className="nav-icon">{l.icon}</span>
                <span>{l.label}</span>
                {l.badge > 0 && <span className="nav-badge">{l.badge}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="neu-btn menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>
    </nav>
  );
}
