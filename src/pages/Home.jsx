import { Link } from 'react-router-dom';
import { FiClock, FiAward, FiTruck } from 'react-icons/fi';
import '../styles/home.css';

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
              View Menu
            </Link>
            <Link to="/about" className="neu-btn">Our Story</Link>
          </div>

          <div className="hero-stats">
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
