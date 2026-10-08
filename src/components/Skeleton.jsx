export function MenuCardSkeleton() {
  return (
    <div className="menu-item neu-flat">
      <div className="item-image-wrap">
        <div className="skeleton skeleton-img" />
      </div>
      <div className="item-body">
        <div className="skeleton skeleton-line short" />
        <div className="skeleton skeleton-title" />
        <div className="item-footer">
          <div className="skeleton skeleton-line short" style={{ margin: 0, minWidth: 60 }} />
          <div className="skeleton" style={{ width: 72, height: 36, borderRadius: 12 }} />
        </div>
      </div>
    </div>
  );
}

export function MenuGridSkeleton({ count = 3 }) {
  return (
    <div className="menu-grid">
      {Array.from({ length: count }).map((_, i) => (
        <MenuCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="product-card neu-flat">
      <div className="product-image-wrap">
        <div className="skeleton skeleton-img" style={{ margin: 0 }} />
      </div>
      <div className="product-info">
        <div className="skeleton skeleton-line short" style={{ marginBottom: 14 }} />
        <div className="skeleton skeleton-title" style={{ height: 30, marginBottom: 14 }} />
        <div className="skeleton skeleton-line medium" style={{ height: 24, marginBottom: 24 }} />
        <div className="skeleton skeleton-line long" />
        <div className="skeleton skeleton-line long" />
        <div className="skeleton skeleton-line medium" style={{ marginBottom: 28 }} />
        <div className="skeleton" style={{ height: 40, borderRadius: 12, marginBottom: 20 }} />
        <div className="skeleton" style={{ height: 52, borderRadius: 16 }} />
      </div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div className="cart-grid">
      <div className="cart-items">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="cart-item neu-flat">
            <div className="skeleton" style={{ width: 70, height: 70, borderRadius: 16 }} />
            <div className="cart-info" style={{ width: '100%' }}>
              <div className="skeleton skeleton-line medium" />
              <div className="skeleton skeleton-line short" style={{ margin: 0, minWidth: 60 }} />
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary neu-flat">
        <div className="skeleton skeleton-line medium" style={{ height: 20, marginBottom: 24 }} />
        <div className="skeleton skeleton-line long" />
        <div className="skeleton skeleton-line medium" />
        <div className="skeleton" style={{ height: 52, borderRadius: 16, marginTop: 24 }} />
      </div>
    </div>
  );
}

export function CheckoutSkeleton() {
  return (
    <div className="checkout-wrap">
      <div className="checkout-form neu-flat">
        <div className="skeleton skeleton-line medium" style={{ height: 20, marginBottom: 24 }} />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <div className="skeleton skeleton-line short" style={{ marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 48, borderRadius: 14 }} />
          </div>
        ))}
        <div className="skeleton" style={{ height: 52, borderRadius: 16, marginTop: 24 }} />
      </div>
      <div className="checkout-summary neu-flat">
        <div className="skeleton skeleton-line medium" style={{ height: 20, marginBottom: 20 }} />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="order-item" style={{ marginBottom: 14 }}>
            <div className="skeleton" style={{ width: 46, height: 46, borderRadius: 12 }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton skeleton-line long" style={{ marginBottom: 6 }} />
              <div className="skeleton skeleton-line short" style={{ margin: 0 }} />
            </div>
          </div>
        ))}
        <div className="skeleton" style={{ height: 40, borderRadius: 14, marginTop: 20 }} />
      </div>
    </div>
  );
}
