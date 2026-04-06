import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const corsOptions = { origin: process.env.CLIENT_URL };
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Nodemailer transporter (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// ── Webhook must use raw body ─────────────────────────────────────────────────
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Retrieve full session with line items
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items'],
    });

    const customer = fullSession.customer_details;
    const shipping = fullSession.shipping_details;
    const items = fullSession.line_items.data;
    const total = (fullSession.amount_total / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

    const itemsList = items
      .map(i => `  • ${i.quantity}× ${i.description} — ${(i.amount_total / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}`)
      .join('\n');

    const addressBlock = shipping?.address
      ? `${shipping.address.line1}${shipping.address.line2 ? ', ' + shipping.address.line2 : ''}, ${shipping.address.postal_code} ${shipping.address.city}`
      : 'Keine Lieferadresse';

    const emailBody = `
🍖 NEUE BESTELLUNG — First Kebap

────────────────────────────────
KUNDE
  Name:    ${customer.name}
  E-Mail:  ${customer.email}
  Telefon: ${customer.phone || '—'}

LIEFERADRESSE
  ${addressBlock}

BESTELLUNG
${itemsList}

GESAMT:  ${total}
────────────────────────────────
Stripe Session: ${session.id}
    `.trim();

    console.log(emailBody);

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: `"First Kebap Bestellungen" <${process.env.EMAIL_USER}>`,
          to: process.env.RESTAURANT_EMAIL || process.env.EMAIL_USER,
          subject: `🍖 Neue Bestellung von ${customer.name} — ${total}`,
          text: emailBody,
        });
        console.log('Order email sent.');
      } catch (err) {
        console.error('Email error:', err.message);
      }
    }
  }

  res.json({ received: true });
});

// ── Regular JSON middleware for all other routes ──────────────────────────────
app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  try {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'No items provided' });
  }

  const line_items = items.map(item => ({
    price_data: {
      currency: 'eur',
      product_data: { name: item.name },
      unit_amount: item.cents,
    },
    quantity: item.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',

    // Collect phone number
    phone_number_collection: { enabled: true },

    // Collect delivery address (Germany only — add more if needed)
    shipping_address_collection: {
      allowed_countries: ['DE', 'AT', 'CH'],
    },

    // Optional: allow a delivery note
    custom_fields: [
      {
        key: 'delivery_note',
        label: { type: 'custom', custom: 'Lieferhinweis (optional)' },
        type: 'text',
        optional: true,
      },
    ],

    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });

  res.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error('Checkout error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
