import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

function parseToStripeAmount(priceStr) {
  // "5,50 €" → 550  |  "8,00 €" → 800
  const num = parseFloat(priceStr.replace(/[^\d,]/g, '').replace(',', '.'));
  return Math.round(num * 100);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = ({ id, name, price }) => {
    const cents = parseToStripeAmount(price);
    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id, name, price, cents, qty: 1 }];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeItem(id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const clear = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.cents * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
