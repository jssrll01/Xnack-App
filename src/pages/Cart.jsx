import { FiTrash2, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/cart.css';

export default function Cart() {
  const {
    items,
    removeFromCart,
    increaseQty,
    decreaseQty,
    subtotal,
  } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <section className="container cart-hero">
        <button
          type="button"
          className="back-btn neu-flat"
          onClick={() => navigate('/menu')}
          aria-label="Back to menu"
        >
          <FiArrowLeft />
          <span>Back to Menu</span>
        </button>

        <h1 className="section-title">Your Cart</h1>
        <p className="section-subtitle">Review your snacks before checkout.</p>
      </section>

      <section className="container cart-wrap">
        {items.length === 0 ? (
          <div className="empty-cart neu-flat">
            <span style={{ fontSize: '3rem' }}>🛒</span>
            <h3>Your cart is empty</h3>
            <p>Add some snacks to get started.</p>
            <Link to="/menu" className="neu-btn neu-btn-accent">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item neu-flat">
                  <div className="cart-thumb neu-pressed">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <span className="cart-emoji">{item.emoji || '🍽️'}</span>
                    )}
                  </div>
                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <span className="cart-price">₱{item.price}</span>
                  </div>
                  <div className="cart-qty">
                    <button
                      className="qty-btn neu-flat"
                      onClick={() => decreaseQty(item.id)}
                      aria-label="Decrease"
                    >
                      <FiMinus />
                    </button>
                    <span className="qty-value neu-pressed">{item.qty}</span>
                    <button
                      className="qty-btn neu-flat"
                      onClick={() => increaseQty(item.id)}
                      aria-label="Increase"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <button
                    className="remove-btn neu-flat"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            <aside className="cart-summary neu-flat">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row total">
                <span>Total</span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>
              <button
                className="neu-btn neu-btn-accent checkout-btn"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
              <Link to="/menu" className="continue-link">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
