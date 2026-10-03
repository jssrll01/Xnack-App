import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiAward, FiTruck } from 'react-icons/fi';
import '../styles/home.css';

const featured = [
  { name: 'Classic Loaded Fries', price: 120, tag: 'Bestseller', emoji: '🍟' },
  { name: 'Crispy Chicken Wrap', price: 150, tag: 'New', emoji: '🌯' },
  { name: 'Street Corn Cup', price: 95, tag: 'Fan Favorite', emoji: '🌽' },
];

const features = [
  { icon: <FiClock />, title: 'Fast Service', desc: 'Fresh and ready in minutes.' },
  { icon: <FiAward />, title: 'Quality First', desc: 'Locally sourced ingredients.' },
  { icon: <FiTruck />, title: 'Quick Pickup', desc: 'Grab and go, no waiting.' },
];

export default function Home() {
  return (
    <div className="home">
      <section className="hero container">
        <div className="hero-content">
          <span className="hero-badge neu-flat">🔥 Now open daily</span>
          <h1 className="hero-title">
            Snacks that <span className="accent">hit different.</span>
          </h1>
          <p className="hero-sub">
            Bold flavors, fresh ingredients, and a cozy corner of the neighborhood.
            Xnack is your go-to spot for cravings done right.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="neu-btn neu-btn-accent">
              View Menu <FiArrowRight style={{ verticalAlign: 'middle', marginLeft: 6 }} />
            </Link>
            <Link to="/about" className="neu-btn">Our Story</Link>
          </div>

          <div className="hero-stats">
            <div className="stat neu-flat">
              <strong>15+</strong>
              <span>Menu Items</span>
            </div>
            <div className="stat neu-flat">
              <strong>4.9★</strong>
              <span>Customer Rating</span>
            </div>
            <div className="stat neu-flat">
              <strong>99+</strong>
              <span>Happy Bites</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card neu-flat">
            <div className="hero-emoji">🍔</div>
            <div className="hero-tag">Today's Special</div>
            <h3>Xnack Signature Burger</h3>
            <p>Double patty, house sauce, brioche bun.</p>
          </div>
          <div className="floating-badge neu-flat">Fresh Daily</div>
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Why Xnack?</h2>
        <p className="section-subtitle">Simple things, done exceptionally well.</p>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card neu-flat">
              <div className="feature-icon neu-pressed">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Crowd Favorites</h2>
        <p className="section-subtitle">The snacks everyone keeps coming back for.</p>
        <div className="featured-grid">
          {featured.map((item, i) => (
            <div key={i} className="menu-card neu-flat">
              <span className="menu-tag neu-pressed">{item.tag}</span>
              <div className="menu-emoji">{item.emoji}</div>
              <h3>{item.name}</h3>
              <div className="menu-footer">
                <span className="menu-price">₱{item.price}</span>
                <Link to="/menu" className="neu-btn add-btn">Order</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="center-cta">
          <Link to="/menu" className="neu-btn neu-btn-accent">
            See Full Menu <FiArrowRight style={{ verticalAlign: 'middle', marginLeft: 6 }} />
          </Link>
        </div>
      </section>

      <section className="section container">
        <div className="cta-block neu-flat">
          <h2>Hungry yet?</h2>
          <p>Come by the stand or hit us up for pickup.</p>
          <Link to="/contact" className="neu-btn neu-btn-accent">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
