import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiCheck,
  FiUser,
  FiMapPin,
  FiPhone,
  FiCreditCard,
  FiHome,
  FiTruck,
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { sendOrderToTelegram } from '../services/telegram';
import '../styles/checkout.css';

const DELIVERY_RATE_PER_KM = 20;
const DEFAULT_DISTANCE_KM = 3;

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    payment: 'cash',
    deliveryMethod: 'pickup',
  });

  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const deliveryFee =
    form.deliveryMethod === 'delivery'
      ? DEFAULT_DISTANCE_KM * DELIVERY_RATE_PER_KM
      : 0;

  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.deliveryMethod === 'delivery' && !form.address.trim()) {
      setErrorMsg('Please enter your delivery address.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    const orderId = 'XN-' + Date.now().toString().slice(-6);
    const now = new Date().toLocaleString('en-PH', {
      timeZone: 'Asia/Manila',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const order = {
      orderId,
      date: now,
      customer: {
        name: form.name,
        phone: form.phone,
      },
      delivery: {
        method: form.deliveryMethod,
        address: form.deliveryMethod === 'delivery' ? form.address : '',
        distance: form.deliveryMethod === 'delivery' ? DEFAULT_DISTANCE_KM : 0,
      },
      items: items.map((i) => ({
        name: i.name,
        emoji: i.emoji,
        qty: i.qty,
        price: i.price,
      })),
      subtotal,
      deliveryFee,
      total,
    };

    const result = await sendOrderToTelegram(order);

    if (result.ok) {
      setStatus('done');
      setTimeout(() => {
        clearCart();
        navigate('/notification', {
          state: {
            orderId,
            name: form.name,
            method: form.deliveryMethod,
            total,
          },
        });
      }, 1800);
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Failed to send order. Please try again.');
    }
  };

  if (status === 'done') {
    return (
      <div className="checkout-page">
        <section className="container checkout-success">
          <div className="success-card neu-flat">
            <div className="success-icon neu-pressed">
              <FiCheck />
            </div>
            <h2>Order Placed!</h2>
            <p>Redirecting to your order confirmation...</p>
          </div>
        </section>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <section className="container checkout-empty">
          <div className="empty-cart neu-flat">
            <span style={{ fontSize: '3rem' }}>🛒</span>
            <h3>Nothing to checkout</h3>
            <p>Add some snacks first.</p>
            <Link to="/menu" className="neu-btn neu-btn-accent">
              Browse Menu
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <section className="container checkout-hero">
        <h1 className="section-title">Checkout</h1>
        <p className="section-subtitle">Almost there — just a few details.</p>
      </section>

      <section className="container checkout-wrap">
        <form className="checkout-form neu-flat" onSubmit={handleSubmit}>
          <h3>Customer Details</h3>

          <div className="field">
            <label>Full Name</label>
            <div className="input-wrap">
              <FiUser className="input-icon" />
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Juan Dela Cruz"
              />
            </div>
          </div>

          <div className="field">
            <label>Phone Number</label>
            <div className="input-wrap">
              <FiPhone className="input-icon" />
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+63 9XX XXX XXXX"
              />
            </div>
          </div>

          <h3 className="pay-title">Delivery Method</h3>
          <div className="delivery-options">
            <label
              className={`delivery-option ${
                form.deliveryMethod === 'pickup' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                name="deliveryMethod"
                value="pickup"
                checked={form.deliveryMethod === 'pickup'}
                onChange={handleChange}
              />
              <FiHome />
              <div>
                <span className="delivery-label">Pick-up</span>
                <span className="delivery-sub">Pick up at our stand</span>
              </div>
            </label>

            <label
              className={`delivery-option ${
                form.deliveryMethod === 'delivery' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                name="deliveryMethod"
                value="delivery"
                checked={form.deliveryMethod === 'delivery'}
                onChange={handleChange}
              />
              <FiTruck />
              <div>
                <span className="delivery-label">Door to Door</span>
                <span className="delivery-sub">
                  ₱{DELIVERY_RATE_PER_KM} per 1 km
                </span>
              </div>
            </label>
          </div>

          {form.deliveryMethod === 'delivery' && (
            <>
              <div className="delivery-note neu-pressed">
                <FiTruck />
                <span>
                  Door to Door delivery is charged{' '}
                  <b>₱{DELIVERY_RATE_PER_KM} per 1 km</b>.
                </span>
              </div>

              <div className="field">
                <label>Delivery Address</label>
                <div className="input-wrap">
                  <FiMapPin className="input-icon" />
                  <input
                    type="text"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House #, Street, Barangay, City"
                  />
                </div>
              </div>
            </>
          )}

          <h3 className="pay-title">Payment Method</h3>
          <div className="payment-options">
            <label className={`pay-option ${form.payment === 'cash' ? 'active' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={form.payment === 'cash'}
                onChange={handleChange}
              />
              <FiCreditCard />
              <span>
                Cash on {form.deliveryMethod === 'pickup' ? 'Pick-up' : 'Delivery'}
              </span>
            </label>
            <label className={`pay-option ${form.payment === 'gcash' ? 'active' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="gcash"
                checked={form.payment === 'gcash'}
                onChange={handleChange}
              />
              <FiCreditCard />
              <span>GCash</span>
            </label>
          </div>

          {status === 'error' && <div className="error-msg">{errorMsg}</div>}

          <button
            type="submit"
            className="neu-btn neu-btn-accent place-order-btn"
            disabled={status === 'sending'}
          >
            {status === 'sending'
              ? 'Sending Order...'
              : `Place Order · ₱${total.toFixed(2)}`}
          </button>
        </form>

        <aside className="checkout-summary neu-flat">
          <h3>Your Order</h3>
          <div className="order-items">
            {items.map((i) => (
              <div key={i.id} className="order-item">
                <span className="order-emoji">{i.emoji}</span>
                <div className="order-details">
                  <span className="order-name">{i.name}</span>
                  <span className="order-qty">Qty: {i.qty}</span>
                </div>
                <span className="order-price">
                  ₱{(i.price * i.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="summary-divider" />
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>
              {form.deliveryMethod === 'delivery'
                ? `₱${deliveryFee.toFixed(2)}`
                : '--'}
            </span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row total">
            <span>Total</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
        </aside>
      </section>
    </div>
  );
}
