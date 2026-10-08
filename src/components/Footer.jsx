import { useState } from 'react';
import {
  FiPhone,
  FiMapPin,
  FiCheck,
  FiDownload,
  FiFacebook,
} from 'react-icons/fi';
import useInstallPrompt from '../hooks/useInstallPrompt';
import '../styles/footer.css';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const phone = '09242208283';
  const { canInstall, installed, promptInstall } = useInstallPrompt();

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const handleInstall = async () => {
    const result = await promptInstall();
    if (result) console.log('App installed');
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-mark">X</span>
            <span className="logo-text">nack</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="contact-list">
            <li>
              <button className="copy-phone" onClick={copyPhone}>
                {copied ? <FiCheck /> : <FiPhone />}
                <span>{copied ? 'Copied!' : phone}</span>
              </button>
            </li>
            <li>
              <FiMapPin /> Sitio Malao, Pagkilatan, Batangas City
            </li>
            <li>
              <FiMapPin /> Poblacion, San Pascual, Batangas City
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Follow Us</h4>
          <ul className="contact-list">
            <li>
              <a
                href="https://www.facebook.com/share/19dXhVYwh2/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
              >
                <FiFacebook /> Mrj Polvoron
              </a>
            </li>
          </ul>

          {(canInstall || installed) && (
            <button
              className={`install-btn neu-btn ${installed ? 'installed' : ''}`}
              onClick={canInstall ? handleInstall : undefined}
              disabled={installed}
            >
              <FiDownload />
              <span>{installed ? 'App Installed' : 'Install App'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Xnack. All rights reserved.</p>
      </div>
    </footer>
  );
}
