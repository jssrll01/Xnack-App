import { FiMapPin, FiPhone, FiMail, FiClock, FiFacebook } from 'react-icons/fi';
import '../styles/contact.css';

const info = [
  {
    icon: <FiMapPin />,
    label: 'Location 1',
    value: 'Sitio Malao, Pagkilatan, Batangas City',
  },
  {
    icon: <FiMapPin />,
    label: 'Location 2',
    value: 'Poblacion, San Pascual, Batangas City',
  },
  { icon: <FiPhone />, label: 'Mobile', value: '09242208283' },
  {
    icon: <FiMail />,
    label: 'Email',
    value: 'mrjpolvoron.official@gmail.com',
  },
  { icon: <FiClock />, label: 'Hours', value: 'Mon–Sun · 7AM – 9PM' },
];

export default function Contact() {
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
              inquiries, or reach us on Facebook.
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

          <div className="contact-socials neu-flat">
            <h3>Follow Us</h3>
            <p className="socials-sub">Stay updated with our latest offers.</p>

            <a
              href="https://www.facebook.com/share/19dXhVYwh2/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn neu-flat"
            >
              <div className="social-icon neu-pressed">
                <FiFacebook />
              </div>
              <div className="social-info">
                <span className="social-label">Facebook</span>
                <span className="social-handle">Mrj Polvoron</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
