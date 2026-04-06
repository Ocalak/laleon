import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
export default function Cart() {
  const { items, removeItem, updateQty, total, count, clear } = useCart();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const base = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${base}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ name: i.name, cents: i.cents, qty: i.qty })),
        }),
      });
      if (!res.ok) throw new Error('Server error');
      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setError('Zahlung fehlgeschlagen. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  const formatEur = (cents) =>
    (cents / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

  return (
    <>
      {/* Floating cart button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000,
          background: '#C0322A', color: '#fff', border: 'none', borderRadius: 999,
          padding: '0.75rem 1.5rem', fontWeight: 700, fontSize: '0.9rem',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
          boxShadow: '0 4px 20px rgba(192,50,42,0.4)', fontFamily: 'inherit',
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>🛒</span>
        {count > 0 && (
          <span style={{
            background: '#fff', color: '#C0322A', borderRadius: 999,
            width: 22, height: 22, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800,
          }}>{count}</span>
        )}
        Warenkorb
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(26,10,6,0.5)',
              zIndex: 1001,
            }}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(420px, 100vw)',
              background: '#FDFAF5', zIndex: 1002, display: 'flex', flexDirection: 'column',
              boxShadow: '-4px 0 30px rgba(26,10,6,0.15)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.5rem', borderBottom: '1px solid #E8D9C0',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#1A0A06' }}>
                Warenkorb {count > 0 && <span style={{ color: '#C0322A' }}>({count})</span>}
              </h2>
              <button onClick={() => setOpen(false)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '1.4rem', color: '#B8997A', padding: '0.25rem',
              }}>✕</button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#B8997A', marginTop: '3rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🛒</div>
                  <p>Dein Warenkorb ist leer.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {items.map(item => (
                    <div key={item.id} style={{
                      background: '#fff', borderRadius: 8, padding: '0.9rem 1rem',
                      border: '1px solid #E8D9C0', display: 'flex',
                      justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
                    }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, color: '#1A0A06', fontSize: '0.88rem', marginBottom: '0.2rem' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#C8960A', fontWeight: 700 }}>
                          {formatEur(item.cents * item.qty)}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <QtyButton onClick={() => updateQty(item.id, item.qty - 1)}>−</QtyButton>
                        <span style={{ minWidth: 20, textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                          {item.qty}
                        </span>
                        <QtyButton onClick={() => updateQty(item.id, item.qty + 1)}>+</QtyButton>
                        <button onClick={() => removeItem(item.id)} style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: '#B8997A', marginLeft: '0.25rem', fontSize: '0.85rem',
                          padding: '0.25rem',
                        }}>🗑</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: '1.5rem', borderTop: '1px solid #E8D9C0' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginBottom: '1rem',
                }}>
                  <span style={{ fontWeight: 600, color: '#1A0A06' }}>Gesamt</span>
                  <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#C0322A' }}>
                    {formatEur(total)}
                  </span>
                </div>

                {error && (
                  <p style={{ color: '#C0322A', fontSize: '0.8rem', marginBottom: '0.75rem', margin: '0 0 0.75rem' }}>
                    {error}
                  </p>
                )}

                <motion.button
                  onClick={handleCheckout}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  style={{
                    width: '100%', padding: '0.9rem', background: loading ? '#B8997A' : '#C0322A',
                    color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700,
                    fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit', transition: 'background 0.2s',
                  }}
                >
                  {loading ? 'Weiterleitung...' : 'Zur Kasse mit Stripe →'}
                </motion.button>

                <button onClick={clear} style={{
                  width: '100%', marginTop: '0.5rem', padding: '0.5rem',
                  background: 'none', border: 'none', color: '#B8997A',
                  cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit',
                }}>
                  Warenkorb leeren
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function QtyButton({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 26, height: 26, borderRadius: 6, border: '1px solid #E8D9C0',
      background: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#1A0A06', fontFamily: 'inherit',
    }}>
      {children}
    </button>
  );
}
