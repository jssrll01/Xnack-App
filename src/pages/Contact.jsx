import { useState } from 'react';
import { FiMapPin, FiPhone, FiClock, FiCheck } from 'react-icons/fi';
import '../styles/contact.css';

const info = [
  { icon: <FiMapPin />, label: 'Location', value: 'Pagkilatan, Batangas City' },
  { icon: <FiPhone />, label: 'Phone', value: '+63 945 440 8496' },
  { icon: <FiClock />, label: 'Hours', value: 'Mon–Sun · 11AM – 10PM' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <div className="contact-page">
      <section className="container contact-hero">
        <h1 className="section-title">Get in Touch</h1>
        <p className="section-subtitle">
          Questions, orders, or just want to say hi? We'd love to hear from you.
        </p>
      </section>

      <section className="container contact-grid-wrap">
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Visit or reach out</h3>
            <p className="info-sub">
              Stop by our stand for a quick bite, give us a call for orders or
              inquiries, or drop us a message below — we're happy to help.
            </p>

            <div className="info-list">
              {info.map((i, idx) => (
                <div key={idx} className="info-item neu-flat">
                  <div className="info-icon neu-pressed">{i.icon}</div>
                  <div>
                    <span className="info-label">{i.label}</span>
                    <p>{i.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className="contact-form neu-flat" onSubmit={handleSubmit}>
            <h3>Send us a message</h3>

            <div className="field">
              <label>Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </div>

            <div className="field">
              <label>Message</label>
              <textarea
                rows="5"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What can we help with?"
              />
            </div>

            <button type="submit" className="neu-btn neu-btn-accent submit-btn">
              {sent ? (
                <>
                  <FiCheck style={{ verticalAlign: 'middle', marginRight: 6 }} />
                  Message Sent
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
