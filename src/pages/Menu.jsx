import { useState } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import '../styles/menu.css';

const categories = ['All', 'Snacks', 'Mains', 'Drinks', 'Desserts'];

const items = [
  { id: 1, name: 'Classic Loaded Fries', cat: 'Snacks', price: 120, emoji: '🍟' },
  { id: 2, name: 'Street Corn Cup', cat: 'Snacks', price: 95, emoji: '🌽' },
  { id: 3, name: 'Xnack Signature Burger', cat: 'Mains', price: 185, emoji: '🍔' },
  { id: 4, name: 'Crispy Chicken Wrap', cat: 'Mains', price: 150, emoji: '🌯' },
  { id: 5, name: 'Loaded Nachos', cat: 'Snacks', price: 140, emoji: '🧀' },
  { id: 6, name: 'Fresh Lemonade', cat: 'Drinks', price: 65, emoji: '🍋' },
  { id: 7, name: 'Iced Coffee', cat: 'Drinks', price: 85, emoji: '🧋' },
  { id: 8, name: 'Churro Bites', cat: 'Desserts', price: 95, emoji: '🍩' },
  { id: 9, name: 'Soft Serve Cone', cat: 'Desserts', price: 70, emoji: '🍦' },
];

export default function Menu() {
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');
  const [flash, setFlash] = useState(null);
  const { addToCart } = useCart();

  const filtered = items.filter((i) => {
    const matchCat = active === 'All' || i.cat === active;
    const matchQ = i.name.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const handleAdd = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      emoji: item.emoji,
    });
    setFlash(item.id);
    setTimeout(() => setFlash(null), 900);
  };

  return (
    <div className="menu-page">
      <section className="container menu-hero">
        <h1 className="section-title">Our Menu</h1>
        <p className="section-subtitle">Freshly made. Honestly priced.</p>

        <div className="menu-controls">
          <div className="search-wrap neu-pressed">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search snacks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="category-tabs">
            {categories.map((c) => (
              <button
                key={c}
                className={`cat-btn ${active === c ? 'active' : ''}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container menu-grid-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state neu-flat">
            <span style={{ fontSize: '3rem' }}>🍽️</span>
            <p>No items found. Try another search.</p>
          </div>
        ) : (
          <div className="menu-grid">
            {filtered.map((item) => (
              <div key={item.id} className="menu-item neu-flat">
                <div className="item-emoji">{item.emoji}</div>
                <div className="item-body">
                  <span className="item-cat">{item.cat}</span>
                  <h3>{item.name}</h3>
                  <div className="item-footer">
                    <span className="item-price">₱{item.price}</span>
                    <button
                      className={`neu-btn neu-btn-accent small-btn ${
                        flash === item.id ? 'added' : ''
                      }`}
                      onClick={() => handleAdd(item)}
                    >
                      <FiPlus />
                      <span>{flash === item.id ? 'Added!' : 'Add'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
