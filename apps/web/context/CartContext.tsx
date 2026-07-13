'use client';
import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { api } from '@/lib/api';
import type { Cart } from '@/lib/types';

/* ---------------- safe uuid ---------------- */
function generateUUID(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch { /* ignore */ }
  // Fallback 1: crypto.getRandomValues
  try {
    const getRandomValues =
      typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function'
        ? (arr: Uint8Array) => crypto.getRandomValues(arr)
        : (arr: Uint8Array) => {
            for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
          };
    const buf = new Uint8Array(16);
    getRandomValues(buf);
    buf[6] = (buf[6] & 0x0f) | 0x40;
    buf[8] = (buf[8] & 0x3f) | 0x80;
    const hex = Array.from(buf, (b) => b.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  } catch {
    // Fallback 2: deterministic from Math.random (last resort)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}

interface CartContextType {
  cart: Cart | null;
  cartId: string;
  loading: boolean;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId] = useState(() => {
    if (typeof window === 'undefined') return '';
    let id = localStorage.getItem('cartId');
    if (!id) {
      id = generateUUID();
      localStorage.setItem('cartId', id);
    }
    return id;
  });
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    if (!cartId) return;
    const data = await api.getCart(cartId);
    setCart(data);
    setLoading(false);
  }, [cartId]);

  useEffect(() => {
    if (!cartId) return;
    fetchCart();
  }, [cartId, fetchCart]);

  const addItem = async (productId: number, quantity: number) => {
    const updated = await api.addToCart(cartId, { productId, quantity });
    setCart(updated);
  };
  const updateItem = async (productId: number, quantity: number) => {
    const updated = await api.updateCartItem(cartId, productId, quantity);
    setCart(updated);
  };
  const removeItem = async (productId: number) => {
    const updated = await api.removeCartItem(cartId, productId);
    setCart(updated);
  };
  const clearCart = async () => {
    await api.clearCart(cartId);
    setCart(null);
  };

  return (
    <CartContext.Provider value={{ cart, cartId, loading, addItem, updateItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
