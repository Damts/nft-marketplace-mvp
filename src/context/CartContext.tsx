import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CartItem, Nft } from '../lib/types';

type CartState = {
  items: CartItem[];
  add: (nft: Nft, qty: number, edition: string) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  coupon: string | null;
  discount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
};

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = 'nft_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  });
  const [coupon, setCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = (nft: Nft, qty: number, edition: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.nft.id === nft.id);
      if (existing) {
        return prev.map((i) => i.nft.id === nft.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { nft, quantity: qty, edition }];
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.nft.id !== id));
  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return remove(id);
    setItems((prev) => prev.map((i) => i.nft.id === id ? { ...i, quantity: qty } : i));
  };
  const clear = () => setItems([]);

  const subtotal = items.reduce((s, i) => s + parseFloat(i.nft.price) * i.quantity, 0);

  const applyCoupon = (code: string) => {
    const c = code.trim().toUpperCase();
    if (c === 'KURIO10') { setCoupon(c); setDiscount(subtotal * 0.1); return true; }
    if (c === 'LANCAMENTO5') { setCoupon(c); setDiscount(subtotal * 0.05); return true; }
    return false;
  };

  const removeCoupon = () => { setCoupon(null); setDiscount(0); };

  return (
    <CartContext.Provider value={{ items, add, remove, updateQty, clear, subtotal, coupon, discount, applyCoupon, removeCoupon }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}