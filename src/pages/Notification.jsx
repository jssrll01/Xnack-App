import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPhone,
  FiHome,
} from 'react-icons/fi';
import '../styles/notification.css';

export default function Notification() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const orderId = state?.orderId || 'XN-000000';
  const name = state?.name || 'friend';
  const method = state?.method || 'pickup';
  const total = state?.total || 0;

  const isPickup = method === 'pickup';

  return (
    <div className="notification-page">
      <section className="container notification-wrap">
        <div className="notif-card neu-flat">
          <div className="notif-icon neu-pressed">
            <FiCheckCircle />
          </div>

          <span className="notif-badge neu-pressed">Order Confirmed</span>
          <h1 className="notif-title">Thank you, {name}!</h1>
          <p className="notif-sub">
            Your order has been received. We'll contact you on your phone
            number shortly to confirm.
          </p>

          <div className="notif-id neu-flat">
            <span>Order ID</span>
            <strong>{orderId}</strong>
          </div>

          <div className="notif-details">
            <div className="notif-row neu-flat">
              <div className="notif-row-icon neu-pressed">
                {isPickup ? <FiHome /> : <FiMapPin />}
              </div>
              <div>
                <span className="notif-label">Delivery Method</span>
                <p>{isPickup ? 'Pick-up at our stand' : 'Door to Door'}</p>
              </div>
            </div>

            <div className="notif-row neu-flat">
              <div className="notif-row-icon neu-pressed">
                <FiClock />
              </div>
              <div>
                <span className="notif-label">Estimated Time</span>
                <p>{isPickup ? '20 – 30 minutes' : '40 – 60 minutes'}</p>
              </div>
            </div>

            <div className="notif-row neu-flat">
              <div className="notif-row-icon neu-pressed">
                <FiPhone />
              </div>
              <div>
                <span className="notif-label">Total</span>
                <p>₱{Number(total).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="notif-actions">
            <Link to="/menu" className="neu-btn neu-btn-accent">
              Order Again
            </Link>
            <Link to="/" className="neu-btn">
              Back to Home
            </Link>
          </div>

          <p className="notif-note">
            Have questions? Call us at <b>+63 945 440 8496</b>
          </p>
        </div>
      </section>
    </div>
  );
}
