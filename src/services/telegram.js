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

export async function sendReceiptPhoto(dataUrl, orderId) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('Receipt skipped: missing env');
    return { ok: false, error: 'Missing config' };
  }

  try {
    // Convert data URL -> Blob
    const blobRes = await fetch(dataUrl);
    const blob = await blobRes.blob();

    // Telegram has a 5MB photo limit; if larger, use document
    const useDocument = blob.size > 5 * 1024 * 1024;
    const endpoint = useDocument ? 'sendDocument' : 'sendPhoto';
    const fieldName = useDocument ? 'document' : 'photo';

    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append(fieldName, blob, `receipt_${orderId}.jpg`);
    formData.append('caption', `📸 Receipt for Order ${orderId}`);

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/${endpoint}`;
    const res = await fetch(url, { method: 'POST', body: formData });
    const data = await res.json();

    if (!data.ok) {
      console.error('Receipt upload failed:', data);
      return { ok: false, error: data.description };
    }
    return { ok: true };
  } catch (err) {
    console.error('Receipt upload exception:', err);
    return { ok: false, error: err.message };
  }
}

function buildMessage(order) {
  const { customer, delivery, payment, items, subtotal, total, orderId, date } = order;

  const itemLines = items
    .map(
      (i) =>
        `  • <b>${escape(i.name)}</b> x${i.qty} — ₱${(i.price * i.qty).toFixed(2)}`
    )
    .join('\n');

  const deliveryLabels = {
    pickup: '🏠 Pick-up',
    meetup: '📍 Meet-up',
    express: '🚚 Express (Lalamove)',
  };

  const paymentLabels = {
    cash: '💵 Cash',
    gcash: '📱 GCash',
    maya: '📱 Maya',
  };

  return `
<b>🛎 NEW XNACK ORDER</b>
<b>Order ID:</b> ${orderId}
<b>Date:</b> ${date}

<b>👤 Customer</b>
<b>Name:</b> ${escape(customer.fullName)}
<b>Mobile:</b> ${escape(customer.mobile)}
<b>Email:</b> ${escape(customer.email)}

<b>🏠 Delivery Address</b>
${escape(customer.address)}
<b>Landmark:</b> ${escape(customer.landmark)}
<b>Barangay:</b> ${escape(customer.barangay)}
<b>City:</b> ${escape(customer.city)}
<b>Province:</b> ${escape(customer.province)}
<b>Instructions:</b> ${escape(customer.instructions)}
${customer.note ? `<b>Note:</b> ${escape(customer.note)}` : ''}

<b>${deliveryLabels[delivery.method] || delivery.method}</b>
<b>${paymentLabels[payment.method] || payment.method}</b>

<b>🧾 Items</b>
${itemLines}

<b>Subtotal:</b> ₱${subtotal.toFixed(2)}
<b>Total:</b> ₱${total.toFixed(2)}
  `.trim();
}

function escape(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
