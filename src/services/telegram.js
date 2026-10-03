const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export async function sendOrderToTelegram(order) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Telegram env variables are missing.');
    return { ok: false, error: 'Missing config' };
  }

  const message = buildMessage(order);
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await res.json();
    if (!data.ok) {
      console.error('Telegram API error:', data);
      return { ok: false, error: data.description };
    }
    return { ok: true };
  } catch (err) {
    console.error('Telegram send failed:', err);
    return { ok: false, error: err.message };
  }
}

function buildMessage(order) {
  const {
    customer,
    delivery,
    items,
    subtotal,
    deliveryFee,
    total,
    orderId,
    date,
  } = order;

  const itemLines = items
    .map(
      (i) =>
        `  • ${i.emoji} <b>${escape(i.name)}</b> x${i.qty} — ₱${(i.price * i.qty).toFixed(2)}`
    )
    .join('\n');

  const deliveryLabel =
    delivery.method === 'pickup' ? '🏠 Pick-up' : '🚚 Door to Door';

  const deliveryDetails =
    delivery.method === 'delivery'
      ? `\n<b>Address:</b> ${escape(delivery.address)}\n<b>Distance:</b> ${delivery.distance} km\n<b>Delivery Fee:</b> ₱${deliveryFee.toFixed(2)}`
      : '';

  return `
<b>🛎 NEW XNACK ORDER</b>
<b>Order ID:</b> ${orderId}
<b>Date:</b> ${date}

<b>👤 Customer</b>
<b>Name:</b> ${escape(customer.name)}
<b>Phone:</b> ${escape(customer.phone)}

<b>${deliveryLabel}</b>${deliveryDetails}

<b>🧾 Items</b>
${itemLines}

<b>Subtotal:</b> ₱${subtotal.toFixed(2)}
<b>Total:</b> ₱${total.toFixed(2)}
  `.trim();
}

function escape(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
