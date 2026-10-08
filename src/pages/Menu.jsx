import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiPlus, FiSliders, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import '../styles/menu.css';

const categories = ['All', 'Snacks', 'Mains', 'Drinks', 'Desserts'];
const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A–Z' },
];

export default function Menu() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [flash, setFlash] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();
  const catScrollRef = useRef(null);

  const filtered = products
    .filter((p) => {
      const matchCat = activeCat === 'All' || p.category === activeCat;
      const matchQ = p.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    // If product has variations, go to product page instead
    if (product.variations && product.variations.length > 0) {
      navigate(`/product/${product.id}`);
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setFlash(product.id);
    setTimeout(() => setFlash(null), 900);
  };

  return (
    <div className="menu-page">
      <section className="container menu-hero">
        <h1 className="section-title">Our Menu</h1>
        <p className="section-subtitle">Freshly made. Honestly priced.</p>

        <div className="menu-controls">
          <div className="search-row">
            <div className="search-wrap neu-pressed">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search snacks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              type="button"
              className={`filter-btn neu-flat ${filterOpen ? 'active' : ''}`}
              onClick={() => setFilterOpen((v) => !v)}
              aria-label="Filters"
            >
              {filterOpen ? <FiX /> : <FiSliders />}
            </button>
          </div>

          <div className="cat-scroll" ref={catScrollRef}>
            {categories.map((c) => (
              <button
                key={c}
                className={`cat-chip ${activeCat === c ? 'active' : ''}`}
                onClick={() => setActiveCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {filterOpen && (
            <div className="filter-panel neu-flat">
              <h4>Sort by</h4>
              <div className="filter-options">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={`filter-chip ${
                      sortBy === opt.value ? 'active' : ''
                    }`}
                    onClick={() => setSortBy(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
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
              <div
                key={item.id}
                className="menu-item neu-flat"
                onClick={() => navigate(`/product/${item.id}`)}
                role="button"
                tabIndex={0}
              >
                <div className="item-image-wrap">
                  <img src={item.image} alt={item.name} className="item-image" />
                </div>
                <div className="item-body">
                  <span className="item-cat">{item.category}</span>
                  <h3>{item.name}</h3>
                  <div className="item-footer">
                    <span className="item-price">₱{item.price}</span>
                    <button
                      className={`neu-btn neu-btn-accent small-btn ${
                        flash === item.id ? 'added' : ''
                      }`}
                      onClick={(e) => handleQuickAdd(item, e)}
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
