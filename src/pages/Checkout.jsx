import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiCheck,
  FiUser,
  FiMapPin,
  FiPhone,
  FiMail,
  FiHome,
  FiTruck,
  FiCreditCard,
  FiUpload,
  FiX,
  FiArrowLeft,
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import {
  sendOrderToTelegram,
  sendReceiptPhoto,
} from '../services/telegram';
import { CheckoutSkeleton } from '../components/Skeleton';
import '../styles/checkout.css';

const MAYA_QR =
  'https://res.cloudinary.com/bvw3okdf/image/upload/v1791430993/Messenger_creation_7246A0AB-ADB6-4642-AF1F-194FB2AD1A27.jpg';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    landmark: '',
    province: '',
    city: '',
    barangay: '',
    instructions: '',
    note: '',
  });

  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);

  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const total = subtotal;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDeliveryChange = (method) => {
    setDeliveryMethod(method);
    if (method === 'express' && paymentMethod === 'cash') {
      setPaymentMethod('gcash');
    }
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReceiptFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setReceiptPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeReceipt = () => {
    setReceiptFile(null);
    setReceiptPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (paymentMethod === 'gcash' || paymentMethod === 'maya') &&
      !receiptFile
    ) {
      setErrorMsg('Please upload your receipt screenshot.');
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
      customer: form,
      delivery: { method: deliveryMethod },
      payment: { method: paymentMethod },
      items: items.map((i) => ({
        name: i.name,
        qty: i.qty,
        price: i.price,
      })),
      subtotal,
      deliveryFee: 0,
      total,
    };

    try {
      // Step 1: Send order details
      const result = await sendOrderToTelegram(order);

      if (!result.ok) {
        setStatus('error');
        setErrorMsg(
          result.error || 'Failed to send order. Please try again.'
        );
        return;
      }

      // Step 2: Send receipt photo (non-blocking — errors are logged but
      // don't block order confirmation)
      if (receiptPreview && receiptFile) {
        try {
          await sendReceiptPhoto(receiptPreview, orderId);
        } catch (err) {
          console.warn('Receipt upload failed, but order is confirmed:', err);
        }
      }

      // Step 3: Success — clear cart and redirect
      clearCart();
      navigate('/notification', {
        state: {
          orderId,
          name: form.fullName,
          method: deliveryMethod,
          payment: paymentMethod,
          total,
        },
      });
    } catch (err) {
      console.error('Order submit failed:', err);
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  if (items.length === 0 && status !== 'sending') {
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
      {status === 'sending' && (
        <div className="sending-overlay" role="alert" aria-live="polite">
          <div className="sending-card">
            <div className="spinner" />
            <h3>Processing your order...</h3>
            <p>Please wait while we send your order. Don't close this page.</p>
          </div>
        </div>
      )}

      <section className="container checkout-hero">
        <button
          type="button"
          className="back-btn neu-flat"
          onClick={() => navigate('/cart')}
          aria-label="Back to cart"
        >
          <FiArrowLeft />
          <span>Back to Cart</span>
        </button>

        <h1 className="section-title">Checkout</h1>
        <p className="section-subtitle">Almost there — just a few details.</p>
      </section>

      {loading ? (
        <section className="container">
          <CheckoutSkeleton />
        </section>
      ) : (
      <section className="container checkout-wrap fade-in-content">
        <form className="checkout-form neu-flat" onSubmit={handleSubmit}>
          <h3>Delivery Information</h3>

          <div className="field">
            <label>Full Name *</label>
            <div className="input-wrap">
              <FiUser className="input-icon" />
              <input
                type="text"
                name="fullName"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="Juan Dela Cruz"
              />
            </div>
          </div>

          <div className="field">
            <label>Mobile Number *</label>
            <div className="input-wrap">
              <FiPhone className="input-icon" />
              <input
                type="tel"
                name="mobile"
                required
                value={form.mobile}
                onChange={handleChange}
                placeholder="+63 9XX XXX XXXX"
              />
            </div>
          </div>

          <div className="field">
            <label>Email Address *</label>
            <div className="input-wrap">
              <FiMail className="input-icon" />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="field">
            <label>Delivery Address *</label>
            <div className="input-wrap">
              <FiMapPin className="input-icon" />
              <input
                type="text"
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                placeholder="House #, Street"
              />
            </div>
          </div>

          <div className="field">
            <label>Nearest Landmark *</label>
            <div className="input-wrap">
              <FiMapPin className="input-icon" />
              <input
                type="text"
                name="landmark"
                required
                value={form.landmark}
                onChange={handleChange}
                placeholder="e.g. Near San Pascual Church"
              />
            </div>
          </div>

          <div className="field">
            <label>Province *</label>
            <div className="input-wrap">
              <FiMapPin className="input-icon" />
              <input
                type="text"
                name="province"
                required
                value={form.province}
                onChange={handleChange}
                placeholder="Batangas"
              />
            </div>
          </div>

          <div className="field">
            <label>City / Municipality *</label>
            <div className="input-wrap">
              <FiMapPin className="input-icon" />
              <input
                type="text"
                name="city"
                required
                value={form.city}
                onChange={handleChange}
                placeholder="San Pascual"
              />
            </div>
          </div>

          <div className="field">
            <label>Barangay *</label>
            <div className="input-wrap">
              <FiMapPin className="input-icon" />
              <input
                type="text"
                name="barangay"
                required
                value={form.barangay}
                onChange={handleChange}
                placeholder="Poblacion"
              />
            </div>
          </div>

          <div className="field">
            <label>Additional Delivery Instruction *</label>
            <textarea
              name="instructions"
              required
              rows="3"
              value={form.instructions}
              onChange={handleChange}
              placeholder="Gate color, house color, etc."
            />
          </div>

          <div className="field">
            <label>Note (optional)</label>
            <textarea
              name="note"
              rows="2"
              value={form.note}
              onChange={handleChange}
              placeholder="Anything else we should know?"
            />
          </div>

          <h3 className="pay-title">Delivery Method</h3>
          <div className="method-list">
            <label
              className={`method-option ${
                deliveryMethod === 'pickup' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                name="deliveryMethod"
                value="pickup"
                checked={deliveryMethod === 'pickup'}
                onChange={() => handleDeliveryChange('pickup')}
              />
              <FiHome />
              <div>
                <span className="method-label">Pick-up</span>
                <span className="method-sub">Anytime</span>
              </div>
            </label>

            <label
              className={`method-option ${
                deliveryMethod === 'meetup' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                name="deliveryMethod"
                value="meetup"
                checked={deliveryMethod === 'meetup'}
                onChange={() => handleDeliveryChange('meetup')}
              />
              <FiMapPin />
              <div>
                <span className="method-label">Meet-up</span>
                <span className="method-sub">Anytime with min. order</span>
              </div>
            </label>

            <label
              className={`method-option ${
                deliveryMethod === 'express' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                name="deliveryMethod"
                value="express"
                checked={deliveryMethod === 'express'}
                onChange={() => handleDeliveryChange('express')}
              />
              <FiTruck />
              <div>
                <span className="method-label">Express (Lalamove)</span>
                <span className="method-sub">
                  Same-day or next-day via Lalamove
                </span>
              </div>
            </label>
          </div>

          {deliveryMethod === 'pickup' && (
            <div className="method-note neu-pressed">
              <FiHome />
              <span>
                Pick up at <b>XNACK, Poblacion, San Pascual, Batangas</b>. Open
                anytime. Please bring your order number.
              </span>
            </div>
          )}

          {deliveryMethod === 'meetup' && (
            <div className="method-note neu-pressed">
              <FiMapPin />
              <span>
                Meet-up with us within <b>3–7 days</b>. Delivery fee is computed
                at <b>₱15 per kilometer</b> from the warehouse.
              </span>
            </div>
          )}

          {deliveryMethod === 'express' && (
            <div className="method-note neu-pressed">
              <FiTruck />
              <span>
                Same-day or next-day delivery via <b>Lalamove</b>. Actual fee is
                charged based on Lalamove's live quotation at checkout.{' '}
                <b>Buyer will shoulder the delivery fee of Lalamove.</b>
              </span>
            </div>
          )}

          <h3 className="pay-title">Payment Method</h3>
          <div className="method-list">
            <label
              className={`method-option ${
                paymentMethod === 'cash' ? 'active' : ''
              } ${deliveryMethod === 'express' ? 'disabled' : ''}`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                disabled={deliveryMethod === 'express'}
                onChange={() => setPaymentMethod('cash')}
              />
              <FiCreditCard />
              <div>
                <span className="method-label">Cash</span>
                <span className="method-sub">Pay upon delivery</span>
              </div>
            </label>

            <label
              className={`method-option ${
                paymentMethod === 'gcash' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="gcash"
                checked={paymentMethod === 'gcash'}
                onChange={() => setPaymentMethod('gcash')}
              />
              <FiCreditCard />
              <div>
                <span className="method-label">GCash</span>
                <span className="method-sub">Send & upload receipt</span>
              </div>
            </label>

            <label
              className={`method-option ${
                paymentMethod === 'maya' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="maya"
                checked={paymentMethod === 'maya'}
                onChange={() => setPaymentMethod('maya')}
              />
              <FiCreditCard />
              <div>
                <span className="method-label">Maya</span>
                <span className="method-sub">Send & upload receipt</span>
              </div>
            </label>
          </div>

          {paymentMethod === 'cash' && (
            <div className="method-note neu-pressed">
              <FiCreditCard />
              <span>Pay upon delivery.</span>
            </div>
          )}

          {paymentMethod === 'gcash' && (
            <>
              <div className="method-note neu-pressed">
                <FiCreditCard />
                <span>
                  Send payment to GCash number <b>09242208283</b> (Ma*y A** C.).
                  Upload your receipt screenshot after payment. Scan the QR
                  below.
                </span>
              </div>
              <div className="qr-block neu-flat">
                <div className="qr-placeholder neu-pressed">
                  <span>QR Code</span>
                  <span className="qr-hint">(Coming soon)</span>
                </div>
              </div>
            </>
          )}

          {paymentMethod === 'maya' && (
            <>
              <div className="method-note neu-pressed">
                <FiCreditCard />
                <span>
                  Send payment to <b>Maya</b> number <b>09242208283</b> (Mary
                  Ann Custodio). Upload your receipt screenshot after payment.
                  Scan the QR below.
                </span>
              </div>
              <div className="qr-block neu-flat">
                <img src={MAYA_QR} alt="Maya QR" className="qr-image" />
              </div>
            </>
          )}

          {(paymentMethod === 'gcash' || paymentMethod === 'maya') && (
            <div className="upload-block">
              <label>Upload Receipt Screenshot *</label>
              {!receiptPreview ? (
                <label className="upload-drop neu-pressed">
                  <FiUpload />
                  <span>Tap to upload receipt</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleReceiptUpload}
                    hidden
                  />
                </label>
              ) : (
                <div className="receipt-preview neu-flat">
                  <img src={receiptPreview} alt="Receipt" />
                  <button
                    type="button"
                    className="remove-receipt neu-flat"
                    onClick={removeReceipt}
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div>
          )}

          {status === 'error' && <div className="error-msg">{errorMsg}</div>}

          <button
            type="submit"
            className="neu-btn neu-btn-accent place-order-btn"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <>
                <span className="spinner-sm" />
                Sending...
              </>
            ) : (
              `Place Order · ₱${total.toFixed(2)}`
            )}
          </button>
        </form>

        <aside className="checkout-summary neu-flat">
          <h3>Order Summary</h3>
          <div className="order-items">
            {items.map((i) => (
              <div key={i.id} className="order-item">
                <div className="order-thumb neu-pressed">
                  {i.image ? (
                    <img src={i.image} alt={i.name} />
                  ) : (
                    <span>{i.emoji || '🍽️'}</span>
                  )}
                </div>
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
              {deliveryMethod === 'express'
                ? 'By Lalamove'
                : deliveryMethod === 'meetup'
                ? '₱15/km'
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
      )}
    </div>
  );
}
