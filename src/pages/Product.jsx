import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiShare2,
  FiPlus,
  FiMinus,
  FiCheck,
  FiShoppingCart,
  FiChevronDown,
  FiInfo,
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import '../styles/product.css';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => String(p.id) === String(id));

  const [selectedVariation, setSelectedVariation] = useState(null);
  const [qty, setQty] = useState(1);
  const [flash, setFlash] = useState(false);
  const [shareMsg, setShareMsg] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  if (!product) {
    return (
      <div className="product-page">
        <section className="container product-empty">
          <div className="empty-cart neu-flat">
            <span style={{ fontSize: '3rem' }}>🤔</span>
            <h3>Product not found</h3>
            <Link to="/menu" className="neu-btn neu-btn-accent">
              Back to Menu
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const hasVariations = product.variations && product.variations.length > 0;

  const handleAdd = () => {
    if (hasVariations && !selectedVariation) {
      setFlash(true);
      setTimeout(() => setFlash(false), 1500);
      return;
    }

    const variation = hasVariations
      ? product.variations.find((v) => v.id === selectedVariation)
      : null;

    const cartId = variation
      ? `${product.id}-${variation.id}`
      : String(product.id);

    const cartName = variation
      ? `${product.name} (${variation.name})`
      : product.name;

    const finalPrice = product.price + (variation?.priceDelta || 0);

    for (let i = 0; i < qty; i++) {
      addToCart({
        id: cartId,
        name: cartName,
        price: finalPrice,
        image: product.image,
      });
    }

    navigate('/cart');
  };

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} on Xnack!`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        setShareMsg('Link copied!');
        setTimeout(() => setShareMsg(''), 2000);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(url);
          setShareMsg('Link copied!');
          setTimeout(() => setShareMsg(''), 2000);
        } catch (e) {
          console.error('Share failed', e);
        }
      }
    }
  };

  return (
    <div className="product-page">
      <section className="container product-hero">
        <div className="product-topbar">
          <button
            type="button"
            className="back-btn neu-flat"
            onClick={() => navigate('/menu')}
            aria-label="Back to menu"
          >
            <FiArrowLeft />
            <span>Back to Menu</span>
          </button>

          <button
            type="button"
            className="share-btn neu-flat"
            onClick={handleShare}
            aria-label="Share product"
          >
            <FiShare2 />
            <span>Share</span>
          </button>
        </div>

        {shareMsg && <div className="share-toast neu-flat">{shareMsg}</div>}

        <div className="product-card neu-flat">
          <div className="product-image-wrap">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
          </div>

          <div className="product-info">
            <span className="product-cat neu-pressed">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">₱{product.price}</p>

            <button
              type="button"
              className={`view-details-btn neu-flat ${
                showDetails ? 'open' : ''
              }`}
              onClick={() => setShowDetails((v) => !v)}
              aria-expanded={showDetails}
            >
              <FiInfo />
              <span>{showDetails ? 'Hide Product Details' : 'View Product Details'}</span>
              <FiChevronDown className="chev" />
            </button>

            {showDetails && (
              <div className="details-panel">
                <p className="product-description">{product.description}</p>

                {product.details && product.details.length > 0 && (
                  <ul className="product-details">
                    {product.details.map((d, i) => (
                      <li key={i}>
                        <FiCheck />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {hasVariations && (
              <div className="variation-block">
                <h4>
                  Choose Variation <span className="req">*</span>
                </h4>
                <div className="variation-list">
                  {product.variations.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      className={`variation-chip ${
                        selectedVariation === v.id ? 'active' : ''
                      }`}
                      onClick={() => setSelectedVariation(v.id)}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
                {flash && !selectedVariation && (
                  <p className="variation-error">
                    Please select a variation first.
                  </p>
                )}
              </div>
            )}

            <div className="qty-block">
              <span className="qty-label">Quantity</span>
              <div className="qty-controls">
                <button
                  type="button"
                  className="qty-btn neu-flat"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease"
                >
                  <FiMinus />
                </button>
                <span className="qty-value neu-pressed">{qty}</span>
                <button
                  type="button"
                  className="qty-btn neu-flat"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            <button
              type="button"
              className="neu-btn neu-btn-accent add-to-cart-btn"
              onClick={handleAdd}
            >
              <FiShoppingCart />
              <span>
                Add to Cart · ₱{(product.price * qty).toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
