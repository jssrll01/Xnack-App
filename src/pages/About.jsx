import { FiHeart, FiUsers, FiCoffee } from 'react-icons/fi';
import '../styles/about.css';

const values = [
  { icon: <FiHeart />, title: 'Made with Love', desc: 'Every recipe tested in-house until it makes us smile.' },
  { icon: <FiUsers />, title: 'Community First', desc: 'We source local whenever we can.' },
  { icon: <FiCoffee />, title: 'Simple & Fresh', desc: 'Real ingredients. No shortcuts. No mystery.' },
];

const team = [
  { name: 'Mary Ann', role: 'Cook', emoji: '👩‍🍳' },
  { name: 'Robert', role: 'Assistant Cook', emoji: '👨‍🍳' },
  { name: 'Jessrell', role: 'Website Developer of Xnack', emoji: '🧑‍💻' },
];

export default function About() {
  return (
    <div className="about-page">
      <section className="container about-hero">
        <span className="hero-badge neu-flat">Our Story</span>
        <h1 className="section-title">Small stand. Big flavor.</h1>
        <p className="section-subtitle">
          Xnack started as a tiny cart with one grill and a simple idea:
          serve honest snacks that people actually crave.
        </p>
      </section>

      <section className="section container">
        <div className="story-block neu-flat">
          <div className="story-text">
            <h2>From a cart to a corner.</h2>
            <p>
              What began as a weekend pop-up quickly turned into a neighborhood staple.
              We keep things small on purpose — so every plate gets the attention it deserves.
            </p>
            <p>
              Whether you're grabbing a quick bite or settling in for a proper meal,
              we want Xnack to feel like your spot.
            </p>
          </div>
          <div className="story-visual">
            <div className="story-emoji">🚚</div>
            <div className="story-badge neu-flat">Since 2023</div>
          </div>
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">What we stand for</h2>
        <p className="section-subtitle">Values we cook with every single day.</p>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-card neu-flat">
              <div className="value-icon neu-pressed">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Meet the team</h2>
        <p className="section-subtitle">The folks behind your food.</p>
        <div className="team-grid">
          {team.map((t, i) => (
            <div key={i} className="team-card neu-flat">
              <div className="team-avatar">{t.emoji}</div>
              <h3>{t.name}</h3>
              <span>{t.role}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
